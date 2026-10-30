import { NextResponse } from "next/server";
import crypto from "crypto";
import { ObjectId } from "mongodb";
import { getCollections, ensureMongoIndexes } from "@/lib/db";

/**
 * FastSpring Webhook API Route Handler (Native MongoDB Database)
 * Endpoint: POST /api/webhooks/fastspring
 *
 * Verifies HMAC SHA256 signature using FASTSPRING_WEBHOOK_SECRET
 * Handles "order.completed" event to provision purchases & credits in MongoDB.
 */
export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-fs-signature");
    const secret = process.env.FASTSPRING_WEBHOOK_SECRET;

    // Verify HMAC SHA256 signature
    if (process.env.NODE_ENV === "production" || secret) {
      if (!secret) {
        console.error("[FastSpring Webhook] FASTSPRING_WEBHOOK_SECRET environment variable is missing.");
        return NextResponse.json(
          { error: "Server configuration error" },
          { status: 500 }
        );
      }

      if (!signature) {
        console.warn("[FastSpring Webhook] Missing X-FS-Signature header.");
        return NextResponse.json(
          { error: "Missing signature header" },
          { status: 401 }
        );
      }

      const computedSignature = crypto
        .createHmac("sha256", secret)
        .update(rawBody, "utf8")
        .digest("base64");

      const sigBuffer = Buffer.from(signature, "utf8");
      const compBuffer = Buffer.from(computedSignature, "utf8");

      const isValid =
        sigBuffer.length === compBuffer.length &&
        crypto.timingSafeEqual(sigBuffer, compBuffer);

      if (!isValid) {
        console.warn("[FastSpring Webhook] Invalid HMAC SHA256 signature verification failed.");
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 401 }
        );
      }
    }

    let payload;
    try {
      payload = JSON.parse(rawBody);
    } catch (parseErr) {
      console.error("[FastSpring Webhook] Failed to parse JSON body:", parseErr);
      return NextResponse.json(
        { error: "Malformed JSON payload" },
        { status: 400 }
      );
    }

    // Connect to MongoDB collections
    const { users, userPurchases, userCredits } = await getCollections();
    await ensureMongoIndexes();

    const events = Array.isArray(payload?.events)
      ? payload.events
      : [payload];

    const results = [];

    for (const event of events) {
      const eventType = event?.type;
      const eventData = event?.data || event;

      if (eventType !== "order.completed") {
        results.push({
          eventId: event?.id || "unknown",
          type: eventType,
          status: "ignored_non_order_completed",
        });
        continue;
      }

      // Extract referrerAccountId from checkout tags (maps to User._id or session ID)
      const referrerAccountId =
        eventData?.tags?.referrerAccountId ||
        eventData?.order?.tags?.referrerAccountId ||
        event?.tags?.referrerAccountId ||
        null;

      const customerEmail =
        eventData?.account?.contact?.email ||
        eventData?.customer?.email ||
        eventData?.email ||
        null;

      if (!referrerAccountId && !customerEmail) {
        console.warn(
          `[FastSpring Webhook] Order ${eventData?.id || eventData?.order} skipped: Missing referrerAccountId tag and customer email.`
        );
        results.push({
          orderId: eventData?.id || eventData?.order,
          status: "skipped_missing_user_identifier",
        });
        continue;
      }

      // Resolve or create User document in MongoDB
      let user = null;
      if (referrerAccountId) {
        try {
          const queryConditions = [
            { id: String(referrerAccountId) },
            { _id: String(referrerAccountId) },
          ];

          if (ObjectId.isValid(referrerAccountId)) {
            queryConditions.push({ _id: new ObjectId(referrerAccountId) });
          }

          user = await users.findOne({ $or: queryConditions });
        } catch (dbErr) {
          console.warn(
            `[FastSpring Webhook] Error looking up MongoDB user by referrerAccountId (${referrerAccountId}):`,
            dbErr.message
          );
        }
      }

      if (!user && customerEmail) {
        const normalizedEmail = customerEmail.trim().toLowerCase();
        user = await users.findOne({ email: normalizedEmail });

        if (!user) {
          const newUserDoc = {
            email: normalizedEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
            ...(referrerAccountId ? { id: String(referrerAccountId) } : {}),
          };

          const insertResult = await users.insertOne(newUserDoc);
          user = { ...newUserDoc, _id: insertResult.insertedId };
        }
      }

      const targetUserId = String(user?._id || user?.id || referrerAccountId);

      if (!targetUserId) {
        console.error(
          `[FastSpring Webhook] Unable to associate order with a valid User record in MongoDB.`
        );
        results.push({
          orderId: eventData?.id || eventData?.order,
          status: "failed_unresolved_user",
        });
        continue;
      }

      // Extract all purchased product IDs from order items
      const items = Array.isArray(eventData?.items)
        ? eventData.items
        : eventData?.items
        ? [eventData.items]
        : [];

      const purchasedProductIds = new Set();
      for (const item of items) {
        const pid = item?.product || item?.path || item?.sku || item?.id;
        if (pid) purchasedProductIds.add(String(pid));
      }
      if (eventData?.product) {
        purchasedProductIds.add(String(eventData.product));
      }

      const updates = [];

      // a) If prod_fullstack_arch_prompts is purchased, upsert record into user_purchases
      const isArchPromptsPurchased =
        purchasedProductIds.has("prod_fullstack_arch_prompts") ||
        purchasedProductIds.has("fullstack-system-architecture-prompts");

      if (isArchPromptsPurchased) {
        const purchaseFilter = {
          userId: targetUserId,
          productId: "prod_fullstack_arch_prompts",
        };

        const purchaseUpdate = {
          $set: {
            status: "ACTIVE",
            purchasedAt: new Date(),
            updatedAt: new Date(),
          },
          $setOnInsert: {
            userId: targetUserId,
            productId: "prod_fullstack_arch_prompts",
            createdAt: new Date(),
          },
        };

        const purchaseResult = await userPurchases.updateOne(
          purchaseFilter,
          purchaseUpdate,
          { upsert: true }
        );

        updates.push({
          type: "mongodb_user_purchase_provisioned",
          productId: "prod_fullstack_arch_prompts",
          matchedCount: purchaseResult.matchedCount,
          upsertedId: purchaseResult.upsertedId,
        });
      }

      // b) If 30-Day All-Access Pass (30_day_all_access) is purchased, upsert user_credits
      // setting remainingDownloads = 3 and expiresAt to 30 days from now
      const isAllAccessPurchased =
        purchasedProductIds.has("30_day_all_access") ||
        purchasedProductIds.has("all_access_pass_30_days");

      if (isAllAccessPurchased) {
        const thirtyDaysFromNow = new Date();
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

        const creditFilter = { userId: targetUserId };
        const creditUpdate = {
          $set: {
            remainingDownloads: 3,
            expiresAt: thirtyDaysFromNow,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            userId: targetUserId,
            createdAt: new Date(),
          },
        };

        const creditResult = await userCredits.updateOne(
          creditFilter,
          creditUpdate,
          { upsert: true }
        );

        updates.push({
          type: "mongodb_user_credit_provisioned",
          remainingDownloads: 3,
          expiresAt: thirtyDaysFromNow.toISOString(),
          matchedCount: creditResult.matchedCount,
          upsertedId: creditResult.upsertedId,
        });
      }

      results.push({
        orderId: eventData?.id || eventData?.order,
        userId: targetUserId,
        status: "processed_in_mongodb",
        updates,
      });
    }

    return NextResponse.json(
      {
        success: true,
        database: "MongoDB",
        processedCount: results.length,
        results,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[FastSpring Webhook] Uncaught MongoDB error:", error);
    return NextResponse.json(
      {
        error: "Internal server error while processing webhook in MongoDB",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

// Health check / probe for FastSpring configuration verification
export async function GET() {
  return NextResponse.json({
    service: "DevAssets FastSpring Webhook Receiver",
    database: "MongoDB Native Driver",
    status: "active",
    supportedEvents: ["order.completed"],
  });
}
