import { NextRequest, NextResponse } from "next/server";
import { getPromptBySlug, getRelatedPrompts } from "@/lib/prompts";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: NextRequest, { params }: Props) {
  try {
    const { slug } = await params;
    const prompt = await getPromptBySlug(slug);

    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }

    const related = await getRelatedPrompts(slug, prompt.category as string, 4);

    return NextResponse.json({ prompt, related });
  } catch (error) {
    console.error("Error in GET /api/prompts/[slug]:", error);
    return NextResponse.json(
      { error: "Failed to fetch prompt details" },
      { status: 500 }
    );
  }
}
