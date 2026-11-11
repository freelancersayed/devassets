"use client";

import { useState } from "react";
import Link from "next/link";
import { FadeInView } from "@/components/motion/MotionContainers";

interface TabCode {
  filename: string;
  language: string;
  code: string;
}

const TABS: TabCode[] = [
  {
    filename: "convert.ts",
    language: "typescript",
    code: `import { createFFmpeg } from "@ffmpeg/ffmpeg";

// 100% Client-Side In-Memory Audio Extraction
export async function extractAudio(file: File): Promise<Blob> {
  const ffmpeg = createFFmpeg({ log: false });
  await ffmpeg.load();

  ffmpeg.FS("writeFile", file.name, await fetchFile(file));
  await ffmpeg.run("-i", file.name, "-vn", "-acodec", "pcm_s16le", "output.wav");

  const data = ffmpeg.FS("readFile", "output.wav");
  return new Blob([data.buffer], { type: "audio/wav" });
}`,
  },
  {
    filename: "prompt.json",
    language: "json",
    code: `{
  "role": "Principal Systems Architect",
  "task": "Refactor React Monorepo to Next.js 15 App Router",
  "constraints": {
    "zero_server_leaks": true,
    "strict_token_contracts": true,
    "framework": "Tailwind CSS v4 + TypeScript 5.8"
  },
  "deliverables": [
    "Atomic design token mapping",
    "Zero-flicker hydration architecture",
    "Client-side WASM thread pooling"
  ]
}`,
  },
  {
    filename: "architecture.md",
    language: "markdown",
    code: `# Client-First Architectural Blueprint

1. **Air-Gapped Processing**: Zero payload bytes leave browser memory.
2. **Deterministic Output**: Reproducible code patterns across LLMs.
3. **Sub-10ms Latency**: Native Web Audio API & Canvas Web Workers.
4. **Indemnity**: Unrestricted commercial redistribution rights.`,
  },
];

export default function Hero() {
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeTab = TABS[activeTabIdx];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0B0C0E] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-neutral-200/80 dark:border-neutral-850 overflow-hidden transition-colors">
      {/* Subtle Razor-Sharp 1px Grid Matrix */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />

      {/* Restrained Edge Vignette to frame the canvas */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(250,250,250,0.85)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(11,12,14,0.95)_100%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* LEFT COLUMN: EDITORIAL GROUNDED HEADLINE & CTAS */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Version / Release Pill Tag */}
          <FadeInView delay={0} duration={0.3} y={8}>
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 px-3 py-1 text-xs font-mono text-neutral-600 dark:text-neutral-400 backdrop-blur-sm shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>v2.4 stable &middot; 100% client-side execution</span>
            </div>
          </FadeInView>

          {/* Main Grounded Headline */}
          <FadeInView delay={0.05} duration={0.35} y={10}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.035em] text-neutral-900 dark:text-neutral-50 leading-[1.08] text-balance">
              Engineered Developer Utilities, AI Prompts &amp; Architecture Guides
            </h1>
          </FadeInView>

          {/* Subtitle in Human Tone */}
          <FadeInView delay={0.08} duration={0.35} y={10}>
            <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl text-pretty">
              A curated toolkit of client-side browser utilities, 450+ production-ready prompts, and in-depth JavaScript &amp; React architectural blueprints. Built for engineers who value performance and privacy.
            </p>
          </FadeInView>

          {/* Clean Primary & Secondary Action Buttons */}
          <FadeInView delay={0.1} duration={0.35} y={8}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:translate-y-[1px] text-white text-sm font-medium shadow-xs transition-all"
              >
                <span>Explore Free Tools</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-850 active:translate-y-[1px] text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 text-sm font-medium shadow-xs transition-all"
              >
                <span>Browse Products</span>
              </a>
            </div>
          </FadeInView>

          {/* Grounded Engineering Metrics */}
          <FadeInView delay={0.12} duration={0.35} y={8}>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-850 bg-white/60 dark:bg-neutral-900/40">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">0 KB</div>
                <div className="text-[11px] text-neutral-500">Server Uploads</div>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-850 bg-white/60 dark:bg-neutral-900/40">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">&lt; 10ms</div>
                <div className="text-[11px] text-neutral-500">WASM Latency</div>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-850 bg-white/60 dark:bg-neutral-900/40">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">TypeScript</div>
                <div className="text-[11px] text-neutral-500">Strict Engine</div>
              </div>
              <div className="p-2.5 rounded-lg border border-neutral-200/70 dark:border-neutral-850 bg-white/60 dark:bg-neutral-900/40">
                <div className="font-semibold text-neutral-800 dark:text-neutral-200">MIT / Comm.</div>
                <div className="text-[11px] text-neutral-500">Rights Included</div>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* RIGHT COLUMN: REAL INTERACTIVE CODE & UTILITY TERMINAL */}
        <div className="lg:col-span-5 flex justify-center">
          <FadeInView delay={0.08} duration={0.4} scale={0.98} className="w-full max-w-lg">
            <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E1015] shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-xs">
              {/* Terminal Window Chrome / Tabs */}
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/70 dark:bg-neutral-900/80 px-3.5 py-2.5 select-none">
                {/* macOS Style Traffic Dots */}
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-rose-500/80 transition-colors" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-amber-500/80 transition-colors" />
                  <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-neutral-700 hover:bg-emerald-500/80 transition-colors" />
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1">
                  {TABS.map((tab, idx) => (
                    <button
                      key={tab.filename}
                      type="button"
                      onClick={() => setActiveTabIdx(idx)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                        activeTabIdx === idx
                          ? "bg-white dark:bg-[#0E1015] text-neutral-900 dark:text-neutral-100 font-semibold border border-neutral-200/80 dark:border-neutral-800 shadow-xs"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                      }`}
                    >
                      {tab.filename}
                    </button>
                  ))}
                </div>

                {/* Interactive Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Copied</span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {/* Code Editor Body with Line Numbers */}
              <div className="p-4 overflow-x-auto max-h-[380px] bg-neutral-50/50 dark:bg-[#0A0C0F] text-neutral-700 dark:text-neutral-300 leading-relaxed">
                <pre className="grid grid-cols-[auto_1fr] gap-x-4">
                  {/* Line Numbers */}
                  <span className="select-none text-right text-neutral-400 dark:text-neutral-600 space-y-0.5">
                    {activeTab.code.split("\n").map((_, i) => (
                      <span key={i} className="block leading-5">
                        {i + 1}
                      </span>
                    ))}
                  </span>

                  {/* Code Lines */}
                  <code className="space-y-0.5 whitespace-pre">
                    {activeTab.code.split("\n").map((line, i) => (
                      <span key={i} className="block leading-5">
                        {line || " "}
                      </span>
                    ))}
                  </code>
                </pre>
              </div>

              {/* Terminal Status Footer Bar */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/50 px-3.5 py-1.5 flex items-center justify-between text-[10px] text-neutral-500">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>WASM Thread Ready</span>
                </div>
                <span>UTF-8 &middot; {activeTab.language}</span>
              </div>
            </div>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
