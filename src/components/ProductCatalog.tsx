"use client";

import { useState } from "react";
import Link from "next/link";
import {
  proUtilitySuiteProduct,
  uiUxProductDesignPromptsProduct,
  allInOneLifetimeBundleProduct,
  type Product,
} from "@/data/products";
import CheckoutModal from "./CheckoutModal";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "@/components/motion/MotionContainers";

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Strictly 3 featured products on the homepage / landing page
  const featuredProducts = [
    {
      product: proUtilitySuiteProduct,
      badge: "Commercial Utility",
      badgeColor: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
      glowColor: "from-cyan-500/25 to-blue-600/10",
      borderColor: "border-cyan-500/30 hover:border-cyan-400/50",
      buttonGrad: "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.35)]",
      checkColor: "bg-cyan-500/20 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.4)]",
    },
    {
      product: uiUxProductDesignPromptsProduct,
      badge: "150+ Design System Prompts",
      badgeColor: "bg-purple-500/15 text-purple-300 border-purple-400/30",
      glowColor: "from-purple-500/25 to-pink-600/10",
      borderColor: "border-purple-500/30 hover:border-purple-400/50",
      buttonGrad: "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)]",
      checkColor: "bg-purple-500/20 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]",
    },
    {
      product: allInOneLifetimeBundleProduct,
      badge: "👑 Lifetime All-Access Deal",
      badgeColor: "bg-amber-500/15 text-amber-300 border-amber-400/30",
      glowColor: "from-amber-500/25 via-purple-600/20 to-indigo-600/15",
      borderColor: "border-amber-500/40 hover:border-amber-400/60",
      buttonGrad: "from-amber-500 via-purple-600 to-indigo-600 hover:from-amber-400 hover:to-purple-500 shadow-[0_0_25px_rgba(245,158,11,0.35)]",
      checkColor: "bg-amber-500/20 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.4)]",
    },
  ];

  return (
    <>
      <section
        id="products"
        aria-labelledby="featured-products-heading"
        className="py-24 bg-[#070B14] border-t border-slate-900 scroll-mt-20 relative overflow-hidden"
      >
        {/* Background Ambient Radial Highlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Main Section Header */}
          <FadeInView y={20} className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              ⚡ Featured Developer Assets
            </span>
            <h2
              id="featured-products-heading"
              className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Choose Your Asset or Pass
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mx-auto" />
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed pt-2 max-w-xl mx-auto">
              Transparent, one-time pricing with instant digital access, commercial licensing, and zero recurring subscription fees.
            </p>
          </FadeInView>

          {/* ══════════════════════════════════════════════════════════════
              3 FEATURED FLAGSHIP PRODUCTS GRID (LIQUID GLASSMORPHISM)
             ══════════════════════════════════════════════════════════════ */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch px-2 sm:px-4">
            {featuredProducts.map(({ product, badge, badgeColor, glowColor, borderColor, buttonGrad, checkColor }) => (
              <StaggerItem key={product.id} className="h-full">
                <div
                  className={`group relative rounded-3xl p-7 sm:p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/40 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent border ${borderColor} shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full`}
                >
                  {/* Ambient Glow Backdrop */}
                  <div
                    className={`absolute -inset-1 rounded-3xl blur-xl opacity-30 -z-10 transition-opacity duration-300 group-hover:opacity-60 bg-gradient-to-b ${glowColor} pointer-events-none`}
                  />

                  <div>
                    {/* Top Pill Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <span className={`rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 border backdrop-blur-md ${badgeColor}`}>
                        {badge}
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
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                          {product.title}
                        </h3>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="mt-4 mb-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-white">
                          ${product.price}
                        </span>
                        <span className="text-xs text-slate-500 line-through">
                          ${product.originalPrice}
                        </span>
                        <span className="text-xs font-semibold text-indigo-400">
                          USD
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        One-Time Payment • Instant Access
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    {/* Deliverables List */}
                    <div className="space-y-2 pt-4 border-t border-white/[0.06] mb-8">
                      {product.deliverables.slice(0, 4).map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm py-1"
                        >
                          <span
                            className={`flex h-5 w-5 items-center justify-center rounded-full shrink-0 ${checkColor}`}
                          >
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2">
                    <MagneticButton className="w-full">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className={`w-full py-3 px-4 rounded-full bg-gradient-to-r ${buttonGrad} text-center text-xs sm:text-sm font-semibold text-white transition-all duration-200 active:scale-[0.98] cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
                      >
                        Buy Now
                      </button>
                    </MagneticButton>
                    <Link
                      href={`/products/${product.slug}`}
                      className="w-full py-2.5 px-4 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-center text-xs font-semibold text-slate-300 border border-white/10 hover:text-white transition-all duration-200 block"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* ══════════════════════════════════════════════════════════════
              HIGH-IMPACT CALLOUT TO DEDICATED ALL PRODUCTS PAGE
             ══════════════════════════════════════════════════════════════ */}
          <FadeInView y={20} className="mt-16 max-w-4xl mx-auto">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-slate-900/60 bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-6 overflow-hidden">
              <div className="space-y-1.5 text-center sm:text-left z-10">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-0.5 rounded-full">
                  <span>📦</span> Full Product Library
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Explore All 10+ Developer Toolkits &amp; Prompts
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                  Looking for technical SEO tools, React enterprise starters, or JavaScript architectural patterns? Filter and browse the complete catalog.
                </p>
              </div>

              <div className="shrink-0 z-10">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>View All Products</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </FadeInView>
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
