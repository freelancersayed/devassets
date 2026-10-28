"use client";

import { useState, useEffect, useTransition } from "react";
import { Prompt, PromptApiResponse } from "@/types/prompt";
import PromptCard from "./PromptCard";
import PromptSearch from "./PromptSearch";
import PromptCategoryFilter from "./PromptCategoryFilter";
import PromptPagination from "./PromptPagination";

interface PromptLibraryClientProps {
  initialData: PromptApiResponse;
}

export default function PromptLibraryClient({
  initialData,
}: PromptLibraryClientProps) {
  const [data, setData] = useState<PromptApiResponse>(initialData);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [, startTransition] = useTransition();

  // Fetch prompts when search, category, or page changes
  useEffect(() => {
    let isCancelled = false;

    const fetchFilteredPrompts = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();
        if (search.trim()) params.set("search", search.trim());
        if (category && category !== "All" && category !== "All Prompts") {
          params.set("category", category);
        }
        params.set("page", page.toString());
        params.set("limit", "12");

        const res = await fetch(`/api/prompts?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to load prompts");
        const json: PromptApiResponse = await res.json();

        if (!isCancelled) {
          setData(json);
        }
      } catch (err) {
        console.error("Filter fetch error:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    // Debounce search slightly to avoid excessive API requests
    const timeout = setTimeout(() => {
      startTransition(() => {
        fetchFilteredPrompts();
      });
    }, 200);

    return () => {
      isCancelled = true;
      clearTimeout(timeout);
    };
  }, [search, category, page]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1); // Reset pagination on search change
  };

  const handleClearSearch = () => {
    setSearch("");
    setPage(1);
  };

  const handleCategorySelect = (cat: string) => {
    setCategory(cat);
    setPage(1); // Reset pagination on category change
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setPage(1);
  };

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Section (matching reference image layout) */}
      <div className="space-y-4">
        {/* Top: Search Bar */}
        <div className="max-w-4xl mx-auto">
          <PromptSearch
            value={search}
            onChange={handleSearchChange}
            onClear={handleClearSearch}
            totalCount={data.total}
          />
        </div>

        {/* Bottom: Filter Pills */}
        <div className="max-w-7xl mx-auto">
          <PromptCategoryFilter
            categories={data.categories}
            activeCategory={category}
            onSelectCategory={handleCategorySelect}
          />
        </div>
      </div>

      {/* Results Metadata Row */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing{" "}
          <span className="font-semibold text-white">
            {data.prompts.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-white">{data.total}</span> prompts
          {category !== "All" && category !== "All Prompts" && (
            <span>
              {" "}
              in <span className="text-indigo-400 font-medium">{category}</span>
            </span>
          )}
          {search && (
            <span>
              {" "}
              matching &ldquo;<span className="text-indigo-300">{search}</span>&rdquo;
            </span>
          )}
        </div>

        {(search || (category !== "All" && category !== "All Prompts")) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-indigo-400 hover:text-indigo-300 font-medium hover:underline cursor-pointer"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Prompt Card Grid (4 Columns on Desktop matching reference image) */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#0f131f] border border-slate-800/80 p-4 space-y-4 animate-pulse"
            >
              <div className="w-full aspect-[16/10] bg-slate-800/60 rounded-xl" />
              <div className="h-4 bg-slate-800/80 rounded w-3/4" />
              <div className="space-y-1.5">
                <div className="h-3 bg-slate-800/50 rounded w-full" />
                <div className="h-3 bg-slate-800/50 rounded w-2/3" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 bg-slate-800/80 rounded w-16" />
                <div className="h-4 bg-slate-800/80 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : data.prompts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.prompts.map((prompt) => (
            <PromptCard key={prompt.slug} prompt={prompt} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl border border-white/10 bg-[#0f131f]/60 p-12 text-center space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-2xl">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">No AI prompts found</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              We couldn&apos;t find any prompts matching &ldquo;{search || category}&rdquo;. Try another keyword or browse all categories.
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Pagination (matching reference image) */}
      <PromptPagination
        currentPage={data.page}
        totalPages={data.totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}
