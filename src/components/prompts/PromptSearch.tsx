"use client";

import { useEffect, useRef } from "react";

interface PromptSearchProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  totalCount?: number;
}

export default function PromptSearch({
  value,
  onChange,
  onClear,
}: PromptSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Global Ctrl+K / Cmd+K shortcut listener to focus search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full">
      <label htmlFor="prompt-search-input" className="sr-only">
        Search prompts by title, description, or category
      </label>

      {/* Left Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Search Input */}
      <input
        ref={inputRef}
        id="prompt-search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search prompts..."
        className="w-full pl-11 pr-24 py-3 bg-[#18181B] text-sm text-[#FAFAFA] placeholder-[#71717A] rounded-xl border border-[#27272A] hover:border-[#3F3F46] focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] shadow-xs transition-all outline-none"
      />

      {/* Right Controls: Clear button + Ctrl K Badge */}
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center gap-2">
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label="Clear search input"
            className="p-1 rounded-md text-[#71717A] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : null}

        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-[11px] font-mono text-[#71717A] bg-[#09090B] border border-[#27272A] rounded-md shadow-xs">
          Ctrl K
        </kbd>
      </div>
    </div>
  );
}
