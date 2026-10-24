"use client";

import Link from "next/link";
import { toolsData, type ToolItem } from "@/data/catalog";

export default function ToolsSection() {
  const renderIcon = (iconName: ToolItem["icon"]) => {
    switch (iconName) {
      case "FileText":
        return (
          <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "ScanText":
        return (
          <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 9h10M7 13h10M7 17h6" />
          </svg>
        );
      case "Music":
        return (
          <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "Image":
        return (
          <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <section id="tools" className="relative bg-slate-950 px-6 py-24 border-t border-slate-900 scroll-mt-20">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900/60">
            ⚡ Instant Browser Utilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            100% Client-Side &amp; Private Web Tools
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            No files are ever uploaded to our servers. All conversions and extractions run natively in your browser using modern Web APIs.
          </p>
        </div>

        {/* 4 Tool Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolsData.map((tool) => (
            <div
              key={tool.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-all duration-300 shadow-xl backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/30 transition-colors shadow-inner">
                    {renderIcon(tool.icon)}
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                    100% Client-Side
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  {tool.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                  {tool.desc}
                </p>

                {/* Capabilities Checklist */}
                <div className="mt-5 space-y-2 pt-4 border-t border-slate-800/80">
                  {tool.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <svg className="w-3.5 h-3.5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-4">
                <Link
                  href={`/tools/${tool.slug}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-sm font-semibold transition-all duration-200 active:scale-[0.98] shadow-md border border-slate-700/60 hover:border-indigo-500"
                >
                  <span>Launch Tool</span>
                  <span className="text-base">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
