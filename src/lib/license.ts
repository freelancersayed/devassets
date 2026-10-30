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
  };
}

export const DEMO_LICENSE_KEYS = [
  "DEVASSETS-DEMO-2026",
  "DEV-ARCH-2026-KEY",
  "FULLSTACK-DEMO-ACCESS-2026",
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

  // Check demo license keys
  const isDemo = DEMO_LICENSE_KEYS.includes(normalizedKey);

  if (isDemo) {
    // If a user ID is provided, automatically persist purchase to MongoDB
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
      },
    };
  }

  // Check MongoDB database for purchased licenses
  try {
    const { db } = await getCollections();
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

      return {
        valid: true,
        message: "License key successfully verified.",
        license: {
          key: normalizedKey,
          productId: foundLicense.productId || "prod_fullstack_arch_prompts",
          productSlug:
            foundLicense.productSlug ||
            "fullstack-system-architecture-prompts",
          productTitle:
            foundLicense.productTitle ||
            "Full-Stack Dev & System Architecture Prompts",
          licenseType:
            foundLicense.licenseType ||
            "Single-Developer Commercial & Personal Use",
          version: foundLicense.version || "v2026.1",
          status: "ACTIVE",
          issuedAt:
            foundLicense.createdAt?.toISOString() || new Date().toISOString(),
          isDemo: false,
          downloadUrl: `/api/downloads/${
            foundLicense.productId || "prod_fullstack_arch_prompts"
          }?key=${encodeURIComponent(normalizedKey)}`,
        },
      };
    }
  } catch (dbErr) {
    console.error("[License] Error verifying license key in DB:", dbErr);
  }

  return {
    valid: false,
    message: "Invalid license key. Please check your purchase email or try the demo key.",
  };
}

