import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getProtectedPromptContent } from "@/lib/prompts";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;

    // Check user session via Better Auth
    let user = null;
    try {
      const session = await auth.api.getSession({
        headers: request.headers,
      });
      user = session?.user || null;
    } catch {
      user = null;
    }

    const result = await getProtectedPromptContent(slug, user);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Access denied" },
        { status: user ? 403 : 401 }
      );
    }

    return NextResponse.json({
      success: true,
      content: result.content,
    });
  } catch (error) {
    console.error("Error in unlock route:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
