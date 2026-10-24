"use client";

import Link from "next/link";
import ConverterCard from "@/components/ConverterCard";

export default function ToolsSectionPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>&larr; Back to DevAssets Home</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Developer Tools Section
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Free, powerful formatting and conversion tools powered by high-precision AI &amp; open-source engines.
          </p>
        </div>

        <ConverterCard />
      </div>
    </div>
  );
}
