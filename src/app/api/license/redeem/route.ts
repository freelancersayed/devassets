import { NextResponse } from "next/server";
import { verifyLicenseKey } from "@/lib/license";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { licenseKey, userId } = body;

    if (!licenseKey) {
      return NextResponse.json(
        { success: false, message: "License key is required." },
        { status: 400 }
      );
    }

    const result = await verifyLicenseKey(licenseKey, userId);

    if (!result.valid) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: result.message,
        license: result.license,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[License Redeem API Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "An internal error occurred while validating license.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");

  if (!key) {
    return NextResponse.json(
      { success: false, message: "License key query param missing." },
      { status: 400 }
    );
  }

  const result = await verifyLicenseKey(key);
  return NextResponse.json(result, { status: result.valid ? 200 : 401 });
}

