"use client";

import { useState, useRef, useEffect, DragEvent, ChangeEvent } from "react";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Tesseract: any;
  }
}

type Status = "idle" | "loading-lib" | "processing" | "done" | "error";
type Lang = "beng" | "en";

export default function ConverterCard() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("beng");
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [extractedText, setExtractedText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Preload Tesseract.js script in the background
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.Tesseract) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
    script.async = true;
    script.onerror = () => {
      const fallbackScript = document.createElement("script");
      fallbackScript.src = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js";
      fallbackScript.async = true;
      document.head.appendChild(fallbackScript);
    };
    document.head.appendChild(script);
  }, []);

  const ensureTesseract = async () => {
    if (typeof window !== "undefined" && window.Tesseract) {
      return window.Tesseract;
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
      script.async = true;
      script.onload = () => resolve(window.Tesseract);
      script.onerror = () => {
        const fallback = document.createElement("script");
        fallback.src = "https://cdnjs.cloudflare.com/ajax/libs/tesseract.js/5.1.0/tesseract.min.js";
        fallback.async = true;
        fallback.onload = () => resolve(window.Tesseract);
        fallback.onerror = () =>
          reject(new Error("OCR engine could not be loaded. Please check your internet connection."));
        document.head.appendChild(fallback);
      };
      document.head.appendChild(script);
    });
  };

  const handleFileSelect = (selectedFile?: File | null) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      setStatus("error");
      setStatusMsg("Please select a valid image file (PNG, JPG, JPEG, WEBP, BMP).");
      return;
    }
    setFile(selectedFile);
    setStatus("idle");
    setStatusMsg("");
    setProgress(0);
    setExtractedText("");

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

  const generateAndDownloadDocx = (textToDownload: string, baseFileName: string) => {
    const safeTitle = (baseFileName || "Converted_Image").replace(/[^a-zA-Z0-9_\u0980-\u09FF-]/g, "_");
    
    // Split text into paragraphs and format clean HTML
    const paragraphs = textToDownload
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);

    const formattedBody = paragraphs.length > 0
      ? paragraphs
          .map((para) => {
            const escaped = para
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/\n/g, "<br/>");
            return `<p class="MsoNormal">${escaped}</p>`;
          })
          .join("")
      : `<p class="MsoNormal">${textToDownload.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br/>")}</p>`;

    const htmlDocument = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${safeTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          @page {
            size: 8.5in 11.0in;
            margin: 1.0in 1.0in 1.0in 1.0in;
            mso-header-margin: .5in;
            mso-footer-margin: .5in;
            mso-paper-source: 0;
          }
          body {
            font-family: 'Nirmala UI', 'Kalpurush', 'SolaimanLipi', Arial, sans-serif;
            font-size: 11.5pt;
            line-height: 1.6;
            color: #1e293b;
            margin: 0;
            padding: 0;
          }
          p.MsoNormal {
            margin: 0 0 10pt 0;
            line-height: 1.5;
            text-align: left;
          }
          h1 {
            font-size: 18pt;
            font-weight: bold;
            color: #0f172a;
            margin-bottom: 12pt;
          }
        </style>
      </head>
      <body>
        ${formattedBody}
      </body>
      </html>
    `;

    const blob = new Blob(["\ufeff" + htmlDocument], {
      type: "application/msword;charset=utf-8",
    });
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `${safeTitle}.docx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => window.URL.revokeObjectURL(downloadUrl), 1000);
  };

  const downloadAsTxt = () => {
    if (!extractedText) return;
    const baseName = file ? file.name.replace(/\.[^/.]+$/, "") : "Extracted_Text";
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${baseName}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!extractedText) return;
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConvert = async () => {
    if (!file) {
      setStatus("error");
      setStatusMsg("Please choose an image file first.");
      return;
    }

    try {
      setStatus("processing");
      setProgress(5);
      setStatusMsg("Initializing high-speed client-side OCR engine...");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tesseractLib: any = await ensureTesseract();

      // Language selection: 'ben+eng' for Bengali + English, 'eng' for English only
      const ocrLang = lang === "beng" ? "ben+eng" : "eng";

      setStatusMsg(
        lang === "beng"
          ? "Running Bengali + English neural OCR on your browser..."
          : "Running English neural OCR on your browser..."
      );

      const result = await tesseractLib.recognize(file, ocrLang, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "loading tesseract core") {
            setStatusMsg("Loading WebAssembly OCR engine...");
            setProgress(15);
          } else if (m.status === "loading language traineddata") {
            setStatusMsg("Loading language dictionary...");
            setProgress(30);
          } else if (m.status === "initializing api") {
            setStatusMsg("Configuring OCR worker...");
            setProgress(45);
          } else if (m.status === "recognizing text") {
            const pct = Math.min(95, Math.round(50 + m.progress * 45));
            setProgress(pct);
            setStatusMsg(`Recognizing text & layout: ${pct}%...`);
          }
        },
      });

      const fullText = (result.data?.text || "").trim();

      if (!fullText) {
        setStatus("done");
        setProgress(100);
        setStatusMsg("No readable text was detected in the image. Try a clearer or higher-contrast image.");
        return;
      }

      setExtractedText(fullText);
      setProgress(98);
      setStatusMsg("Generating formatted Microsoft Word (.docx) file...");

      const baseName = file.name.replace(/\.[^/.]+$/, "");
      generateAndDownloadDocx(fullText, baseName);

      setProgress(100);
      setStatus("done");
      setStatusMsg("Conversion 100% complete! Your formatted Word (.docx) file has been downloaded.");
    } catch (err: unknown) {
      console.error("Client OCR error:", err);
      const message = err instanceof Error ? err.message : "Failed to recognize text from image.";
      setStatus("error");
      setStatusMsg(message);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setStatus("idle");
    setStatusMsg("");
    setProgress(0);
    setExtractedText("");
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
            <p className="text-xs text-slate-400">100% Client-Side &bull; Neural OCR &bull; Bengali + English</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          ⚡ Instant .DOCX
        </span>
      </div>

      {/* Language Selector */}
      <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 text-sm gap-2">
        <span className="text-slate-300 font-medium text-xs sm:text-sm">Recognition Language:</span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLang("beng")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
              className="mt-1 text-xs text-rose-400 hover:text-rose-300 hover:underline cursor-pointer"
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
                Supports PNG, JPG, JPEG, WEBP, BMP (Bengali &amp; English text)
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Progress & Status */}
      {status !== "idle" && (
        <div
          className={`mt-5 p-4 rounded-2xl border text-sm flex flex-col gap-2 transition-all ${
            status === "processing"
              ? "bg-indigo-950/40 border-indigo-500/40 text-indigo-200"
              : status === "done"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-200"
              : "bg-rose-950/40 border-rose-500/40 text-rose-200"
          }`}
        >
          <div className="flex items-start gap-3">
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
                  ? `Processing Image (${progress}%)...`
                  : status === "done"
                  ? "Success!"
                  : "Error"}
              </span>
              <span className="text-xs opacity-90">{statusMsg}</span>
            </div>
          </div>

          {/* Progress Bar */}
          {status === "processing" && (
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className="bg-indigo-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}

      {/* Extracted Text Preview Card (when done) */}
      {status === "done" && extractedText && (
        <div className="mt-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Extracted Text Preview:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
              >
                {copied ? "✓ Copied!" : "📋 Copy Text"}
              </button>
              <button
                type="button"
                onClick={downloadAsTxt}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer text-xs"
              >
                📄 Download .TXT
              </button>
              <button
                type="button"
                onClick={() => generateAndDownloadDocx(extractedText, file?.name.replace(/\.[^/.]+$/, "") || "document")}
                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer text-xs font-semibold"
              >
                📥 Download .DOCX
              </button>
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed select-text">
            {extractedText}
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
              <span>Extracting &amp; Generating Word Document...</span>
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
          <p className="font-medium text-emerald-400">⚡ 100% Client-Side</p>
          <p className="text-[10px] text-slate-500">Zero Server Lag / Private</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
          <p className="font-medium text-slate-300">বাংলা + English</p>
          <p className="text-[10px] text-slate-500">Neural OCR Engine</p>
        </div>
        <div className="p-2 rounded-xl bg-slate-950/40 border border-slate-800/40">
          <p className="font-medium text-indigo-400">Native Word</p>
          <p className="text-[10px] text-slate-500">Instant .DOCX &amp; .TXT</p>
        </div>
      </div>
    </div>
  );
}
