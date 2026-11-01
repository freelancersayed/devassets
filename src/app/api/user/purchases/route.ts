import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getCollections } from "@/lib/db";
import { verifyLicenseKey } from "@/lib/license";
import { productsData } from "@/data/catalog";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { userPurchases } = await getCollections();
    const purchases = await userPurchases
      .find({ userId: session.user.id })
      .sort({ purchasedAt: -1 })
      .toArray();

    // Map each purchase with catalog info
    const enriched = purchases.map((p) => {
      const catalogMatch = productsData.find(
        (c) => c.slug === "fullstack-system-architecture-prompts"
      );
      return {
        id: p._id?.toString(),
        productId: p.productId,
        productTitle:
          p.productId === "prod_fullstack_arch_prompts"
            ? "Full-Stack Dev & System Architecture Prompts"
            : "DevAssets Digital Toolkit",
        productSlug:
          catalogMatch?.slug || "fullstack-system-architecture-prompts",
        licenseKey: p.licenseKey || "ACTIVE-LICENSE",
        status: p.status || "ACTIVE",
        version: "v2026.2.0",
        format: "ZIP + Markdown + JSON",
        category: catalogMatch?.categoryLabel || "AI Engineering Prompts",
        purchasedAt: p.purchasedAt || new Date(),
        downloadUrl: `/api/downloads/${p.productId}?key=${encodeURIComponent(
          p.licenseKey || "DEVASSETS-DEMO-2026"
        )}`,
      };
    });

    return NextResponse.json({
      success: true,
      purchases: enriched,
      user: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: (session.user as any).role || "user",
        createdAt: session.user.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[User Purchases API Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch purchases" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { licenseKey } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: "Please provide a license key." },
        { status: 400 }
      );
    }

    const result = await verifyLicenseKey(licenseKey, session.user.id);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      license: result.license,
    });
  } catch (error: any) {
    console.error("[User Redeem API Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to redeem license" },
      { status: 500 }
    );
  }
}
