"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import CheckoutModal from "@/components/CheckoutModal";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "@/components/motion/MotionContainers";

interface ProductsClientProps {
  initialProducts: Product[];
}

type CategoryFilter = "all" | "tools" | "prompts" | "pdf" | "bundle";
type SortOption = "featured" | "price-asc" | "price-desc" | "name";

interface FilterTab {
  id: CategoryFilter;
  label: string;
  icon: string;
}

const filterTabs: FilterTab[] = [
  { id: "all", label: "All Products", icon: "⭐" },
  { id: "tools", label: "Tools & Licenses", icon: "🛠️" },
  { id: "prompts", label: "AI Prompts", icon: "🤖" },
  { id: "pdf", label: "PDF Masterclasses", icon: "📚" },
  { id: "bundle", label: "Passes & Bundles", icon: "👑" },
];

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by category
    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.deliverables.some((d) => d.toLowerCase().includes(q)) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "featured":
      default:
        // Keep initial order (curated order)
        break;
    }

    return result;
  }, [initialProducts, activeCategory, searchQuery, sortBy]);

  const clearFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSortBy("featured");
  };

  return (
    <main className="min-h-screen bg-[#070B14] text-slate-100 relative overflow-hidden pt-24 pb-20">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-cyan-500/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-500/5 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-80 right-10 w-96 h-96 bg-purple-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">All Products</span>
        </nav>

        {/* Hero Header */}
        <FadeInView y={20} className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            <span>⚡</span> The DevAssets Marketplace
          </span>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            All Products &amp; Developer Assets
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mx-auto" />

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Production-grade developer utilities, offline batch runners, AI prompt libraries, and complete starter kits with instant fulfillment and commercial licensing.
          </p>

          {/* Quick Perks Pill */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <span className="text-emerald-400">✓</span> Instant License &amp; Download
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <span className="text-emerald-400">✓</span> FastSpring Secure Checkout
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10">
              <span className="text-emerald-400">✓</span> Zero Auto-Renewals
            </span>
          </div>
        </FadeInView>

        {/* Search, Filter Tabs & Sort Controls */}
        <div className="mb-10 space-y-5">
          {/* Top Bar: Search Input & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 max-w-5xl mx-auto">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, prompts, tools, or topics..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 backdrop-blur-xl transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-3.5 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs font-semibold text-slate-200 focus:outline-none focus:border-indigo-500 backdrop-blur-xl transition-all cursor-pointer"
              >
                <option value="featured">Featured Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl max-w-fit mx-auto">
            {filterTabs.map((tab) => {
              const isActive = activeCategory === tab.id;
              const count =
                tab.id === "all"
                  ? initialProducts.length
                  : initialProducts.filter((p) => p.category === tab.id).length;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCatalogTab"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-indigo-400/50"
                    />
                  )}
                  <span className="relative z-10">{tab.icon}</span>
                  <span className="relative z-10">{tab.label}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white font-bold"
                        : "bg-white/[0.05] text-slate-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Filter Indicators */}
          {(searchQuery || activeCategory !== "all" || sortBy !== "featured") && (
            <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>Showing {filteredProducts.length} of {initialProducts.length} products</span>
              <button
                type="button"
                onClick={clearFilters}
                className="text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
            {filteredProducts.map((product) => {
              const isCyan = product.category === "tools" || product.slug.includes("seo");
              const isPurple = product.category === "prompts";
              const isBundle = product.category === "bundle";

              const glowClass = isCyan
                ? "from-cyan-500/20 to-blue-600/10"
                : isPurple
                ? "from-purple-500/25 to-pink-600/10"
                : isBundle
                ? "from-amber-500/25 to-purple-600/15"
                : "from-indigo-500/25 to-purple-600/10";

              const borderClass = isCyan
                ? "border-cyan-500/25 hover:border-cyan-400/50"
                : isPurple
                ? "border-purple-500/25 hover:border-purple-400/50"
                : isBundle
                ? "border-amber-500/30 hover:border-amber-400/50"
                : "border-indigo-500/25 hover:border-indigo-400/50";

              const buttonGrad = isCyan
                ? "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                : isPurple
                ? "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                : isBundle
                ? "from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-purple-500 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
                : "from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-400 hover:to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.35)]";

              return (
                <StaggerItem key={product.id}>
                  <article
                    itemScope
                    itemType="https://schema.org/Product"
                    className={`group relative rounded-3xl p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 bg-slate-900/40 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent border ${borderClass} shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full`}
                  >
                    {/* Ambient Glow */}
                    <div
                      className={`absolute -inset-1 rounded-3xl blur-xl opacity-20 -z-10 transition-opacity duration-300 group-hover:opacity-50 bg-gradient-to-b ${glowClass} pointer-events-none`}
                    />

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase bg-white/[0.06] text-slate-300 border border-white/10 backdrop-blur-md">
                          {product.categoryLabel}
                        </span>
                        <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-0.5 rounded-full">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Instant
                        </span>
                      </div>

                      {/* Emoji Icon & Title */}
                      <div className="flex items-start gap-3.5 mb-3">
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-slate-950/80 border border-white/10 text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                          {product.emoji}
                        </div>
                        <div>
                          <h2
                            itemProp="name"
                            className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug"
                          >
                            {product.title}
                          </h2>
                        </div>
                      </div>

                      {/* Description */}
                      <p
                        itemProp="description"
                        className="text-xs text-slate-400 leading-relaxed line-clamp-2 mt-2 mb-4"
                      >
                        {product.description}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-1.5 pt-3 border-t border-white/[0.04]">
                        {product.deliverables.slice(0, 3).map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-xs text-slate-300 py-0.5"
                          >
                            <svg
                              className="w-3.5 h-3.5 text-emerald-400 shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price & Action Buttons */}
                    <div
                      className="mt-6 pt-4 border-t border-white/[0.06]"
                      itemProp="offers"
                      itemScope
                      itemType="https://schema.org/Offer"
                    >
                      <meta itemProp="priceCurrency" content="USD" />
                      <meta itemProp="price" content={product.price} />
                      <link itemProp="availability" href="https://schema.org/InStock" />

                      <div className="flex items-baseline justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-black text-white">
                            ${product.price}
                          </span>
                          <span className="text-xs text-slate-500 line-through">
                            ${product.originalPrice}
                          </span>
                          <span className="text-[10px] font-semibold text-indigo-400">
                            USD
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                          One-Time / Instant
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <MagneticButton className="w-full">
                          <button
                            type="button"
                            onClick={() => setSelectedProduct(product)}
                            className={`w-full py-2.5 px-3 rounded-full bg-gradient-to-r ${buttonGrad} text-center text-xs font-semibold text-white transition-all duration-200 active:scale-[0.98] cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
                          >
                            Buy Now
                          </button>
                        </MagneticButton>
                        <Link
                          href={`/products/${product.slug}`}
                          className="w-full py-2.5 px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-center text-xs font-semibold text-slate-300 border border-white/10 hover:text-white transition-all duration-200 flex items-center justify-center gap-1"
                        >
                          <span>Details</span>
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 px-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-white/10 flex items-center justify-center text-2xl mx-auto mb-4">
              🔍
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              No products found
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              We couldn&apos;t find any assets matching &quot;{searchQuery}&quot;. Try adjusting your keywords or category filters.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Value & Guarantee Section */}
        <div className="mt-24 pt-16 border-t border-slate-800/80 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-xl space-y-2">
              <span className="text-2xl">⚡</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Instant Fulfillment
              </h4>
              <p className="text-[11px] text-slate-400">
                Unlock deliverables &amp; license keys immediately in your dashboard upon payment.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-xl space-y-2">
              <span className="text-2xl">🔒</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                FastSpring Merchant
              </h4>
              <p className="text-[11px] text-slate-400">
                Processed with global PCI-DSS Level 1 compliance and 256-bit encryption.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-xl space-y-2">
              <span className="text-2xl">🛡️</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Commercial License
              </h4>
              <p className="text-[11px] text-slate-400">
                Permitted for unlimited commercial client projects and internal agency tools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/40 border border-white/[0.06] backdrop-blur-xl space-y-2">
              <span className="text-2xl">🔄</span>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Free Lifetime Updates
              </h4>
              <p className="text-[11px] text-slate-400">
                Receive newly added prompt patterns, tool patches, and code enhancements at no extra cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FastSpring Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </main>
  );
}

