import type { Metadata } from "next";
import { getPrompts } from "@/lib/prompts";
import PromptLibraryClient from "@/components/prompts/PromptLibraryClient";

export const metadata: Metadata = {
  title: "Explore AI Prompts — Curated Prompt Engineering Library",
  description:
    "Discover ready-to-use AI prompts for development, business, marketing, image generation, writing, and productivity.",
  alternates: {
    canonical: "https://devassets.online/prompts",
  },
  openGraph: {
    title: "Explore AI Prompts | DevAssets",
    description:
      "Discover ready-to-use AI prompts for development, business, marketing, image generation, writing, and productivity.",
    url: "https://devassets.online/prompts",
    type: "website",
  },
};

export default async function PromptsPage() {
  const initialData = await getPrompts({ page: 1, limit: 12 });

  return (
    <div className="min-h-screen bg-[#09090B] bg-grid-subtle py-12 px-4 sm:px-6 relative overflow-hidden text-[#A1A1AA]">
      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3.5 py-1 text-xs font-mono text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>AI Prompt Engineering Library</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-[#FAFAFA] tracking-[-0.035em] leading-tight">
            Explore AI Prompts
          </h1>

          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
            Discover deterministic, production-tested prompt architectures for fullstack development, systems engineering, UI/UX design, and automation.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181B] border border-[#27272A] text-xs font-mono text-[#A1A1AA] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>
              <strong className="text-[#FAFAFA]">{initialData.total}</strong> published prompt blueprints
            </span>
          </div>
        </div>

        {/* Client-Side Interactive Prompt Library */}
        <PromptLibraryClient initialData={initialData} />
      </div>
    </div>
  );
}
