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
      className="group flex flex-col rounded-2xl bg-white dark:bg-[#0f131f] border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      {/* 1. Card Media Thumbnail */}
      <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-900 overflow-hidden">
        <img
          src={imgError ? fallbackSvg : prompt.image}
          alt={prompt.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 dark:from-[#0f131f] via-transparent to-black/30 pointer-events-none" />

        {/* Top-Right Menu Badge Overlay (matching reference image) */}
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
            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-md backdrop-blur-md border ${
              isFree
                ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/30"
                : "bg-indigo-950/80 text-indigo-300 border-indigo-500/30"
            }`}
          >
            {isFree ? "Free" : `${prompt.currency || "$"}${prompt.price.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Title Row with vertical 3-dots icon */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1 tracking-tight">
              {prompt.title}
            </h3>
            <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 shrink-0 mt-0.5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.75" />
                <circle cx="12" cy="12" r="1.75" />
                <circle cx="12" cy="19" r="1.75" />
              </svg>
            </span>
          </div>

          {/* Short Description */}
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        {/* 3. Footer Stats & Category Meta */}
        <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2 text-xs">
          {/* Category Pill */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 truncate max-w-[120px]">
            {prompt.category}
          </span>

          {/* Engagement Counters: Likes & Views */}
          <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 font-medium text-[11px] shrink-0">
            {/* Heart / Likes */}
            <span className="flex items-center gap-1 hover:text-rose-400 transition-colors">
              <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-400/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{formatNumber(prompt.likesCount || 120)}</span>
            </span>

            {/* Eye / Views */}
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
