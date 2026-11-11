"use client";

interface PromptPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PromptPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PromptPaginationProps) {
  if (totalPages <= 1) return null;

  // Generate pagination items with ellipsis matching reference: < 1 2 3 ... 8 >
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Middle pages
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav
      aria-label="Prompt Library Pagination"
      className="flex items-center justify-center gap-1.5 sm:gap-2 pt-8"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous Page"
        className="w-9 h-9 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46] flex items-center justify-center text-sm font-medium shadow-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Numbered Page Buttons */}
      {getPageNumbers().map((item, idx) => {
        if (item === "...") {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="w-8 h-9 flex items-center justify-center text-xs text-[#71717A] font-mono select-none"
            >
              ...
            </span>
          );
        }

        const pageNum = Number(item);
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? "page" : undefined}
            className={`w-9 h-9 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#10B981] text-[#09090B] font-semibold shadow-emerald-glow"
                : "bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46]"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
        className="w-9 h-9 rounded-lg bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46] flex items-center justify-center text-sm font-medium shadow-xs transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
