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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40"
                  : "bg-white dark:bg-[#0f111a] hover:bg-slate-100 dark:hover:bg-[#161a29] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 shadow-sm"
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
          className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white dark:bg-[#0f111a] hover:bg-slate-100 dark:hover:bg-[#161a29] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 shadow-sm transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <span>Filters</span>
        </button>
      )}
    </div>
  );
}
