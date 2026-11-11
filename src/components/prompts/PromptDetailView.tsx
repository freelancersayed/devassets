"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Prompt } from "@/types/prompt";
import PromptCard from "./PromptCard";
import { useSession } from "@/lib/auth-client";

interface PromptDetailViewProps {
  prompt: Prompt;
  relatedPrompts: Prompt[];
}

export default function PromptDetailView({
  prompt,
  relatedPrompts,
}: PromptDetailViewProps) {
  const { data: session } = useSession();
  const [viewCount, setViewCount] = useState<number>(prompt.viewCount);
  const [copied, setCopied] = useState(false);
  const [unlockedContent, setUnlockedContent] = useState<string | null>(null);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState<string | null>(null);

  const isFree = prompt.price === 0 || prompt.accessType === "free";

  // 1. Record genuine view tracking on mount (debounced on server)
  useEffect(() => {
    fetch(`/api/prompts/${prompt.slug}/view`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        if (data.counted && typeof data.viewCount === "number") {
          setViewCount(data.viewCount);
        }
      })
      .catch(() => {});
  }, [prompt.slug]);

  // 2. Fetch prompt content automatically if free, or user is already unlocked
  useEffect(() => {
    if (isFree) {
      handleUnlock();
    }
  }, [isFree]);

  const handleUnlock = async () => {
    setIsUnlocking(true);
    setUnlockError(null);

    try {
      const res = await fetch(`/api/prompts/${prompt.slug}/unlock`, {
        method: "POST",
      });
      const data = await res.json();

      if (data.success && data.content) {
        setUnlockedContent(data.content);
      } else {
        setUnlockError(data.error || "Unable to unlock prompt content.");
      }
    } catch {
      setUnlockError("Network error while unlocking prompt.");
    } finally {
      setIsUnlocking(false);
    }
  };

  const handleCopyPrompt = async () => {
    if (!unlockedContent) return;
    try {
      await navigator.clipboard.writeText(unlockedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] py-12 px-4 sm:px-6 relative overflow-hidden text-[#A1A1AA]">
      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/prompts"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium text-[#FAFAFA] bg-[#18181B] hover:bg-[#27272A] border border-[#27272A] transition-all cursor-pointer font-mono"
          >
            <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Prompts</span>
          </Link>

          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
            <Link href="/" className="hover:text-[#10B981] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/prompts" className="hover:text-[#10B981] transition-colors">Prompts</Link>
            <span>/</span>
            <span className="text-[#FAFAFA] truncate max-w-[200px] font-medium">{prompt.title}</span>
          </nav>
        </div>

        {/* Main Grid: Details Left + Purchase Action Panel Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Title, Hero Cover, Description, Prompt Body */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header Block */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2.5 font-mono">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                  {prompt.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs text-[#A1A1AA] bg-[#18181B] border border-[#27272A] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-[#71717A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{viewCount.toLocaleString()} views</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs text-[#A1A1AA] bg-[#18181B] border border-[#27272A] flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{prompt.likesCount || 120} likes</span>
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {prompt.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {prompt.description}
              </p>
            </div>

            {/* Media Cover Image */}
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900">
              <img
                src={prompt.image}
                alt={prompt.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070B14]/80 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Compatible Models Badges */}
            {prompt.compatibleModels && prompt.compatibleModels.length > 0 && (
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  ⚡ Verified Compatible AI Models
                </h3>
                <div className="flex flex-wrap gap-2">
                  {prompt.compatibleModels.map((model) => (
                    <span
                      key={model}
                      className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold bg-[#18181B] text-[#10B981] border border-[#27272A] shadow-sm"
                    >
                      {model}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Prompt Preview & Full Protected Content Container */}
            <div className="rounded-3xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
                <div>
                  <h2 className="text-xl font-bold text-[#FAFAFA] tracking-tight flex items-center gap-2">
                    <span>✨</span> Prompt Engineering Specification
                  </h2>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    Structured prompt template ready for instant execution.
                  </p>
                </div>

                {unlockedContent && (
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-md shadow-[#10B981]/20 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <svg className="w-4 h-4 text-emerald-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Copy Full Prompt</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Unlocked Full Prompt Display */}
              {unlockedContent ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 sm:p-6 rounded-2xl bg-[#09090B] border border-[#27272A] font-mono text-xs sm:text-sm text-[#FAFAFA] whitespace-pre-wrap leading-relaxed select-all">
                    {unlockedContent}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/20 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full prompt unlocked and verified for production use.</span>
                  </div>
                </div>
              ) : (
                /* Protected Lock State */
                <div className="space-y-5">
                  {/* Public Preview */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2">
                    <span className="text-[11px] font-mono text-[#10B981] uppercase tracking-wider">
                      Public Preview &amp; Blueprint
                    </span>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed font-mono">
                      {prompt.preview}
                    </p>
                  </div>

                  {/* Blurred Lock Banner */}
                  <div className="relative rounded-xl border border-[#27272A] bg-[#18181B] p-8 text-center space-y-4 overflow-hidden shadow-2xl">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#10B981]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>

                    <div className="space-y-1 max-w-md mx-auto">
                      <h4 className="text-base font-bold text-[#FAFAFA]">
                        Premium Prompt Content Protected
                      </h4>
                      <p className="text-xs text-[#A1A1AA] leading-relaxed">
                        This curated prompt contains multi-step instructions, negative constraints, and parameter injection templates.
                      </p>
                    </div>

                    {unlockError && (
                      <p className="text-xs text-rose-400 bg-rose-950/30 border border-rose-800/40 px-3 py-1.5 rounded-lg max-w-sm mx-auto">
                        {unlockError}
                      </p>
                    )}

                    <div className="pt-2">
                      {session?.user ? (
                        <button
                          type="button"
                          onClick={handleUnlock}
                          disabled={isUnlocking}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow transition-all cursor-pointer disabled:opacity-50"
                        >
                          {isUnlocking ? "Verifying Access..." : `Unlock Instant Access (${prompt.currency || "$"}${prompt.price.toFixed(2)})`}
                        </button>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                          <Link
                            href="/login"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow transition-all"
                          >
                            Sign In to Unlock
                          </Link>
                          <Link
                            href="/register"
                            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#FAFAFA] hover:text-white bg-[#09090B] hover:bg-[#27272A] border border-[#27272A] transition-all"
                          >
                            Create Free Account
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Action Card & Metadata */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Purchase / Access Card */}
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 sm:p-7 shadow-2xl space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                  Instant Digital Access
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-bold text-[#FAFAFA] tracking-tight">
                    {isFree ? "Free" : `${prompt.currency || "$"}${prompt.price.toFixed(2)}`}
                  </span>
                  <span className="text-xs font-mono text-[#A1A1AA]">one-time access</span>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-2.5 pt-4 border-t border-[#27272A] text-xs text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Full structured system prompt &amp; variables</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Optimized for GPT-4o, Claude 3.5 &amp; Midjourney</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Commercial usage rights included</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>Free future updates &amp; model re-calibrations</span>
                </div>
              </div>

              {/* Action Button */}
              {unlockedContent ? (
                <button
                  type="button"
                  onClick={handleCopyPrompt}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? "Copied to Clipboard!" : "Copy Full Prompt"}</span>
                </button>
              ) : isFree ? (
                <button
                  type="button"
                  onClick={handleUnlock}
                  disabled={isUnlocking}
                  className="w-full py-3.5 rounded-xl text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow transition-all cursor-pointer"
                >
                  {isUnlocking ? "Loading..." : "Get Free Access"}
                </button>
              ) : (
                <Link
                  href="/register"
                  className="block text-center w-full py-3.5 rounded-xl text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow active:scale-[0.98] transition-all"
                >
                  Get All-Access Pass ($29)
                </Link>
              )}

              <p className="text-[11px] text-center text-[#71717A] font-mono">
                🔒 100% Secure Checkout • Instant Copy &amp; Download
              </p>
            </div>

            {/* Author / Engineering Verification Card */}
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5 space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#09090B] border border-[#27272A] text-[#10B981] flex items-center justify-center font-mono font-bold text-xs">
                  &gt;_
                </div>
                <div>
                  <h4 className="font-semibold text-[#FAFAFA]">DevAssets Verified</h4>
                  <p className="text-[11px] text-[#A1A1AA] font-mono">Curated AI Engineering Lab</p>
                </div>
              </div>
              <p className="text-[#A1A1AA] text-[11px] leading-relaxed">
                Tested across thousands of production queries to minimize hallucination and maximize output accuracy.
              </p>
            </div>
          </div>
        </div>

        {/* Related Prompts Section */}
        {relatedPrompts && relatedPrompts.length > 0 && (
          <div className="pt-16 border-t border-[#27272A] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">
                  Related AI Prompts
                </h3>
                <p className="text-xs text-[#A1A1AA] mt-0.5">
                  Explore other high-performance prompts in {prompt.category}.
                </p>
              </div>

              <Link
                href={`/prompts?category=${encodeURIComponent(prompt.category as string)}`}
                className="text-xs font-mono text-[#10B981] hover:text-[#34D399] transition-colors"
              >
                View all in {prompt.category} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedPrompts.map((related) => (
                <PromptCard key={related.slug} prompt={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
