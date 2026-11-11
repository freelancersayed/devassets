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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070B14] py-12 px-4 sm:px-6 relative overflow-hidden text-slate-700 dark:text-slate-300 transition-colors duration-300">
      {/* Background Ambient Radial Highlights */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-500/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10">
        {/* Page Header (Exact Copy & Typography from Requirements) */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5">
          <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase bg-indigo-50 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 backdrop-blur-md">
            🤖 AI Prompt Marketplace
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Explore AI Prompts
          </h1>

          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full mx-auto" />

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Discover ready-to-use AI prompts for development, business, marketing, image generation, writing, and productivity.
          </p>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/10 text-xs font-medium text-slate-700 dark:text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
            <span>
              <strong className="text-slate-900 dark:text-white">{initialData.total}</strong> published prompts available
            </span>
          </div>
        </div>

        {/* Client-Side Interactive Prompt Library */}
        <PromptLibraryClient initialData={initialData} />
      </div>
    </div>
  );
}
