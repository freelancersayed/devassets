"use client";

import Link from "next/link";
import ConverterCard from "@/components/ConverterCard";

export default function ImageToWordClient() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Banner Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/#tools"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-400 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to All Free Tools</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              PaddleOCR + img2table
            </span>
            <Link
              href="/tools/pdf-to-word"
              className="text-xs text-slate-400 hover:text-slate-200 transition-colors hidden md:block"
            >
              PDF to Word &rarr;
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16 w-full space-y-12">
        {/* Title & Description */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span>Free Formatted Converter</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Image to Word Formatted Converter
          </h1>
          <p className="text-sm md:text-base text-slate-400 leading-relaxed">
            Detect tables (both bordered &amp; borderless) and multilingual text (Bengali &amp; English) from images, generating clean native Microsoft Word (.docx) files with preserved layout.
          </p>
        </div>

        {/* Converter Card Component */}
        <ConverterCard />

        {/* How It Works Section */}
        <div className="pt-8 border-t border-slate-800/80">
          <h2 className="text-lg font-bold text-white text-center mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-semibold text-slate-200 text-sm">Upload Screenshot or Photo</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose any invoice, receipt, scanned table, or textbook image containing Bengali or English text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-semibold text-slate-200 text-sm">AI Table &amp; OCR Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                PaddleOCR detects complex Bengali glyphs while img2table maps out exact grid columns, rows, and cell text.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/60 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-semibold text-slate-200 text-sm">Formatted Word (.DOCX)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Download a fully editable Word document with standard Table Grid borders and native Unicode fonts.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Navigation CTA */}
        <div className="text-center pt-8">
          <Link
            href="/#tools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-semibold text-white transition-all border border-slate-700/60"
          >
            <span>Explore All Free Developer Tools</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
