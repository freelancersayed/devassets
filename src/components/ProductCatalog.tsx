"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { productsData, type CatalogProduct } from "@/data/catalog";
import CheckoutModal from "./CheckoutModal";

type CategoryFilter = "all" | "tools" | "prompts" | "pdf" | "bundle";

interface FilterTab {
  id: CategoryFilter;
  label: string;
}

const filterTabs: FilterTab[] = [
  { id: "all", label: "⭐ All Products" },
  { id: "tools", label: "🛠️ Tools & Licenses" },
  { id: "prompts", label: "🤖 AI Prompts" },
  { id: "pdf", label: "📚 PDF Masterclasses" },
  { id: "bundle", label: "👑 All-Access Passes" },
];

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return productsData;
    return productsData.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <section
        id="products"
        aria-labelledby="store-heading"
        className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-20"
      >
        <div className="container mx-auto max-w-7xl px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-purple-400 border border-purple-900/60">
              💎 Curated Digital Store
            </span>
            <h2
              id="store-heading"
              className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight"
            >
              Explore Premium Digital Assets &amp; Resources
            </h2>
            <p className="text-base text-slate-400 leading-relaxed">
              Select a single asset or choose an all-access pass for unlimited tools and asset downloads.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/25 border border-indigo-500/30 scale-105"
                      : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                itemScope
                itemType="https://schema.org/Product"
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-7 shadow-xl hover:border-indigo-500/40 hover:bg-slate-900/80 transition-all duration-300 relative backdrop-blur-sm"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded-full bg-indigo-950/80 border border-indigo-900/50 px-3 py-1 text-xs font-bold uppercase text-indigo-300">
                      {product.categoryLabel}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-900/40 px-2.5 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Instant Delivery
                    </span>
                  </div>

                  {/* Emoji Icon & Title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 text-3xl shrink-0 group-hover:scale-105 transition-transform duration-200 shadow-inner">
                      {product.emoji}
                    </div>
                    <div>
                      <h3
                        itemProp="name"
                        className="text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors leading-snug"
                      >
                        {product.title}
                      </h3>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p
                    itemProp="description"
                    className="mt-2 text-xs text-slate-400 leading-relaxed line-clamp-3"
                  >
                    {product.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80 space-y-2">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-2">
                      Included in Package:
                    </p>
                    {product.deliverables.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs text-slate-300"
                      >
                        <svg
                          className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price and Buttons */}
                <div
                  className="mt-7 pt-5 border-t border-slate-800"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="price" content={product.price} />
                  <link itemProp="availability" href="https://schema.org/InStock" />

                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-50">
                        ${product.price}
                      </span>
                      <span className="text-sm font-medium line-through text-slate-500">
                        ${product.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-indigo-400">
                        USD
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500">
                      One-Time Payment
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`Buy ${product.title} for $${product.price} USD`}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-center text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-center text-xs sm:text-sm font-semibold text-slate-300 border border-slate-700/60 hover:text-white transition-all duration-200"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
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
