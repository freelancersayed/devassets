"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";

type Status = "idle" | "processing" | "done" | "error";
type Lang = "beng" | "en";

export default function ConverterCard() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("beng");
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile?: File | null) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setStatus("error");
      setStatusMsg("Please select a valid image file (PNG, JPG, WEBP, BMP).");
      return;
    }
    setFile(selectedFile);
    setStatus("idle");
    setStatusMsg("");

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === "string") {
        setPreviewUrl(e.target.result);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleConvert = async () => {
    if (!file) {
      setStatus("error");
      setStatusMsg("Please choose an image file first.");
      return;
    }

    try {
      setStatus("processing");
      setStatusMsg("Analyzing layout, extracting tables & running multilingual OCR...");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("lang", lang);

      const defaultBackend = "https://devassets-python-api.onrender.com";
      const backendUrl = (process.env.NEXT_PUBLIC_PYTHON_API_URL || defaultBackend).replace(/\/$/, "");
      const endpoint = `${backendUrl}/api/convert`;

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let errMessage = "Conversion failed. Python API backend is offline or unreachable.";
        try {
          const errData = await res.json();
          if (errData.detail) errMessage = errData.detail;
        } catch {
          // ignore parsing error
        }
        throw new Error(errMessage);
      }

      setStatusMsg("Generating .DOCX file with native tables...");
      const blob = await res.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      const baseName = file.name.replace(/\.[^/.]+$/, "");
      a.download = `${baseName}_converted.docx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      setStatus("done");
      setStatusMsg("Conversion complete! Your formatted Word (.docx) file has been downloaded.");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred during conversion.";
      console.error("Conversion error:", err);
      setStatus("error");
      setStatusMsg(message);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setStatusMsg("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-slate-700/80">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800/80 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Image to Word Formatted Converter</h2>
            <p className="text-xs text-slate-400">PaddleOCR &bull; img2table &bull; Bengali + English</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Native .DOCX
        </span>
      </div>

      {/* Language Selector */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-sm gap-2">
        <span className="text-slate-300 font-medium text-xs sm:text-sm">Recognition Language:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLang("beng")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              lang === "beng"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            বাংলা + English
          </button>
          <button
            type="button"
            onClick={() => setLang("en")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              lang === "en"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                : "bg-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            English Only
          </button>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
        className={`relative group border-2 border-dashed rounded-2xl p-6 md:p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/10 scale-[1.01]"
            : file
            ? "border-emerald-500/40 bg-slate-950/40"
            : "border-slate-700/80 hover:border-indigo-500/60 bg-slate-950/30 hover:bg-slate-950/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {previewUrl ? (
          <div className="flex flex-col items-center gap-3">
            <div className="relative max-h-48 max-w-full overflow-hidden rounded-xl border border-slate-700 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={previewUrl} alt="Preview" className="max-h-48 object-contain" />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-white">{file?.name}</span>
              <span className="text-slate-500">&bull;</span>
              <span>{file ? (file.size / 1024).toFixed(1) : 0} KB</span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                reset();
              }}
              className="mt-1 text-xs text-rose-400 hover:text-rose-300 hover:underline"
            >
              Choose different image
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Click to browse or drag and drop your image
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Supports PNG, JPG, JPEG, WEBP, BMP (Tables, Bengali &amp; English text)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      {status !== "idle" && (
        <div
          className={`mt-5 p-4 rounded-2xl border text-sm flex items-start gap-3 transition-all ${
            status === "processing"
              ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
              : status === "done"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/40 border-rose-500/40 text-rose-200"
          }`}
        >
          {status === "processing" && (
            <svg className="animate-spin w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          )}
          {status === "done" && (
            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {status === "error" && (
            <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          <div className="flex-1">
            <span className="font-semibold block">
              {status === "processing"
                ? "Processing Image..."
                : status === "done"
                ? "Success!"
                : "Error"}
            </span>
            <span className="text-xs opacity-90">{statusMsg}</span>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleConvert}
          disabled={!file || status === "processing"}
          className={`w-full py-3.5 px-6 rounded-2xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
            !file || status === "processing"
              ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
              : "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white shadow-indigo-600/25 active:scale-[0.99] border border-indigo-400/30 cursor-pointer"
          }`}
        >
          {status === "processing" ? (
            <>
              <span>Extracting &amp; Formatting...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Convert &amp; Download .DOCX</span>
            </>
          )}
        </button>
      </div>

      {/* Feature Badges */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
        <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
          <p className="font-medium text-slate-300">Borderless &amp; Bordered</p>
          <p className="text-[10px] text-slate-500">Auto Table Grid</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
          <p className="font-medium text-slate-300">Bengali + English</p>
          <p className="text-[10px] text-slate-500">PaddleOCR Engine</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
          <p className="font-medium text-slate-300">Native Word</p>
          <p className="text-[10px] text-slate-500">Editable .DOCX</p>
        </div>
      </div>
    </div>
  );
}
