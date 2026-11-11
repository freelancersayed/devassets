"use client";

import { useState } from "react";
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
    <section className="relative min-h-[85vh] flex items-center justify-center bg-[#09090B] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 border-b border-[#27272A] overflow-hidden transition-colors">
      {/* Subtle Razor-Sharp 1px Grid Matrix */}
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none" />

      {/* Restrained Edge Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(9,9,11,0.95)_100%)]" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center relative z-10">
        {/* LEFT COLUMN: EDITORIAL GROUNDED HEADLINE & CTAS */}
        <div className="lg:col-span-7 space-y-6 text-left">
          {/* Version / Release Pill Tag */}
          <FadeInView delay={0} duration={0.3} y={8}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#27272A] bg-[#18181B]/80 px-3 py-1 text-xs font-mono text-[#A1A1AA] backdrop-blur-sm shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
              <span>v2.4 stable &middot; 100% client-side execution</span>
            </div>
          </FadeInView>

          {/* Main Grounded Headline with subtle emerald accent on key words */}
          <FadeInView delay={0.05} duration={0.35} y={10}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.035em] text-[#FAFAFA] leading-[1.1] text-balance">
              Engineered Developer Utilities, AI Prompts &amp;{" "}
              <span className="text-[#10B981]">Architecture Guides</span>
            </h1>
          </FadeInView>

          {/* Subtitle in Human Tone */}
          <FadeInView delay={0.08} duration={0.35} y={10}>
            <p className="text-base text-[#A1A1AA] leading-relaxed max-w-2xl text-pretty">
              A curated toolkit of client-side browser utilities, 450+ production-ready prompts, and in-depth JavaScript &amp; React architectural blueprints. Built for engineers who value performance and privacy.
            </p>
          </FadeInView>

          {/* Clean Primary & Secondary Action Buttons */}
          <FadeInView delay={0.1} duration={0.35} y={8}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.98] text-[#09090B] text-sm font-semibold shadow-md hover:shadow-emerald-glow transition-all"
              >
                <span>Try Free Tools</span>
                <span aria-hidden="true">&rarr;</span>
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#18181B] hover:bg-[#27272A] active:scale-[0.98] text-[#FAFAFA] border border-[#27272A] text-sm font-medium transition-all"
              >
                <span>Browse Products</span>
              </a>
            </div>
          </FadeInView>

          {/* Grounded Engineering Metrics */}
          <FadeInView delay={0.12} duration={0.35} y={8}>
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono text-[#A1A1AA]">
              <div className="p-2.5 rounded-lg border border-[#27272A] bg-[#18181B]/50">
                <div className="font-semibold text-[#FAFAFA]">0 KB</div>
                <div className="text-[11px] text-[#A1A1AA]">Server Uploads</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[#27272A] bg-[#18181B]/50">
                <div className="font-semibold text-[#10B981]">&lt; 10ms</div>
                <div className="text-[11px] text-[#A1A1AA]">WASM Latency</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[#27272A] bg-[#18181B]/50">
                <div className="font-semibold text-[#FAFAFA]">TypeScript</div>
                <div className="text-[11px] text-[#A1A1AA]">Strict Engine</div>
              </div>
              <div className="p-2.5 rounded-lg border border-[#27272A] bg-[#18181B]/50">
                <div className="font-semibold text-[#FAFAFA]">MIT / Comm.</div>
                <div className="text-[11px] text-[#A1A1AA]">Rights Included</div>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* RIGHT COLUMN: REAL DEVELOPER CODE TERMINAL PREVIEW */}
        <div className="lg:col-span-5 flex justify-center">
          <FadeInView delay={0.08} duration={0.4} scale={0.98} className="w-full max-w-lg">
            <div className="rounded-2xl border border-[#27272A] bg-[#18181B] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden font-mono text-xs">
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between border-b border-[#27272A] bg-[#09090B]/60 px-4 py-3 select-none">
                {/* Window controls */}
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#27272A] hover:bg-rose-500/80 transition-colors" />
                  <span className="w-3 h-3 rounded-full bg-[#27272A] hover:bg-amber-500/80 transition-colors" />
                  <span className="w-3 h-3 rounded-full bg-[#27272A] hover:bg-[#10B981]/80 transition-colors" />
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1">
                  {TABS.map((tab, idx) => (
                    <button
                      key={tab.filename}
                      type="button"
                      onClick={() => setActiveTabIdx(idx)}
                      className={`px-3 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                        activeTabIdx === idx
                          ? "bg-[#27272A] text-[#FAFAFA] font-semibold border-b-2 border-[#10B981]"
                          : "text-[#A1A1AA] hover:text-[#FAFAFA]"
                      }`}
                    >
                      {tab.filename}
                    </button>
                  ))}
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] px-2 py-0.5 rounded transition-colors cursor-pointer"
                  title="Copy code to clipboard"
                >
                  {copied ? (
                    <span className="text-[#10B981] font-medium">Copied!</span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {/* Code Editor Body with Line Numbers */}
              <div className="p-4 overflow-x-auto max-h-[380px] bg-[#09090B]/40 text-[#FAFAFA] leading-relaxed">
                <pre className="grid grid-cols-[auto_1fr] gap-x-4">
                  {/* Line Numbers */}
                  <span className="select-none text-right text-[#A1A1AA]/50 space-y-0.5">
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
              <div className="border-t border-[#27272A] bg-[#09090B]/60 px-4 py-2 flex items-center justify-between text-[11px] text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span className="text-[#10B981]">WASM Thread Ready</span>
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
