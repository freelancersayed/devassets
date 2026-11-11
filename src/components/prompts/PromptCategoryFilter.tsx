"use client";

interface PromptCategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  showFiltersModal?: boolean;
  onToggleFilters?: () => void;
}

export default function PromptCategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  onToggleFilters,
}: PromptCategoryFilterProps) {
  return (
    <div className="w-full flex items-center justify-between gap-3 overflow-x-auto no-scrollbar py-1">
      {/* Category Pills Row */}
      <div className="flex items-center gap-2 shrink-0">
        {categories.map((category) => {
          const isAll = category === "All Prompts" || category === "All";
          const isActive =
            (isAll && (activeCategory === "All" || activeCategory === "All Prompts" || !activeCategory)) ||
            activeCategory.toLowerCase() === category.toLowerCase();

          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(isAll ? "All" : category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#10B981] text-[#09090B] font-semibold shadow-emerald-glow"
                  : "bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46]"
              }`}
            >
              {isAll ? "All" : category}
            </button>
          );
        })}
      </div>

      {/* Right Filters Dropdown / Button (matching reference image) */}
      {onToggleFilters && (
        <button
          type="button"
          onClick={onToggleFilters}
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium bg-[#18181B] hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] border border-[#27272A] hover:border-[#3F3F46] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-[#A1A1AA]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filters</span>
        </button>
      )}
    </div>
  );
}
