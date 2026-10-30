"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/**
 * Encodes an AudioBuffer into standard 16-bit PCM lossless WAV format.
 * High-performance TypedArray implementation.
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
  view.setUint32(16, 16, true);
  view.setUint16(20, format, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitDepth, true);

  /* "data" sub-chunk */
  writeString(36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < numChannels; c++) {
    channels.push(buffer.getChannelData(c));
  }

  const int16View = new Int16Array(arrayBuffer, 44, numSamples * numChannels);
  let p = 0;
  for (let i = 0; i < numSamples; i++) {
    for (let c = 0; c < numChannels; c++) {
      const sample = Math.max(-1, Math.min(1, channels[c][i]));
      int16View[p++] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
  }

  return new Blob([arrayBuffer], { type: "audio/wav" });
}

export default function VideoToAudioClient() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processSuccess, setProcessSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [outputFileName, setOutputFileName] = useState("");
  const [audioDuration, setAudioDuration] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    setSelectedFile(null);
    setIsProcessing(false);
    setProcessSuccess(false);
    setProgress(0);
    setStatusMsg("");
    setErrorMsg(null);
    setDownloadUrl(null);
    setOutputFileName("");
    setAudioDuration("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processVideoFile = (file: File) => {
    if (!file) return;

    const validExtensions = [".mp4", ".webm", ".mov", ".m4v", ".ogg", ".ogv"];
    const dotIndex = file.name.lastIndexOf(".");
    const fileExt = dotIndex !== -1 ? file.name.substring(dotIndex).toLowerCase() : "";
    const isValid =
      validExtensions.includes(fileExt) ||
      file.type.startsWith("video/") ||
      file.type.startsWith("audio/") ||
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
      if (event.lengthComputable && event.total > 0) {
        const percent = Math.min(45, Math.max(15, Math.round((event.loaded / event.total) * 45)));
        setProgress(percent);
      }
    };

    reader.onload = async (e) => {
      try {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          throw new Error("Unable to read video file buffer.");
        }

        setProgress(50);
        setStatusMsg("Initializing browser Web Audio API context...");

        const AudioContextClass =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

        if (!AudioContextClass) {
          throw new Error("Web Audio API is not supported in this browser.");
        }

        const audioCtx = new AudioContextClass();

        if (audioCtx.state === "suspended") {
          try {
            await audioCtx.resume();
          } catch {
            // resume if allowed
          }
        }

        setProgress(65);
        setStatusMsg("Decoding audio track via browser Web Audio API...");

        // Cross-browser decode with cloned buffer so detachment doesn't invalidate data
        const audioBuffer = await new Promise<AudioBuffer>((resolve, reject) => {
          let resolved = false;
          const bufferCopy = arrayBuffer.slice(0);

          const successCb = (buf: AudioBuffer) => {
            if (!resolved) {
              resolved = true;
              resolve(buf);
            }
          };

          const errorCb = (err: unknown) => {
            if (!resolved) {
              resolved = true;
              reject(err);
            }
          };

          try {
            const maybePromise = audioCtx.decodeAudioData(bufferCopy, successCb, errorCb);
            if (maybePromise && typeof maybePromise.then === "function") {
              maybePromise.then(successCb).catch(errorCb);
            }
          } catch (syncErr) {
            if (!resolved) {
              resolved = true;
              reject(syncErr);
            }
          }
        });

        setProgress(85);
        setStatusMsg("Encoding lossless 16-bit PCM WAV...");

        const wavBlob = audioBufferToWav(audioBuffer);
        const url = URL.createObjectURL(wavBlob);

        const safeBaseName = file.name.replace(/\.[^/.]+$/, "") || "extracted-audio";
        const finalWavName = `${safeBaseName}.wav`;

        const totalSecs = Math.floor(audioBuffer.duration);
        const minutes = Math.floor(totalSecs / 60);
        const seconds = totalSecs % 60;
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
            : "Could not decode audio track. The video may contain an unsupported codec or have no audio track."
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="text-center space-y-3">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>&larr; Back to All Utilities</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-xs font-semibold text-cyan-400 mx-auto">
            ⚡ 100% Client-Side Web Audio API Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Video to Audio Detacher
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Extract pure, lossless 16-bit PCM WAV audio from MP4, WebM, and MOV videos locally in your browser memory. Zero files are uploaded to any server.
          </p>
        </div>

        {/* Main Detacher Box */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-10 shadow-2xl backdrop-blur-sm space-y-6">
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime,.mp4,.webm,.mov"
            onChange={handleFileChange}
            className="hidden"
            id="standaloneVideoInput"
          />

          {/* Drag & Drop Area */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`rounded-2xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-cyan-400 bg-cyan-950/40 scale-[1.01]"
                : "border-slate-700 bg-slate-950/80 hover:border-cyan-500/60 hover:bg-slate-950"
            }`}
          >
            <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-4 shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12 0c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>

            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-base font-bold text-cyan-300 truncate max-w-md mx-auto">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-slate-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Click or drop another video to replace
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-base font-semibold text-slate-200">
                  Drag &amp; drop MP4, WebM, or MOV video here, or click to browse
                </p>
                <p className="text-xs text-slate-500">
                  Processed in-memory on your device using Web Audio API • 100% private
                </p>
              </div>
            )}
          </div>

          {/* Status & Progress Bar */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <span>Security &amp; Privacy:</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                🔒 0 Bytes Uploaded (100% Client-Side)
              </span>
            </div>

            {isProcessing && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-cyan-400 font-medium">
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{statusMsg || "Extracting audio..."}</span>
                  </div>
                  <span className="font-mono text-cyan-300 font-bold">{progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-200 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {processSuccess && (
              <div className="space-y-1.5 pt-1 text-emerald-400 font-medium">
                <div className="flex items-center justify-between">
                  <span>✓ Audio extraction finished! Formatted as lossless 16-bit PCM WAV.</span>
                  {audioDuration && <span className="font-mono text-xs">⏱ {audioDuration}</span>}
                </div>
                {outputFileName && (
                  <p className="text-xs text-slate-400 font-mono">
                    Output: {outputFileName}
                  </p>
                )}
              </div>
            )}

            {errorMsg && (
              <div className="text-rose-400 font-medium flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {processSuccess && downloadUrl ? (
              <>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="flex-1 py-4 px-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download {outputFileName || "Audio.wav"}</span>
                </button>
                <button
                  type="button"
                  onClick={resetState}
                  className="py-4 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-sm transition-colors cursor-pointer"
                >
                  Extract Another Video
                </button>
              </>
            ) : isProcessing ? (
              <button
                type="button"
                disabled
                className="w-full py-4 px-6 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-300 font-semibold text-base cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>Extracting Audio ({progress}%)...</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-base transition-all shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                <span>Select MP4, WebM, or MOV Video</span>
              </button>
            )}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-xl">⚡</span>
            <h3 className="font-bold text-slate-100 text-sm">Lossless 16-Bit PCM WAV</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Decoded directly from the video audio stream without re-compression or acoustic degradation.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-xl">🔒</span>
            <h3 className="font-bold text-slate-100 text-sm">100% Offline &amp; Client-Side</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your video stays exclusively on your machine. Nothing leaves your browser memory.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/40 space-y-2">
            <span className="text-xl">🎬</span>
            <h3 className="font-bold text-slate-100 text-sm">Multi-Format Video Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamlessly supports MP4, WebM, and MOV containers encoded with AAC, Opus, Vorbis, or PCM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

