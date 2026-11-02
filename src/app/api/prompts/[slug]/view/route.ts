import { NextRequest, NextResponse } from "next/server";
import { recordPromptView } from "@/lib/prompts";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const newCount = await recordPromptView(slug, ip);

    return NextResponse.json({
      success: true,
      counted: newCount !== null,
      viewCount: newCount,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
