"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  type ImageOutputFormat,
  type AspectRatioPreset,
  type ResizeFitMode,
  type ProcessImageOptions,
  type ProcessedImageResult,
  formatBytes,
  loadImageFromFile,
  processImage,
} from "@/lib/imageProcessing";
import { createZipBlob, type ZipEntry } from "@/lib/zipBuilder";

interface LoadedImageItem {
  id: string;
  file: File;
  imgElement: HTMLImageElement;
  result?: ProcessedImageResult;
}

export default function ImageStudioClient() {
  const [items, setItems] = useState<LoadedImageItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Settings
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<ImageOutputFormat>("webp");
  const [aspectRatio, setAspectRatio] = useState<AspectRatioPreset>("original");
  const [fitMode, setFitMode] = useState<ResizeFitMode>("cover");
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [customWidth, setCustomWidth] = useState<number>(1080);
  const [customHeight, setCustomHeight] = useState<number>(1080);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const addMoreInputRef = useRef<HTMLInputElement>(null);

  // Re-process images when settings change
  const runProcessing = useCallback(
    async (currentItems: LoadedImageItem[]) => {
      if (currentItems.length === 0) return;
      setIsProcessing(true);

      const options: ProcessImageOptions = {
        format,
        quality: quality / 100,
        aspectRatio,
        fitMode,
        scalePercent,
        customWidth: aspectRatio === "custom" ? customWidth : undefined,
        customHeight: aspectRatio === "custom" ? customHeight : undefined,
      };

      try {
        const updated = await Promise.all(
          currentItems.map(async (item) => {
            if (item.result?.previewUrl) {
              URL.revokeObjectURL(item.result.previewUrl);
            }
            const result = await processImage(item.file, item.imgElement, options);
            return { ...item, result };
          })
        );
        setItems(updated);
      } catch (err) {
        console.error("Batch processing error:", err);
      } finally {
        setIsProcessing(false);
      }
    },
    [format, quality, aspectRatio, fitMode, scalePercent, customWidth, customHeight]
  );

  // Trigger processing on settings change with debounce
  useEffect(() => {
    if (items.length > 0) {
      const timer = setTimeout(() => {
        runProcessing(items);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [format, quality, aspectRatio, fitMode, scalePercent, customWidth, customHeight]);

  const handleFilesSelected = async (files: FileList | File[]) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    if (validFiles.length === 0) return;

    setIsProcessing(true);
    const newItems: LoadedImageItem[] = [];

    for (const file of validFiles) {
      try {
        const img = await loadImageFromFile(file);
        newItems.push({
          id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
          file,
          imgElement: img,
        });
      } catch (err) {
        console.error("Failed to load image:", err);
      }
    }

    const combined = [...items, ...newItems];
    setItems(combined);
    await runProcessing(combined);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(e.dataTransfer.files);
    }
  };

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((i) => i.id === id);
      if (target?.result?.previewUrl) {
        URL.revokeObjectURL(target.result.previewUrl);
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const clearAll = () => {
    items.forEach((item) => {
      if (item.result?.previewUrl) {
        URL.revokeObjectURL(item.result.previewUrl);
      }
    });
    setItems([]);
  };

  // Download a single file
  const downloadSingle = (item: LoadedImageItem) => {
    if (!item.result) return;
    const a = document.createElement("a");
    a.href = item.result.previewUrl;
    a.download = item.result.fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Download all as ZIP
  const downloadAllZip = async () => {
    if (items.length === 0) return;
    setIsProcessing(true);

    try {
      const entries: ZipEntry[] = await Promise.all(
        items.map(async (item) => {
          if (!item.result) throw new Error("Item not processed");
          const arrayBuffer = await item.result.blob.arrayBuffer();
          return {
            name: item.result.fileName,
            data: new Uint8Array(arrayBuffer),
          };
        })
      );

      const zipBlob = createZipBlob(entries);
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `smart-images-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate ZIP:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Summary statistics
  const totalOriginalSize = items.reduce((acc, i) => acc + (i.file.size || 0), 0);
  const totalCompressedSize = items.reduce(
    (acc, i) => acc + (i.result?.compressedSize || i.file.size || 0),
    0
  );
  const totalSavings =
    totalOriginalSize > 0
      ? Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Navigation Breadcrumb & Header */}
        <div className="text-center space-y-3">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>&larr; Back to All Utilities</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-xs font-semibold text-emerald-400 mx-auto shadow-inner">
            ⚡ 100% Client-Side Canvas Engine — Zero Telemetry
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Smart Image Studio
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Compress file sizes, convert formats (WebP, JPEG, PNG), and bulk resize aspect ratios with instant live previews. Zero images are ever uploaded to any server.
          </p>
        </div>

        {/* Dropzone Area when no files loaded */}
        {items.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-8 sm:p-14 shadow-2xl backdrop-blur-sm space-y-6">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              multiple
              onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
              className="hidden"
              id="initialImageInput"
            />
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-10 sm:p-16 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? "border-emerald-400 bg-emerald-950/40 scale-[1.01]"
                  : "border-slate-700 bg-slate-950/80 hover:border-emerald-500/60 hover:bg-slate-950"
              }`}
            >
              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base sm:text-lg font-bold text-slate-100">
                Drag &amp; drop images here or click to browse
              </p>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Supports single or multiple (Bulk) PNG, JPG, and WebP files.
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-900/60 px-3 py-1 rounded-full">
                <span>🔒 100% In-Memory Private Processing</span>
              </div>
            </div>
          </div>
        ) : (
          /* Main Studio Workspace */
          <div className="space-y-8">
            {/* Control Panel Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 shadow-xl backdrop-blur-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950 border border-emerald-800/60 text-emerald-400">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </span>
                  <div>
                    <h2 className="text-lg font-bold text-slate-100">Studio Settings</h2>
                    <p className="text-xs text-slate-400">Adjust compression quality, format, and aspect ratios</p>
                  </div>
                </div>

                {/* Bulk Actions */}
                <div className="flex items-center gap-2.5">
                  <input
                    ref={addMoreInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    onChange={(e) => e.target.files && handleFilesSelected(e.target.files)}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => addMoreInputRef.current?.click()}
                    className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center gap-1.5 border border-slate-700/60 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add More</span>
                  </button>
                  <button
                    type="button"
                    onClick={clearAll}
                    className="py-2 px-3.5 rounded-xl bg-slate-800/60 hover:bg-rose-950/60 hover:text-rose-400 text-slate-400 text-xs font-semibold transition-colors border border-slate-800 cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Grid of Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Quality & Compression Slider */}
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Quality: <span className="text-emerald-400 font-extrabold">{quality}%</span>
                    </label>
                    <span className="text-[11px] text-slate-400">
                      {quality > 85 ? "Max Quality" : quality > 60 ? "Balanced" : "High Compression"}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={quality}
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                    <span>10% (Smallest)</span>
                    <span>80% (Sweet spot)</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* 2. Format Converter Dropdown */}
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    Target Format
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(["webp", "jpeg", "png"] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setFormat(fmt)}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                          format === fmt
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-950/50"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {format === "webp" && "⭐ Best compression with full transparency support."}
                    {format === "jpeg" && "Standard photo format with solid white background."}
                    {format === "png" && "Lossless transparency (larger file size)."}
                  </p>
                </div>

                {/* 3. Aspect Ratio Presets */}
                <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                    Aspect Ratio
                  </label>
                  <select
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value as AspectRatioPreset)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700/80 text-xs font-medium text-slate-200 focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="original">Original Ratio (No crop)</option>
                    <option value="1:1">1:1 Square (Instagram / Profile)</option>
                    <option value="16:9">16:9 Landscape (YouTube / Banner)</option>
                    <option value="4:5">4:5 Portrait (IG Feed / Mobile)</option>
                    <option value="9:16">9:16 Vertical (Stories / TikTok)</option>
                    <option value="custom">Custom Dimensions (W × H)</option>
                  </select>

                  {/* Fit mode selector when ratio is not original */}
                  {aspectRatio !== "original" && (
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[11px] text-slate-400">Fit Mode:</span>
                      <div className="flex gap-1.5">
                        {(["cover", "contain"] as const).map((mode) => (
                          <button
                            key={mode}
                            type="button"
                            onClick={() => setFitMode(mode)}
                            className={`px-2 py-0.5 rounded text-[11px] capitalize cursor-pointer ${
                              fitMode === mode
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-800 text-slate-400 hover:text-slate-200"
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Custom Dimensions Input Row (Conditional) */}
              {aspectRatio === "custom" && (
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-wrap items-center gap-4 text-xs">
                  <span className="font-bold text-slate-300">Custom Dimensions:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-center text-slate-200 font-semibold"
                    />
                    <span className="text-slate-400">×</span>
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-center text-slate-200 font-semibold"
                    />
                    <span className="text-slate-500">px</span>
                  </div>
                </div>
              )}

              {/* Scale Percent Quick Selector */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Resolution Scale:</span>
                  <div className="flex gap-1.5">
                    {[100, 75, 50, 25].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setScalePercent(pct)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                          scalePercent === pct
                            ? "bg-slate-700 text-white border border-slate-600"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Overall Summary Badge */}
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-slate-400">
                    Total: <strong className="text-slate-200">{formatBytes(totalOriginalSize)}</strong> &rarr;{" "}
                    <strong className="text-emerald-400">{formatBytes(totalCompressedSize)}</strong>
                  </span>
                  {totalSavings > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      &minus;{totalSavings}% Saved
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bulk Download Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-900/40 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  {items.length}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-100">
                    {items.length} {items.length === 1 ? "Image" : "Images"} Ready
                  </h3>
                  <p className="text-xs text-slate-400">
                    Format: <span className="uppercase text-emerald-400 font-semibold">{format}</span> &bull; Quality: {quality}%
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                {items.length > 1 ? (
                  <button
                    type="button"
                    onClick={downloadAllZip}
                    disabled={isProcessing}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download All as ZIP (.zip)</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => downloadSingle(items[0])}
                    disabled={isProcessing || !items[0]?.result}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/60 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Processed Image</span>
                  </button>
                )}
              </div>
            </div>

            {/* Grid of Image Preview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => {
                const res = item.result;
                return (
                  <div
                    key={item.id}
                    className="group relative rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden shadow-lg hover:border-slate-700 transition-all flex flex-col justify-between"
                  >
                    {/* Top Preview Image */}
                    <div className="relative aspect-video w-full bg-slate-950/90 flex items-center justify-center overflow-hidden border-b border-slate-800">
                      {res?.previewUrl ? (
                        <img
                          src={res.previewUrl}
                          alt={res.fileName}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <div className="animate-pulse text-xs text-slate-500">Processing...</div>
                      )}

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2.5 right-2.5 h-7 w-7 rounded-full bg-slate-900/80 hover:bg-rose-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
                        title="Remove image"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Savings Pill */}
                      {res && res.savingsPercent > 0 && (
                        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-emerald-500/90 text-white font-bold text-[10px] px-2.5 py-0.5 shadow-md">
                          &minus;{res.savingsPercent}%
                        </span>
                      )}
                    </div>

                    {/* Card Content & Details */}
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-200 truncate" title={item.file.name}>
                          {item.file.name}
                        </p>
                        {res && (
                          <p className="text-[11px] text-slate-500">
                            {res.originalWidth} &times; {res.originalHeight} &rarr;{" "}
                            <span className="text-slate-300 font-semibold">
                              {res.newWidth} &times; {res.newHeight} px
                            </span>
                          </p>
                        )}
                      </div>

                      {/* Size Comparison Badge */}
                      {res && (
                        <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Original</span>
                            <span className="font-semibold text-slate-300">
                              {formatBytes(res.originalSize)}
                            </span>
                          </div>
                          <span className="text-slate-600">&rarr;</span>
                          <div className="text-right">
                            <span className="text-slate-500 block text-[10px]">Optimized</span>
                            <span className="font-bold text-emerald-400">
                              {formatBytes(res.compressedSize)}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Single Download Button */}
                      <button
                        type="button"
                        onClick={() => downloadSingle(item)}
                        disabled={!res}
                        className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download ({res?.outputFormat.toUpperCase()})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Feature / Privacy Assurance Footer */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6 sm:p-8 text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-emerald-400 text-sm font-bold">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% Client-Side Privacy &amp; Zero Telemetry</span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            All canvas rendering, aspect ratio cropping, and compression routines execute purely inside your browser memory. DevAssets never transmits or saves any image data to external servers.
          </p>
        </div>
      </div>
    </div>
  );
}
