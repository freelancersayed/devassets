"use client";

import { useState } from "react";
import Link from "next/link";
import { Prompt } from "@/types/prompt";

interface PromptCardProps {
  prompt: Prompt;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [imgError, setImgError] = useState(false);

  // Fallback visual gradient if image fails
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%230f172a"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="24">🤖 ${encodeURIComponent(prompt.title)}</text></svg>`;

  const isFree = prompt.price === 0;

  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="group flex flex-col rounded-xl bg-[#18181B] border border-[#27272A] hover:border-[#10B981]/50 shadow-xs hover:shadow-emerald-glow hover:-translate-y-0.5 transition-all duration-200 overflow-hidden focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#10B981]"
    >
      {/* 1. Card Media Thumbnail */}
      <div className="relative w-full aspect-[16/10] bg-[#09090B] overflow-hidden">
        <img
          src={imgError ? fallbackSvg : prompt.image}
          alt={prompt.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-black/30 pointer-events-none" />

        {/* Top-Right Menu Badge Overlay */}
        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white text-xs flex items-center justify-center transition-opacity opacity-80 group-hover:opacity-100">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </div>

        {/* Top-Left Pricing Pill Overlay */}
        <div className="absolute top-2.5 left-2.5">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wide uppercase shadow-md backdrop-blur-md border ${
              isFree
                ? "bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30"
                : "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30"
            }`}
          >
            {isFree ? "Free" : `${prompt.currency || "$"}${prompt.price.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title Row */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-sm sm:text-base text-[#FAFAFA] group-hover:text-[#10B981] transition-colors line-clamp-1 tracking-tight">
              {prompt.title}
            </h3>
            <span className="text-[#71717A] group-hover:text-[#A1A1AA] shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.75" />
                <circle cx="12" cy="12" r="1.75" />
                <circle cx="12" cy="19" r="1.75" />
              </svg>
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[#A1A1AA] line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* 3. Footer Stats & Category Meta */}
        <div className="pt-3 border-t border-[#27272A] flex items-center justify-between gap-2 text-xs">
          {/* Category Pill */}
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 truncate max-w-[120px]">
            {prompt.category}
          </span>

          {/* Engagement Counters: Likes & Views */}
          <div className="flex items-center gap-3 text-[#A1A1AA] font-mono text-[11px] shrink-0">
            {/* Heart / Likes */}
            <span className="flex items-center gap-1 hover:text-rose-400 transition-colors">
              <svg className="w-3.5 h-3.5 text-[#71717A] group-hover:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{formatNumber(prompt.likesCount || 120)}</span>
            </span>

            {/* Eye / Views */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-[#71717A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>{formatNumber(prompt.viewCount || 1000)}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
