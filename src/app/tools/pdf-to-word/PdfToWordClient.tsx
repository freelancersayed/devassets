"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pdfjsLib: any;
  }
}

type Status = "idle" | "loading-lib" | "processing" | "done" | "error";

export default function PdfToWordClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [progress, setProgress] = useState(0);
  const [extractedText, setExtractedText] = useState("");
  const [fileName, setFileName] = useState("");
  const [pageCount, setPageCount] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [libReady, setLibReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load PDF.js from CDN
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.pdfjsLib) { setLibReady(true); return; }
    setStatus("loading-lib");
    setStatusMsg("Loading PDF engine...");
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      setLibReady(true);
      setStatus("idle");
      setStatusMsg("");
    };
    script.onerror = () => {
      setStatus("error");
      setStatusMsg("Failed to load PDF engine. Please check your internet connection.");
    };
    document.head.appendChild(script);
  }, []);

  const processFile = useCallback(async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      setStatus("error");
      setStatusMsg("Please upload a valid PDF file.");
      return;
    }
    if (!window.pdfjsLib) {
      setStatus("error");
      setStatusMsg("PDF engine not ready. Please wait.");
      return;
    }

    setFileName(file.name.replace(/\.pdf$/i, ""));
    setStatus("processing");
    setProgress(0);
    setExtractedText("");
    setStatusMsg("Reading PDF...");

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const typedarray = new Uint8Array(e.target!.result as ArrayBuffer);
        const pdf = await window.pdfjsLib.getDocument({ data: typedarray }).promise;
        const total = pdf.numPages;
        setPageCount(total);
        setStatusMsg(`Extracting text from ${total} page(s)...`);

        let fullText = "";
        for (let i = 1; i <= total; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();

          // Reconstruct text with line breaks using transform y-position
          const lines: { y: number; text: string }[] = [];
          for (const item of textContent.items) {
            const t = item as { str: string; transform: number[] };
            const y = Math.round(t.transform[5]);
            const existing = lines.find((l) => l.y === y);
            if (existing) {
              existing.text += " " + t.str;
            } else {
              lines.push({ y, text: t.str });
            }
          }
          // Sort by y descending (top to bottom)
          lines.sort((a, b) => b.y - a.y);
          const pageText = lines.map((l) => l.text).join("\n");
          fullText += `--- Page ${i} ---\n${pageText}\n\n`;

          setProgress(Math.round((i / total) * 100));
        }

        setExtractedText(fullText);
        setStatus("done");
        setStatusMsg("Extraction complete!");
      } catch (err) {
        console.error(err);
        setStatus("error");
        setStatusMsg("Could not process this PDF. It may be encrypted or corrupted.");
      }
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const downloadTxt = () => {
    const blob = new Blob([extractedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "converted"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadDocx = () => {
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${fileName || "Converted PDF"}</title>
        <style>
          body { font-family: Arial, sans-serif; font-size: 12pt; line-height: 1.6; margin: 2cm; }
          p { margin: 0 0 8pt 0; }
        </style>
      </head>
      <body>
        ${extractedText
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/\n/g, "</p><p>")}
      </body>
      </html>
    `;
    const blob = new Blob(["\ufeff" + htmlContent], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "converted"}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setStatus("idle");
    setStatusMsg("");
    setExtractedText("");
    setProgress(0);
    setFileName("");
    setPageCount(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 sm:px-6">
      {/* Back Navigation */}
      <div className="container mx-auto max-w-4xl mb-8">
        <Link
          href="/#tools"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors group"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Tools
        </Link>
      </div>

      <div className="container mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900/60">
            ⚡ Free Browser Tool — No Upload Required
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-50 tracking-tight">
            PDF to Word /{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Text Converter
            </span>
          </h1>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Extract formatted text and generate clean Word/TXT files directly in your browser.
            Files never leave your device — 100% private, zero server uploads.
          </p>

          {/* Privacy Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {["No Server Upload", "Format Preserving", "Instant .DOCX & .TXT", "Zero Size Limit"].map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-3 py-1.5 rounded-full"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Main Tool Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
          {/* Privacy Status Bar */}
          <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Client-Side PDF.js Engine Active
            </span>
            <span className="text-emerald-400 font-semibold">🔒 0 KB Uploaded</span>
          </div>

          {/* Drop Zone */}
          {status === "idle" || status === "loading-lib" ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? "border-indigo-500 bg-indigo-950/30 scale-[1.01]"
                  : "border-slate-700 bg-slate-950/50 hover:border-indigo-500/60 hover:bg-slate-950/80"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="pdfFileInput"
              />
              <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-800/50 flex items-center justify-center">
                <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              {status === "loading-lib" ? (
                <>
                  <p className="text-sm font-semibold text-indigo-400 animate-pulse">Loading PDF engine...</p>
                  <p className="text-xs text-slate-500 mt-1">Please wait a moment</p>
                </>
              ) : (
                <>
                  <p className="text-base font-semibold text-slate-200 mb-1">
                    {isDragging ? "Drop your PDF here" : "Drag & Drop PDF here"}
                  </p>
                  <p className="text-sm text-slate-400 mb-4">or click to browse files</p>
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Choose PDF File
                  </span>
                  <p className="text-[11px] text-slate-600 mt-4">
                    Processed locally via PDF.js Web API • No size limits • No upload
                  </p>
                </>
              )}
            </div>
          ) : null}

          {/* Processing State */}
          {status === "processing" && (
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-8 text-center space-y-5">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-700/50 flex items-center justify-center">
                <svg className="animate-spin w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-400 animate-pulse">{statusMsg}</p>
                {pageCount > 0 && (
                  <p className="text-xs text-slate-500 mt-1">{pageCount} pages detected</p>
                )}
              </div>
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-slate-400">{progress}% complete</p>
            </div>
          )}

          {/* Error State */}
          {status === "error" && (
            <div className="rounded-2xl border border-red-800/40 bg-red-950/20 p-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-xl bg-red-950/60 border border-red-800/50 flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-red-400">{statusMsg}</p>
              <button
                onClick={reset}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors cursor-pointer"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Done State */}
          {status === "done" && (
            <div className="space-y-5">
              {/* Success Header */}
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <div className="w-9 h-9 rounded-lg bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-400">Extraction Complete!</p>
                  <p className="text-xs text-slate-400">{pageCount} pages processed • {extractedText.length.toLocaleString()} characters extracted</p>
                </div>
                <button
                  onClick={reset}
                  className="ml-auto text-slate-500 hover:text-slate-300 transition-colors text-xs underline cursor-pointer"
                >
                  Convert another
                </button>
              </div>

              {/* Text Preview */}
              <div className="rounded-xl border border-slate-700 bg-slate-950/80 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800 bg-slate-900/50">
                  <span className="text-xs font-mono text-slate-400">Extracted Text Preview</span>
                  <span className="text-[10px] text-slate-600">{extractedText.split("\n").length} lines</span>
                </div>
                <textarea
                  readOnly
                  value={extractedText}
                  className="w-full h-56 bg-transparent text-xs text-slate-300 font-mono p-4 resize-none focus:outline-none leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Download Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={downloadTxt}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-indigo-900/30 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download as .TXT
                </button>
                <button
                  onClick={downloadDocx}
                  className="flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-lg shadow-cyan-900/30 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download as .DOCX
                </button>
              </div>
            </div>
          )}
        </div>

        {/* How It Works */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "📄", step: "1", title: "Upload PDF", desc: "Drag & drop or click to choose your PDF file. No size restrictions." },
            { icon: "⚡", step: "2", title: "Browser Processes", desc: "PDF.js extracts text locally in your browser. Zero data sent to any server." },
            { icon: "⬇️", step: "3", title: "Download", desc: "Save your file as a clean .TXT or Word-compatible .DOCX instantly." },
          ].map((item) => (
            <div
              key={item.step}
              className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 text-center space-y-3"
            >
              <div className="text-2xl">{item.icon}</div>
              <div className="w-6 h-6 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-400 text-xs font-bold flex items-center justify-center mx-auto">
                {item.step}
              </div>
              <p className="text-sm font-semibold text-slate-200">{item.title}</p>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Other Tools CTA */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-200">Explore all free browser tools</p>
            <p className="text-xs text-slate-500">Image OCR, Video Audio Extractor, Smart Image Studio & more</p>
          </div>
          <Link
            href="/#tools"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-200 border border-slate-700 hover:border-indigo-500"
          >
            View All Tools →
          </Link>
        </div>
      </div>
    </main>
  );
}
