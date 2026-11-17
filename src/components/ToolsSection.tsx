"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toolsData, type ToolItem } from "@/data/catalog";
import { extractAudioFromVideoFile } from "@/lib/audioExtraction";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionContainers";

const TOOL_SPECS: Record<string, { io: string; engine: string; speed: string }> = {
  "pdf-to-word": {
    io: ".PDF → .DOCX / .TXT",
    engine: "PDF.js + Docx Engine",
    speed: "< 20ms init",
  },
  "image-to-text": {
    io: "IMG → TXT (OCR)",
    engine: "Tesseract WASM",
    speed: "Multi-threaded",
  },
  "video-to-audio": {
    io: "MP4/WEBM → WAV (PCM)",
    engine: "Native Web Audio API",
    speed: "Real-time buffer",
  },
  "image-studio": {
    io: "PNG ⇄ WEBP ⇄ JPG",
    engine: "Canvas 2D Offscreen",
    speed: "Sub-10ms buffer",
  },
};

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Video to audio tool state inside modal
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoStatusMsg, setVideoStatusMsg] = useState("");
  const [videoError, setVideoError] = useState<string | null>(null);
  const [videoDownloadUrl, setVideoDownloadUrl] = useState<string | null>(null);
  const [videoOutputFileName, setVideoOutputFileName] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [isDraggingVideo, setIsDraggingVideo] = useState(false);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  const resetVideoState = () => {
    if (videoDownloadUrl) {
      URL.revokeObjectURL(videoDownloadUrl);
    }
    setVideoFile(null);
    setVideoProgress(0);
    setVideoStatusMsg("");
    setVideoError(null);
    setVideoDownloadUrl(null);
    setVideoOutputFileName("");
    setVideoDuration("");
    setIsDraggingVideo(false);
    if (videoFileInputRef.current) {
      videoFileInputRef.current.value = "";
    }
  };

  const handleLaunch = (tool: ToolItem) => {
    resetVideoState();
    setActiveTool(tool);
    setIsProcessing(false);
  };

  const handleCloseModal = () => {
    resetVideoState();
    setActiveTool(null);
    setIsProcessing(false);
  };

  const processVideo = async (file: File) => {
    if (!file) return;

    if (videoDownloadUrl) {
      URL.revokeObjectURL(videoDownloadUrl);
      setVideoDownloadUrl(null);
    }

    setVideoFile(file);
    setIsProcessing(true);
    setVideoError(null);
    setVideoProgress(5);
    setVideoStatusMsg(`Loading ${file.name}...`);

    try {
      const res = await extractAudioFromVideoFile(file, (pct, msg) => {
        setVideoProgress(pct);
        setVideoStatusMsg(msg);
      });

      setVideoDownloadUrl(res.url);
      setVideoOutputFileName(res.filename);
      setVideoDuration(res.duration);
      setVideoProgress(100);
      setVideoStatusMsg(`Audio track detached successfully (${res.duration})`);
      setIsProcessing(false);
    } catch (err: unknown) {
      console.error("Audio extraction error:", err);
      setIsProcessing(false);
      setVideoError(
        err instanceof Error && err.message
          ? err.message
          : "Could not decode audio track. The video may contain an unsupported codec."
      );
    }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processVideo(file);
    }
  };

  const handleVideoDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingVideo(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processVideo(file);
    }
  };

  const renderMonochromeIcon = (iconName: ToolItem["icon"]) => {
    switch (iconName) {
      case "FileText":
        return (
          <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case "ScanText":
        return (
          <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M7 9h10M7 13h10M7 17h6" />
          </svg>
        );
      case "Music":
        return (
          <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      case "Image":
        return (
          <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="tools"
      aria-labelledby="tools-heading"
      className="py-20 sm:py-24 bg-[#09090B] border-b border-[#27272A] scroll-mt-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <FadeInView y={16} className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3 py-1 text-xs font-mono text-[#10B981]">
            <span>client-side utilities</span>
          </div>

          <h2
            id="tools-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#FAFAFA] leading-tight"
          >
            Zero-Server Web Utilities
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            Execute file conversions, OCR, and audio extractions directly inside your browser. No files leave your machine, no queues, zero telemetry.
          </p>
        </FadeInView>

        {/* 4-COLUMN DEVELOPER UTILITY GRID */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {toolsData.map((tool) => {
            const spec = TOOL_SPECS[tool.slug] || {
              io: "LOCAL EXECUTION",
              engine: "Client API",
              speed: "< 10ms",
            };

            return (
              <StaggerItem key={tool.id} className="h-full">
                <div className="group rounded-2xl border border-[#27272A] bg-[#18181B] p-6 flex flex-col justify-between h-full hover:border-[#10B981]/50 hover:-translate-y-1 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                  <div className="space-y-4">
                    {/* Top Row: Icon + Monospace IO Badge in Emerald */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center shadow-xs">
                        {renderMonochromeIcon(tool.icon)}
                      </div>
                      <span className="font-mono text-[11px] font-medium text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/20">
                        {spec.io}
                      </span>
                    </div>

                    {/* Tool Title & Description */}
                    <div>
                      <h3 className="text-base font-semibold tracking-[-0.015em] text-[#FAFAFA] group-hover:text-[#10B981] transition-colors">
                        {tool.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed line-clamp-3">
                        {tool.desc}
                      </p>
                    </div>

                    {/* Technical Specs List */}
                    <div className="pt-3 border-t border-[#27272A] space-y-1.5 font-mono text-[11px] text-[#A1A1AA]">
                      <div className="flex items-center justify-between">
                        <span>Engine:</span>
                        <span className="text-[#FAFAFA]">{spec.engine}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Throughput:</span>
                        <span className="text-[#FAFAFA]">{spec.speed}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Privacy:</span>
                        <span className="text-[#10B981]">100% In-Memory</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch CTA */}
                  <div className="pt-5">
                    {tool.slug === "image-studio" ||
                    tool.slug === "image-to-text" ||
                    tool.slug === "pdf-to-word" ||
                    tool.slug === "video-to-audio" ? (
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#09090B] hover:bg-[#27272A] active:scale-[0.98] text-[#FAFAFA] text-xs font-medium border border-[#27272A] group-hover:border-[#10B981]/40 transition-all duration-150"
                      >
                        <span>Launch Tool</span>
                        <span className="text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">&nearr;</span>
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleLaunch(tool)}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#09090B] hover:bg-[#27272A] active:scale-[0.98] text-[#FAFAFA] text-xs font-medium border border-[#27272A] group-hover:border-[#10B981]/40 transition-all duration-150 cursor-pointer"
                      >
                        <span>Launch Tool</span>
                        <span className="text-[#10B981] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true">&nearr;</span>
                      </button>
                    )}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* ENTERPRISE PRO UTILITY SUITE WORKBENCH SPOTLIGHT */}
        <div className="mt-10 rounded-2xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30 px-2.5 py-0.5 rounded-full">
                CLI + Desktop Suite &middot; $39
              </span>
              <span className="text-xs text-[#A1A1AA] font-mono">
                Native macOS, Windows &amp; Linux
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold tracking-[-0.015em] text-[#FAFAFA]">
              Need Unrestricted Batch Processing &amp; Commercial Redistribution Rights?
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Process 10,000+ files locally without browser limits, automate CLI batch pipelines, access 100% unminified engine source code, and get a perpetual multi-client redistribution license.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/tools/pro-utility-suite"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.98] text-[#09090B] text-xs font-semibold text-center shadow-sm hover:shadow-emerald-glow transition-all"
            >
              Pro Workbench &rarr;
            </Link>
            <Link
              href="/products/pro-utility-suite"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#09090B] hover:bg-[#27272A] text-[#FAFAFA] text-xs font-medium border border-[#27272A] text-center transition-colors"
            >
              Specs &amp; License ($39)
            </Link>
          </div>
        </div>
      </div>

      {/* VIDEO TO AUDIO IN-BROWSER CONVERTER MODAL */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-lg bg-[#18181B] border border-[#27272A] rounded-2xl shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#09090B] border border-[#27272A]">
                  {renderMonochromeIcon(activeTool.icon)}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#FAFAFA]">
                    {activeTool.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#10B981]">
                    Client-Side In-Memory Engine
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] mb-5 leading-relaxed">
                {activeTool.privacyNotice}
              </p>

              {/* Video to Audio Specific Detacher */}
              {activeTool.slug === "video-to-audio" ? (
                <>
                  <input
                    ref={videoFileInputRef}
                    type="file"
                    accept=".mp4,.webm,.mov,.m4v,.mkv,video/*"
                    onChange={handleVideoFileChange}
                    className="hidden"
                  />

                  {/* Sandbox Dropzone Area */}
                  <div
                    onClick={() => videoFileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingVideo(true);
                    }}
                    onDragLeave={() => setIsDraggingVideo(false)}
                    onDrop={handleVideoDrop}
                    className={`rounded-xl border border-dashed p-8 text-center space-y-3 cursor-pointer transition-colors duration-150 ${
                      isDraggingVideo
                        ? "border-[#10B981] bg-[#10B981]/10"
                        : "border-[#27272A] hover:border-[#10B981]/50 bg-[#09090B]"
                    }`}
                  >
                    <div className="mx-auto w-10 h-10 rounded-lg bg-[#18181B] border border-[#27272A] flex items-center justify-center text-[#10B981]">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>

                    {videoFile ? (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-[#FAFAFA] truncate max-w-sm mx-auto">
                          {videoFile.name}
                        </p>
                        <p className="text-[11px] font-mono text-[#A1A1AA]">
                          {(videoFile.size / (1024 * 1024)).toFixed(2)} MB &middot; Ready to extract
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <p className="text-xs font-medium text-[#FAFAFA]">
                          Drop MP4, WebM or MOV video here
                        </p>
                        <p className="text-[11px] font-mono text-[#A1A1AA]">
                          or click to browse from local disk
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Processing Status / Progress */}
                  {isProcessing && (
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#A1A1AA]">
                        <span>{videoStatusMsg}</span>
                        <span>{videoProgress}%</span>
                      </div>
                      <div className="w-full bg-[#27272A] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#10B981] h-full transition-all duration-150"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {videoError && (
                    <div className="mt-4 p-3 rounded-lg bg-rose-950/30 border border-rose-900 text-rose-400 text-xs">
                      {videoError}
                    </div>
                  )}

                  {/* Download Action */}
                  {videoDownloadUrl && !isProcessing && (
                    <div className="mt-5 p-4 rounded-xl border border-[#27272A] bg-[#09090B] flex items-center justify-between gap-4">
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-[#FAFAFA] truncate">
                          {videoOutputFileName}
                        </div>
                        <div className="text-[11px] font-mono text-[#A1A1AA] mt-0.5">
                          PCM 16-bit WAV &middot; {videoDuration}
                        </div>
                      </div>
                      <a
                        href={videoDownloadUrl}
                        download={videoOutputFileName}
                        className="px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#34D399] text-[#09090B] text-xs font-semibold transition-colors shrink-0 shadow-sm hover:shadow-emerald-glow"
                      >
                        Download WAV
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl border border-[#27272A] bg-[#09090B] space-y-2 font-mono text-xs">
                    <div className="text-[#A1A1AA] uppercase tracking-wider text-[10px]">Capabilities:</div>
                    <ul className="space-y-1 text-[#FAFAFA]">
                      {activeTool.capabilities.map((c, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-[#10B981]">&check;</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={`/tools/${activeTool.slug}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-[#09090B] text-xs font-semibold transition-colors shadow-sm hover:shadow-emerald-glow"
                  >
                    <span>Open Dedicated Tool Page</span>
                    <span>&rarr;</span>
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
