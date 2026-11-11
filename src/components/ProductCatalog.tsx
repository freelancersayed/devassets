"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  productsData,
  CatalogProduct,
} from "@/data/catalog";
import {
  starterSingleAssetProduct,
  allAccessPass30DayProduct,
  allInOneLifetimeBundleProduct,
} from "@/data/products";
import CheckoutModal from "@/components/CheckoutModal";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionContainers";

const starterProduct = starterSingleAssetProduct;
const passProduct = allAccessPass30DayProduct;
const lifetimeProduct = allInOneLifetimeBundleProduct;

const filterTabs = [
  { id: "all", label: "All Items" },
  { id: "code", label: "Codekits" },
  { id: "prompts", label: "Prompt Packs" },
  { id: "pdf", label: "Guides & Manuals" },
  { id: "tools", label: "Browser Suites" },
];

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  useEffect(() => {
    const handleFilterCatalog = (event: CustomEvent<{ category: string }>) => {
      const category = event.detail.category;
      if (category) {
        setActiveTab(category);
      }
    };

    window.addEventListener("filter-catalog", handleFilterCatalog as EventListener);
    return () => {
      window.removeEventListener("filter-catalog", handleFilterCatalog as EventListener);
    };
  }, []);

  const filteredProducts = productsData.filter((p) => {
    if (activeTab === "all") return true;
    return p.category === activeTab;
  });

  return (
    <>
      <section
        id="products"
        aria-labelledby="pricing-heading"
        className="py-20 sm:py-24 bg-[#FAFAFA] dark:bg-[#0B0C0E] border-b border-neutral-200/80 dark:border-neutral-850 scroll-mt-20 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <FadeInView y={16} className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
              <span>transparent pricing</span>
            </div>

            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-neutral-900 dark:text-neutral-50 leading-tight"
            >
              Simple, Predictable Access
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
              Pay once, use forever. No recurring credit card charges, no hidden subscription traps, and direct access immediately after checkout.
            </p>
          </FadeInView>

          {/* 3-COLUMN ARCHITECTURAL PRICING GRID (Linear / GitHub Sponsors Style) */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* TIER 1: STARTER */}
            <StaggerItem className="h-full">
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E1015] p-7 flex flex-col justify-between h-full shadow-xs transition-colors">
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                      Starter Kit
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        $9
                      </span>
                      <span className="text-xs text-neutral-500 line-through">$19 USD</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Essential client-side tools and basic prompt engineering collection.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-200/80 dark:border-neutral-850 space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {(starterProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm">&check;</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(starterProduct)}
                    className="w-full py-2.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-850 active:translate-y-[1px] text-neutral-900 dark:text-neutral-100 font-medium text-xs border border-neutral-200 dark:border-neutral-800 transition-all cursor-pointer"
                  >
                    Get Starter Kit &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* TIER 2: 30-DAY ALL-ACCESS PASS (Featured) */}
            <StaggerItem className="h-full">
              <div className="rounded-xl border-2 border-indigo-600/80 dark:border-indigo-500/80 bg-white dark:bg-[#0E1015] p-7 flex flex-col justify-between h-full shadow-sm relative transition-colors">
                {/* Minimalist Featured Tag */}
                <div className="absolute -top-3 left-6 bg-indigo-600 text-white text-[10px] font-mono font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Recommended
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-semibold">
                      30-Day All-Access Pass
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        $29
                      </span>
                      <span className="text-xs text-neutral-500 line-through">$59 USD</span>
                      <span className="text-[11px] font-mono text-neutral-500">prepaid &middot; no auto-renew</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Unlimited tool throughput + any 3 premium digital packages of your choice.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-200/80 dark:border-neutral-850 space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {(passProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-indigo-600 dark:text-indigo-400 font-mono text-sm">&check;</span>
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(passProduct)}
                    className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 active:translate-y-[1px] text-white font-medium text-xs shadow-xs transition-all cursor-pointer"
                  >
                    Get 30-Day Pass &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* TIER 3: ALL-IN-ONE LIFETIME BUNDLE */}
            <StaggerItem className="h-full">
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0E1015] p-7 flex flex-col justify-between h-full shadow-xs transition-colors">
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-neutral-500 uppercase tracking-wider">
                      Lifetime Bundle
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                        $49
                      </span>
                      <span className="text-xs text-neutral-500 line-through">$99 USD</span>
                      <span className="text-[11px] font-mono text-neutral-500">one-time</span>
                    </div>
                    <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      Complete developer vault with every toolkit, prompt library, and future releases.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-neutral-200/80 dark:border-neutral-850 space-y-2.5 text-xs text-neutral-700 dark:text-neutral-300">
                    {(lifetimeProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-neutral-400 dark:text-neutral-500 font-mono text-sm">&check;</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(lifetimeProduct)}
                    className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white active:translate-y-[1px] text-white dark:text-neutral-900 font-medium text-xs transition-all cursor-pointer"
                  >
                    Get Lifetime Bundle &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ══════════════════════════════════════════════════════════════
              2. FILTERABLE CATALOG OF ALL INDIVIDUAL ASSETS & TOOLS
             ══════════════════════════════════════════════════════════════ */}
          <div id="catalog-filter" className="mt-20 pt-16 border-t border-neutral-200 dark:border-neutral-850 scroll-mt-24">
            <FadeInView y={16} className="max-w-2xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-3 py-1 text-xs font-mono text-neutral-600 dark:text-neutral-400">
                <span>individual catalog</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Browse Individual Kits &amp; Manuals
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                Prefer to acquire an individual toolkit or playbook? Filter by category below.
              </p>
            </FadeInView>

            {/* Filter Tabs Segmented Pill Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-10 p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 max-w-fit">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs font-semibold"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Products Grid */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <StaggerItem key={product.id} className="h-full">
                  <article className="rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-white dark:bg-[#0E1015] p-5 flex flex-col justify-between h-full hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors shadow-xs">
                    <div className="space-y-4">
                      {/* Top Header: Monospace Category & Price */}
                      <div className="flex items-center justify-between gap-2 font-mono text-xs">
                        <span className="text-[11px] text-neutral-500 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded border border-neutral-200/60 dark:border-neutral-800/80">
                          {product.categoryLabel || product.category}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                            ${product.price}
                          </span>
                          <span className="text-neutral-400 dark:text-neutral-600 line-through text-[11px]">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-[-0.01em]">
                          {product.title}
                        </h4>
                        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400 line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Technical Monospace Specs */}
                      <div className="pt-3 border-t border-neutral-100 dark:border-neutral-850 space-y-1 font-mono text-[11px] text-neutral-500">
                        <div className="flex items-center justify-between">
                          <span>Format:</span>
                          <span className="text-neutral-700 dark:text-neutral-300">{product.specs.format}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>License:</span>
                          <span className="text-neutral-700 dark:text-neutral-300">{product.specs.license}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-2 px-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white active:translate-y-[1px] text-white dark:text-neutral-900 text-xs font-medium text-center transition-colors cursor-pointer"
                      >
                        Buy Now (${product.price})
                      </button>
                      <Link
                        href={`/products/${product.slug}`}
                        className="py-2 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-850 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white text-xs font-medium border border-neutral-200 dark:border-neutral-800 transition-colors"
                      >
                        Details &rarr;
                      </Link>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
