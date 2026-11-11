import { NextRequest, NextResponse } from "next/server";
import { getPrompts, ensurePromptsSeeded } from "@/lib/prompts";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const category = searchParams.get("category") || undefined;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const result = await getPrompts({ search, category, page, limit });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in GET /api/prompts:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}

export async function POST(_request: NextRequest) {
  try {
    await ensurePromptsSeeded();
    return NextResponse.json({ success: true, message: "Prompts verified and seeded" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
