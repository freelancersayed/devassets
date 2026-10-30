"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { toolsData, type ToolItem } from "@/data/catalog";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  MagneticButton,
} from "@/components/motion/MotionContainers";

/**
 * Encodes an AudioBuffer into standard 16-bit PCM lossless WAV format.
 */
function audioBufferToWav(buffer: AudioBuffer): Blob {
  const numChannels = buffer.numberOfChannels;
  const sampleRate = buffer.sampleRate;
  const format = 1; // 1 = Linear PCM
  const bitDepth = 16;
  const bytesPerSample = bitDepth / 8;
  const blockAlign = numChannels * bytesPerSample;
  const numSamples = buffer.length;
  const dataSize = numSamples * blockAlign;
  const bufferSize = 44 + dataSize;

  const arrayBuffer = new ArrayBuffer(bufferSize);
  const view = new DataView(arrayBuffer);

  const writeString = (offset: number, str: string) => {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  };

  /* RIFF chunk descriptor */
  writeString(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeString(8, "WAVE");

  /* "fmt " sub-chunk */
  writeString(12, "fmt ");
  view.setUint32(16, 16, true); // SubChunk1Size (16 for PCM)
  view.setUint16(20, format, true); // AudioFormat
  view.setUint16(22, numChannels, true); // NumChannels
  view.setUint32(24, sampleRate, true); // SampleRate
  view.setUint32(28, sampleRate * blockAlign, true); // ByteRate
  view.setUint16(32, blockAlign, true); // BlockAlign
  view.setUint16(34, bitDepth, true); // BitsPerSample

  /* "data" sub-chunk */
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  // Write 16-bit PCM samples interleaved
  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      const intSample = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

export default function ToolsSection() {
  const [activeTool, setActiveTool] = useState<ToolItem | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [audioDuration, setAudioDuration] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetToolState = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setIsProcessing(false);
    setProcessSuccess(false);
    setProgress(0);
    setStatusMsg("");
    setErrorMsg(null);
    setIsDragging(false);
    setSelectedFile(null);
    setDownloadUrl(null);
    setOutputFileName("");
    setAudioDuration("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleLaunch = (tool: ToolItem) => {
    resetToolState();
    setActiveTool(tool);
  };

  const handleCloseModal = () => {
    resetToolState();
    setActiveTool(null);
  };

  // Video-to-Audio Detacher core client-side processing
  const processVideoFile = (file: File) => {
    if (!file) return;

    const validExtensions = [".mp4", ".webm", ".mov"];
    const fileExt = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();
    const isValid =
      validExtensions.includes(fileExt) ||
      file.type.startsWith("video/") ||
      file.type === "video/quicktime" ||
      file.type === "video/mp4" ||
      file.type === "video/webm";

    if (!isValid) {
      setErrorMsg("Please select a supported video file (.mp4, .webm, or .mov).");
      return;
    }

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(null);
    }

    setSelectedFile(file);
    setIsProcessing(true);
    setProcessSuccess(false);
    setErrorMsg(null);
    setProgress(15);
    setStatusMsg(`Reading ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    const reader = new FileReader();

    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.min(45, Math.round((event.loaded / event.total) * 45));
        setProgress(percent);
      }
    };

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (!arrayBuffer) {
          throw new Error("Unable to read video file buffer.");
        }

        setProgress(50);
        setStatusMsg("Decoding audio track via browser Web Audio API...");

        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error("Web Audio API is not supported in this browser.");
        }

        const audioCtx = new AudioContextClass();

        setProgress(70);
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        setProgress(85);
        setStatusMsg("Encoding lossless 16-bit PCM WAV...");

        const wavBlob = audioBufferToWav(audioBuffer);
        const url = URL.createObjectURL(wavBlob);

        const safeBaseName = file.name.replace(/\.[^/.]+$/, "");
        const finalWavName = `${safeBaseName}.wav`;

        const minutes = Math.floor(audioBuffer.duration / 60);
        const seconds = Math.floor(audioBuffer.duration % 60);
        const durationStr = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        setDownloadUrl(url);
        setOutputFileName(finalWavName);
        setAudioDuration(durationStr);
        setProgress(100);
        setStatusMsg(`Audio track extracted successfully (${durationStr})!`);
        setIsProcessing(false);
        setProcessSuccess(true);

        audioCtx.close().catch(() => {});
      } catch (err: unknown) {
        console.error("Audio extraction error:", err);
        setIsProcessing(false);
        setErrorMsg(
          err instanceof Error && err.message
            ? err.message
            : "Could not decode audio track. The video may have no audio or uses an unsupported codec."
        );
      }
    };

    reader.onerror = () => {
      setIsProcessing(false);
      setErrorMsg("Failed to read the video file. Please try again.");
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processVideoFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processVideoFile(e.target.files[0]);
    }
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = outputFileName || "extracted-audio.wav";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleRunDemo = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setProcessSuccess(true);
    }, 1200);
  };

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
        <FadeInView y={20} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900/60 shadow-inner">
            ⚡ Instant Browser Utilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            100% Client-Side &amp; Private Web Tools
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            No files are ever uploaded to our servers. All conversions and extractions run natively in your browser using modern Web APIs.
          </p>
        </FadeInView>

        {/* 4 Tool Cards Grid with Staggered Scroll-In & Hover Lift */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {toolsData.map((tool) => (
            <StaggerItem key={tool.id}>
              <InteractiveCard className="h-full">
                <div className="group relative flex flex-col justify-between h-full rounded-2xl border border-slate-800 bg-slate-900/60 p-7 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-colors duration-300 shadow-xl backdrop-blur-sm">
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
                        {renderIcon(tool.icon)}
                      </div>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
                        {tool.badge || "Free Tool"}
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

                  {/* Action Button: Dedicated page link for pdf-to-word & image-to-text, interactive modal launcher for others */}
                  <div className="mt-6 pt-4">
                    <MagneticButton className="w-full">
                      {tool.slug === "pdf-to-word" || tool.slug === "image-to-text" ? (
                        <Link
                          href={`/tools/${tool.slug}`}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-sm font-semibold transition-all duration-200 shadow-md border border-slate-700/60 hover:border-indigo-500 active:scale-[0.98]"
                        >
                          <span>Launch Tool</span>
                          <span className="text-base">→</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleLaunch(tool)}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-sm font-semibold transition-all duration-200 shadow-md border border-slate-700/60 hover:border-indigo-500 cursor-pointer active:scale-[0.98]"
                        >
                          <span>Launch Tool</span>
                          <span className="text-base">→</span>
                        </button>
                      )}
                    </MagneticButton>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Interactive Tool Modal Launcher with AnimatePresence */}
      <AnimatePresence>
        {activeTool && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
            onClick={handleCloseModal}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 border border-slate-800">
                  {renderIcon(activeTool.icon)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-50">{activeTool.title}</h3>
                  <span className="text-xs text-emerald-400 font-medium">⚡ Client-Side Web API Engine</span>
                </div>
              </div>

              <p className="text-xs text-slate-400 mt-2 mb-5">
                {activeTool.privacyNotice}
              </p>

              {activeTool.slug === "video-to-audio" ? (
                /* ─── Video to Audio Detacher Interactive UI ─── */
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
                    onChange={handleFileChange}
                    className="hidden"
                    id="videoFileInput"
                  />

                  {/* Sandbox Dropzone Area */}
                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`rounded-xl border-2 border-dashed p-8 text-center space-y-3 cursor-pointer transition-all duration-200 ${
                      isDragging
                        ? "border-cyan-400 bg-cyan-950/30 scale-[1.01]"
                        : "border-slate-700 bg-slate-950/80 hover:border-cyan-500/60 hover:bg-slate-950"
                    }`}
                  >
                    <div className="mx-auto w-12 h-12 rounded-full bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center text-cyan-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                      </svg>
                    </div>

                    {selectedFile ? (
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-cyan-300 truncate max-w-sm mx-auto">
                          {selectedFile.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Click or drop to choose another video
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-200">
                          Drag &amp; drop MP4, WebM or MOV file here or click to browse
                        </p>
                        <p className="text-xs text-slate-500">
                          Processed locally in your browser memory via Web Audio API. 100% private.
                        </p>
                      </>
                    )}
                  </div>

                  {/* Status / Output Preview */}
                  <div className="mt-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Privacy Status:</span>
                      <span className="text-emerald-400 font-semibold">🔒 0 Bytes Uploaded</span>
                    </div>

                    {isProcessing && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between text-cyan-400 font-medium animate-pulse">
                          <div className="flex items-center gap-2">
                            <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            <span>{statusMsg || "Processing video file in browser memory..."}</span>
                          </div>
                          <span className="font-mono text-cyan-300">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-200 rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {processSuccess && (
                      <div className="space-y-1 pt-1">
                        <div className="flex items-center justify-between text-emerald-400 font-medium">
                          <span>✓ Done! Audio extracted in lossless 16-bit PCM WAV.</span>
                          {audioDuration && <span className="font-mono text-xs">⏱ {audioDuration}</span>}
                        </div>
                        {outputFileName && (
                          <p className="text-[11px] text-slate-400 font-mono truncate">
                            Ready: {outputFileName}
                          </p>
                        )}
                      </div>
                    )}

                    {errorMsg && (
                      <div className="text-rose-400 font-medium py-1 flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </div>

                  {/* Modal Actions */}
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    {processSuccess && downloadUrl ? (
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download {outputFileName || "Audio.wav"}</span>
                      </button>
                    ) : isProcessing ? (
                      <button
                        type="button"
                        disabled
                        className="flex-1 py-3 px-4 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-semibold text-sm cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Extracting Audio ({progress}%)...</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 py-3 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>Choose Video File (.mp4, .webm, .mov)</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              ) : (
                /* ─── Generic Fallback / Other Tools UI ─── */
                <>
                  <div className="rounded-xl border-2 border-dashed border-slate-700 bg-slate-950/80 p-8 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center text-indigo-400">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-200">
                      Drag &amp; drop file here or click to browse
                    </p>
                    <p className="text-xs text-slate-500">
                      Processed locally in your browser memory via WebAssembly &amp; Web Workers.
                    </p>
                  </div>

                  <div className="mt-5 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div className="flex items-center justify-between text-slate-400 mb-2">
                      <span>Privacy Status:</span>
                      <span className="text-emerald-400 font-semibold">🔒 0 Bytes Uploaded</span>
                    </div>
                    {isProcessing && (
                      <div className="flex items-center gap-2 text-indigo-400 font-medium py-1 animate-pulse">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Processing file stream in browser memory...</span>
                      </div>
                    )}
                    {processSuccess && (
                      <div className="text-emerald-400 font-medium py-1">
                        ✓ Done! Extracted output generated. Click below to download.
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    {activeTool.slug === "pdf-to-word" || activeTool.slug === "image-to-text" ? (
                      <Link
                        href={`/tools/${activeTool.slug}`}
                        className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors text-center"
                      >
                        Open Full Converter Page →
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRunDemo}
                        disabled={isProcessing}
                        className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-colors cursor-pointer disabled:opacity-50"
                      >
                        {isProcessing ? "Processing..." : "Run Client-Side Test"}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
