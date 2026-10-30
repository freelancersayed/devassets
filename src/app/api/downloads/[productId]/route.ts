import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { verifyLicenseKey } from "@/lib/license";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    // License Key Validation
    if (!key) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          message: "A valid license key is required to download this asset package.",
        },
        { status: 401 }
      );
    }

    const verification = await verifyLicenseKey(key);
    if (!verification.valid) {
      return NextResponse.json(
        {
          error: "Forbidden",
          message: verification.message,
        },
        { status: 403 }
      );
    }

    // Locate the zip file
    const zipFilename = "fullstack-system-architecture-prompts-v2026.zip";
    const filePath = path.join(process.cwd(), "public", "downloads", zipFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        {
          error: "Asset Not Found",
          message: "The requested asset package is being rebuilt. Please try again in a few moments.",
        },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${zipFilename}"`,
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (err: any) {
    console.error("[Download API Error]", err);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err.message,
      },
      { status: 500 }
    );
  }
}

