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
        className="py-20 sm:py-24 bg-[#09090B] border-b border-[#27272A] scroll-mt-20 transition-colors"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SECTION HEADER */}
          <FadeInView y={16} className="max-w-3xl mb-14 space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3 py-1 text-xs font-mono text-[#10B981]">
              <span>transparent pricing</span>
            </div>

            <h2
              id="pricing-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#FAFAFA] leading-tight"
            >
              Simple, Predictable Access
            </h2>
            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
              Pay once, use forever. No recurring credit card charges, no hidden subscription traps, and direct access immediately after checkout.
            </p>
          </FadeInView>

          {/* 3-COLUMN MASTER PRICING GRID (Deep Zinc & Emerald Design System) */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* TIER 1: STARTER PASS */}
            <StaggerItem className="h-full">
              <div className="rounded-2xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 flex flex-col justify-between h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#10B981]/40 transition-all duration-200">
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">
                      Single Asset Pass
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
                        $29
                      </span>
                      <span className="text-xs text-[#A1A1AA] line-through">$59 USD</span>
                      <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded-full">
                        Save 50%
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                      Choose any single codekit, prompt library, or PDF manual with lifetime updates.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#27272A] space-y-2.5 text-xs text-[#FAFAFA]">
                    {(starterProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[#10B981] font-mono text-sm font-bold">&check;</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(starterProduct)}
                    className="w-full py-3 rounded-xl bg-[#09090B] hover:bg-[#27272A] active:scale-[0.98] text-[#FAFAFA] font-medium text-xs border border-[#27272A] transition-all cursor-pointer"
                  >
                    Choose Single Asset &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* TIER 2: 30-DAY ALL-ACCESS PASS (Featured) */}
            <StaggerItem className="h-full">
              <div className="rounded-2xl border-2 border-[#10B981]/60 bg-[#18181B] p-6 sm:p-8 flex flex-col justify-between h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_25px_rgba(16,185,129,0.12)] relative transition-all duration-200">
                {/* Minimalist Featured Tag */}
                <div className="absolute -top-3 left-6 bg-[#10B981] text-[#09090B] text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                  Recommended
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-[#10B981] uppercase tracking-wider font-semibold">
                      30-Day All-Access Pass
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
                        $29
                      </span>
                      <span className="text-xs text-[#A1A1AA] line-through">$59 USD</span>
                      <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded-full">
                        Prepaid One-Time
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                      Unlimited tool throughput + any 3 premium digital packages of your choice. Zero subscription traps.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#27272A] space-y-2.5 text-xs text-[#FAFAFA]">
                    {(passProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[#10B981] font-mono text-sm font-bold">&check;</span>
                        <span className="font-medium text-[#FAFAFA]">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(passProduct)}
                    className="w-full py-3 rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.98] text-[#09090B] font-semibold text-xs shadow-md hover:shadow-emerald-glow transition-all cursor-pointer"
                  >
                    Get 30-Day Pass &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>

            {/* TIER 3: ALL-IN-ONE LIFETIME BUNDLE */}
            <StaggerItem className="h-full">
              <div className="rounded-2xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 flex flex-col justify-between h-full shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#10B981]/40 transition-all duration-200">
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-xs text-[#A1A1AA] uppercase tracking-wider">
                      Ultimate Lifetime Vault
                    </div>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold tracking-tight text-[#FAFAFA]">
                        $69
                      </span>
                      <span className="text-xs text-[#A1A1AA] line-through">$149 USD</span>
                      <span className="text-[11px] font-mono text-[#F59E0B] bg-[#F59E0B]/10 border border-[#F59E0B]/30 px-2 py-0.5 rounded-full">
                        Lifetime Access
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-[#A1A1AA] leading-relaxed">
                      Complete developer vault with every toolkit, prompt library, future releases, and commercial rights.
                    </p>
                  </div>

                  <div className="pt-5 border-t border-[#27272A] space-y-2.5 text-xs text-[#FAFAFA]">
                    {(lifetimeProduct.features || []).map((feat: string, i: number) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <span className="text-[#10B981] font-mono text-sm font-bold">&check;</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(lifetimeProduct)}
                    className="w-full py-3 rounded-xl bg-[#FAFAFA] hover:bg-white active:scale-[0.98] text-[#09090B] font-semibold text-xs transition-all cursor-pointer shadow-sm"
                  >
                    Get Lifetime Vault &rarr;
                  </button>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ══════════════════════════════════════════════════════════════
              2. FILTERABLE CATALOG OF ALL INDIVIDUAL ASSETS & TOOLS
             ══════════════════════════════════════════════════════════════ */}
          <div id="catalog-filter" className="mt-20 pt-16 border-t border-[#27272A] scroll-mt-24">
            <FadeInView y={16} className="max-w-2xl mb-8 space-y-2">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3 py-1 text-xs font-mono text-[#10B981]">
                <span>individual catalog</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FAFAFA]">
                Browse Individual Kits &amp; Manuals
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA]">
                Prefer to acquire an individual toolkit or playbook? Filter by category below.
              </p>
            </FadeInView>

            {/* Filter Tabs Segmented Pill Bar */}
            <div className="flex flex-wrap items-center gap-1.5 mb-10 p-1 rounded-xl bg-[#18181B] border border-[#27272A] max-w-fit">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? "bg-[#27272A] text-[#FAFAFA] font-semibold shadow-xs"
                        : "text-[#A1A1AA] hover:text-[#FAFAFA]"
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
                  <article className="rounded-2xl border border-[#27272A] bg-[#18181B] p-6 flex flex-col justify-between h-full hover:border-[#10B981]/50 hover:-translate-y-1 transition-all duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <div className="space-y-4">
                      {/* Top Header: Monospace Category & Price */}
                      <div className="flex items-center justify-between gap-2 font-mono text-xs">
                        <span className="text-[11px] text-[#A1A1AA] bg-[#09090B] px-2 py-0.5 rounded border border-[#27272A]">
                          {product.categoryLabel || product.category}
                        </span>
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-bold text-[#FAFAFA] text-sm">
                            ${product.price}
                          </span>
                          <span className="text-[#A1A1AA]/60 line-through text-[11px]">
                            ${product.originalPrice}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <div>
                        <h4 className="text-sm font-semibold text-[#FAFAFA] tracking-[-0.01em]">
                          {product.title}
                        </h4>
                        <p className="mt-2 text-xs text-[#A1A1AA] line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      {/* Technical Monospace Specs */}
                      <div className="pt-3 border-t border-[#27272A] space-y-1 font-mono text-[11px] text-[#A1A1AA]">
                        <div className="flex items-center justify-between">
                          <span>Format:</span>
                          <span className="text-[#FAFAFA]">{product.specs.format}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>License:</span>
                          <span className="text-[#FAFAFA]">{product.specs.license}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className="flex-1 py-2 px-3 rounded-xl bg-[#10B981] hover:bg-[#34D399] active:scale-[0.98] text-[#09090B] text-xs font-semibold text-center transition-all cursor-pointer shadow-sm hover:shadow-emerald-glow"
                      >
                        Buy Now (${product.price})
                      </button>
                      <Link
                        href={`/products/${product.slug}`}
                        className="py-2 px-3 rounded-xl bg-[#09090B] hover:bg-[#27272A] text-[#FAFAFA] text-xs font-medium border border-[#27272A] transition-colors"
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
