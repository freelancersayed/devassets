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
        (c) =>
          c.slug === p.productSlug ||
          c.slug === p.productId ||
          c.fastspringProductId === p.productId ||
          (p.productId === "prod_fullstack_arch_prompts" &&
            c.slug === "fullstack-system-architecture-prompts") ||
          (p.productId === "prod_pro_utility_suite" &&
            c.slug === "pro-utility-suite") ||
          (p.productId === "prod_ui_ux_design_prompts" &&
            c.slug === "ui-ux-product-design-prompts")
      );

      const resolvedSlug =
        catalogMatch?.slug ||
        p.productSlug ||
        "fullstack-system-architecture-prompts";
      const resolvedTitle =
        catalogMatch?.title || p.productTitle || "DevAssets Digital Toolkit";

      let accessUrl = "/access";
      if (resolvedSlug === "pro-utility-suite") {
        accessUrl = "/tools/pro-utility-suite";
      } else if (resolvedSlug === "ui-ux-product-design-prompts") {
        accessUrl = "/access/ui-ux-product-design-prompts";
      } else if (catalogMatch?.accessUrl) {
        accessUrl = catalogMatch.accessUrl;
      }

      return {
        id: p._id?.toString(),
        productId: p.productId,
        productTitle: resolvedTitle,
        productSlug: resolvedSlug,
        description:
          catalogMatch?.description ||
          "High-performance digital asset package with full commercial licensing.",
        emoji: catalogMatch?.emoji || "📦",
        badgeColor: catalogMatch?.badgeColor || "text-emerald-400",
        badgeBg: catalogMatch?.badgeBg || "bg-emerald-400/10",
        price: catalogMatch?.price || "",
        licenseKey: p.licenseKey || "ACTIVE-LICENSE",
        status: p.status || "ACTIVE",
        version: catalogMatch?.specs.version || "v2.0",
        format: catalogMatch?.specs.format || "ZIP + Markdown + JSON",
        category: catalogMatch?.categoryLabel || "Digital Assets",
        deliverables: catalogMatch?.deliverables?.slice(0, 3) || [],
        purchasedAt: p.purchasedAt || new Date(),
        downloadUrl: `/api/downloads/${p.productId}?key=${encodeURIComponent(
          p.licenseKey || "ACTIVE-KEY"
        )}`,
        accessUrl,
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

    if (!result.valid || !result.license) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || "Invalid license key.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message,
      license: result.license,
    });
  } catch (error: any) {
    console.error("[Redeem Purchase API Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to redeem license" },
      { status: 500 }
    );
  }
}
