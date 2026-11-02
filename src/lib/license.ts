import { getCollections } from "./db";

export interface LicenseVerificationResult {
  valid: boolean;
  message: string;
  license?: {
    key: string;
    productId: string;
    productSlug: string;
    productTitle: string;
    licenseType: string;
    version: string;
    status: "ACTIVE" | "EXPIRED" | "REVOKED";
    issuedAt: string;
    isDemo?: boolean;
    downloadUrl: string;
    accessUrl?: string;
  };
}

export const DEMO_LICENSE_KEYS = [
  "DEVASSETS-DEMO-2026",
  "DEV-ARCH-2026-KEY",
  "FULLSTACK-DEMO-ACCESS-2026",
];

export const PRO_SUITE_DEMO_KEYS = [
  "PRO-SUITE-COMMERCIAL-2026",
  "DEVASSETS-PRO-SUITE-2026",
  "PRO-UTILITY-2026",
  "DEVASSETS-PRO-2026",
];

export const UIUX_PROMPT_DEMO_KEYS = [
  "DESIGN-UIUX-2026",
  "DEVASSETS-UIUX-2026",
  "UIUX-PROMPTS-2026",
  "DESIGN-SYSTEM-2026",
];

/**
 * Validates a license key against demo keys or MongoDB licenses collection
 */
export async function verifyLicenseKey(
  rawKey: string,
  userId?: string
): Promise<LicenseVerificationResult> {
  const normalizedKey = (rawKey || "").trim().toUpperCase();

  if (!normalizedKey) {
    return {
      valid: false,
      message: "Please provide a valid license key.",
    };
  }

  // 1. Check UI/UX product design demo keys
  const isUiUxDemo = UIUX_PROMPT_DEMO_KEYS.includes(normalizedKey);
  if (isUiUxDemo) {
    if (userId) {
      try {
        const { userPurchases } = await getCollections();
        await userPurchases.updateOne(
          { userId, productId: "prod_ui_ux_design_prompts" },
          {
            $set: {
              status: "ACTIVE",
              purchasedAt: new Date(),
              updatedAt: new Date(),
              licenseKey: normalizedKey,
              productSlug: "ui-ux-product-design-prompts",
              productTitle: "UI/UX & Product Design Prompt Library",
            },
            $setOnInsert: {
              userId,
              productId: "prod_ui_ux_design_prompts",
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      } catch (e) {
        console.warn("[License] UI/UX Demo key DB provisioning note:", e);
      }
    }

    return {
      valid: true,
      message: "UI/UX & Product Design Prompt Library License Verified!",
      license: {
        key: normalizedKey,
        productId: "prod_ui_ux_design_prompts",
        productSlug: "ui-ux-product-design-prompts",
        productTitle: "UI/UX & Product Design Prompt Library",
        licenseType: "Single-Developer Commercial & Personal Use (v2.0)",
        version: "v2.0 Enterprise Release",
        status: "ACTIVE",
        issuedAt: new Date().toISOString(),
        isDemo: true,
        downloadUrl: `/api/downloads/prod_ui_ux_design_prompts?key=${encodeURIComponent(
          normalizedKey
        )}`,
        accessUrl: "/access/ui-ux-product-design-prompts",
      },
    };
  }

  // 2. Check pro suite demo keys
  const isProDemo = PRO_SUITE_DEMO_KEYS.includes(normalizedKey);
  if (isProDemo) {
    if (userId) {
      try {
        const { userPurchases } = await getCollections();
        await userPurchases.updateOne(
          { userId, productId: "prod_pro_utility_suite" },
          {
            $set: {
              status: "ACTIVE",
              purchasedAt: new Date(),
              updatedAt: new Date(),
              licenseKey: normalizedKey,
              productSlug: "pro-utility-suite",
              productTitle: "DevAssets Pro Utility Suite (Commercial License)",
            },
            $setOnInsert: {
              userId,
              productId: "prod_pro_utility_suite",
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      } catch (e) {
        console.warn("[License] Pro Suite Demo key DB provisioning note:", e);
      }
    }

    return {
      valid: true,
      message: "DevAssets Pro Utility Suite Commercial License Verified!",
      license: {
        key: normalizedKey,
        productId: "prod_pro_utility_suite",
        productSlug: "pro-utility-suite",
        productTitle: "DevAssets Pro Utility Suite (Commercial License)",
        licenseType: "Unrestricted Multi-Client Commercial License (v3.1)",
        version: "v3.1 Enterprise Edition",
        status: "ACTIVE",
        issuedAt: new Date().toISOString(),
        isDemo: true,
        downloadUrl: `/api/downloads/prod_pro_utility_suite?key=${encodeURIComponent(
          normalizedKey
        )}`,
        accessUrl: "/tools/pro-utility-suite",
      },
    };
  }

  // 3. Check general fullstack demo license keys
  const isDemo = DEMO_LICENSE_KEYS.includes(normalizedKey);
  if (isDemo) {
    if (userId) {
      try {
        const { userPurchases } = await getCollections();
        await userPurchases.updateOne(
          { userId, productId: "prod_fullstack_arch_prompts" },
          {
            $set: {
              status: "ACTIVE",
              purchasedAt: new Date(),
              updatedAt: new Date(),
              licenseKey: normalizedKey,
              productSlug: "fullstack-system-architecture-prompts",
              productTitle: "Full-Stack Dev & System Architecture Prompts",
            },
            $setOnInsert: {
              userId,
              productId: "prod_fullstack_arch_prompts",
              createdAt: new Date(),
            },
          },
          { upsert: true }
        );
      } catch (e) {
        console.warn("[License] Demo key DB provisioning note:", e);
      }
    }

    return {
      valid: true,
      message: "Demo license key verified! Full product access granted.",
      license: {
        key: normalizedKey,
        productId: "prod_fullstack_arch_prompts",
        productSlug: "fullstack-system-architecture-prompts",
        productTitle: "Full-Stack Dev & System Architecture Prompts",
        licenseType: "Single-Developer Commercial & Personal Use (v2026.1)",
        version: "v2026.1",
        status: "ACTIVE",
        issuedAt: new Date().toISOString(),
        isDemo: true,
        downloadUrl: `/api/downloads/prod_fullstack_arch_prompts?key=${encodeURIComponent(
          normalizedKey
        )}`,
        accessUrl: "/access",
      },
    };
  }

  // 4. Check MongoDB database for purchased licenses
  try {
    const { db, userPurchases } = await getCollections();
    const licensesCollection = db.collection("licenses");
    const foundLicense = await licensesCollection.findOne({
      key: normalizedKey,
    });

    if (foundLicense) {
      if (foundLicense.status && foundLicense.status !== "ACTIVE") {
        return {
          valid: false,
          message: `License key status is ${foundLicense.status}.`,
        };
      }

      const pId = foundLicense.productId || "prod_fullstack_arch_prompts";
      const pSlug =
        foundLicense.productSlug ||
        (pId === "prod_ui_ux_design_prompts"
          ? "ui-ux-product-design-prompts"
          : pId === "prod_pro_utility_suite"
          ? "pro-utility-suite"
          : "fullstack-system-architecture-prompts");

      const pTitle =
        foundLicense.productTitle ||
        (pId === "prod_ui_ux_design_prompts"
          ? "UI/UX & Product Design Prompt Library"
          : pId === "prod_pro_utility_suite"
          ? "DevAssets Pro Utility Suite (Commercial License)"
          : "Full-Stack Dev & System Architecture Prompts");

      if (userId) {
        try {
          await userPurchases.updateOne(
            { userId, productId: pId },
            {
              $set: {
                status: "ACTIVE",
                purchasedAt: new Date(),
                updatedAt: new Date(),
                licenseKey: normalizedKey,
                productSlug: pSlug,
                productTitle: pTitle,
              },
              $setOnInsert: {
                userId,
                productId: pId,
                createdAt: new Date(),
              },
            },
            { upsert: true }
          );
        } catch (e) {
          console.warn("[License] DB purchase sync note:", e);
        }
      }

      return {
        valid: true,
        message: "License key successfully verified.",
        license: {
          key: normalizedKey,
          productId: pId,
          productSlug: pSlug,
          productTitle: pTitle,
          licenseType:
            foundLicense.licenseType ||
            "Single-Developer Commercial & Personal Use",
          version: foundLicense.version || "v2.0",
          status: "ACTIVE",
          issuedAt:
            foundLicense.createdAt?.toISOString() || new Date().toISOString(),
          isDemo: false,
          downloadUrl: `/api/downloads/${pId}?key=${encodeURIComponent(
            normalizedKey
          )}`,
          accessUrl:
            pSlug === "pro-utility-suite"
              ? "/tools/pro-utility-suite"
              : pSlug === "ui-ux-product-design-prompts"
              ? "/access/ui-ux-product-design-prompts"
              : "/access",
        },
      };
    }
  } catch (dbErr) {
    console.error("[License] Error verifying license key in DB:", dbErr);
  }

  return {
    valid: false,
    message:
      "Invalid license key. Please check your purchase email or try the demo key.",
  };
}
