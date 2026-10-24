"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { productsData, getCatalogProductBySlug, type CatalogProduct } from "@/data/catalog";
import CheckoutModal from "./CheckoutModal";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
  MagneticButton,
  PulseGlow,
} from "@/components/motion/MotionContainers";

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

  // Products for the 3 main pricing tiers
  const starterProduct = useMemo(
    () => getCatalogProductBySlug("starter-single-asset") || productsData[0],
    []
  );
  const passProduct = useMemo(
    () => getCatalogProductBySlug("all-access-pass-30-day") || productsData[1],
    []
  );
  const lifetimeProduct = useMemo(
    () => getCatalogProductBySlug("all-in-one-lifetime-bundle") || productsData[2],
    []
  );

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return productsData;
    return productsData.filter((p) => p.category === activeTab);
  }, [activeTab]);

  return (
    <>
      <section
        id="products"
        aria-labelledby="pricing-heading"
        className="py-24 bg-[#070B14] border-t border-slate-900 scroll-mt-20 relative overflow-hidden"
      >
        {/* Background Ambient Radial Highlights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10">
          {/* Main Pricing Header */}
          <FadeInView y={20} className="text-center max-w-3xl mx-auto mb-6 space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
              ⚡ Plans &amp; Pricing
            </span>
            <h2
              id="pricing-heading"
              className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight"
            >
              Choose Your Plan
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 rounded-full mx-auto" />
            <p className="text-base text-slate-400 leading-relaxed pt-2 max-w-xl mx-auto">
              Transparent, one-time pricing with instant digital access and zero auto-renewing subscription traps.
            </p>
          </FadeInView>

          {/* ══════════════════════════════════════════════════════════════
              1. LIQUID GLASSMORPHIC 3-TIER PRICING CARDS
             ══════════════════════════════════════════════════════════════ */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center px-4 py-12">
            {/* ─── TIER 1: STARTER / SINGLE ASSET PASS (Electric Cyan / Blue Liquid Glow) ─── */}
            <StaggerItem className="h-full">
              <div className="group relative rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/40 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent border border-cyan-500/30 hover:border-cyan-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full">
                {/* Ambient Glow Backdrop */}
                <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30 -z-10 transition-opacity duration-300 group-hover:opacity-60 bg-gradient-to-b from-cyan-500/25 to-blue-600/10 pointer-events-none" />

                <div>
                  {/* Top Pill Badge */}
                  <div className="mb-5">
                    <span className="rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 backdrop-blur-md">
                      Starter Plan
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight">
                        $29
                      </span>
                      <span className="text-slate-400 text-sm font-medium">
                        /single license
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 line-through">
                        $59 USD
                      </span>
                      <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
                        Save 50%
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    For developers who want a single production-ready toolkit or prompt system.
                  </p>

                  {/* Features List with Dividers */}
                  <div className="space-y-1 pt-4 border-t border-white/[0.06] mb-8">
                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Any 1 codekit or prompt library</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Commercial developer license</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Multi-format download (.ZIP, JSON, PDF)</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04] last:border-0">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400 shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Lifetime minor updates for asset</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <MagneticButton className="w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(starterProduct)}
                    className="rounded-full w-full block text-center cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3.5 shadow-[0_0_20px_rgba(6,182,212,0.35)] hover:shadow-[0_0_30px_rgba(6,182,212,0.55)] transition-all active:scale-[0.98]"
                  >
                    Choose Starter Plan
                  </button>
                </MagneticButton>
              </div>
            </StaggerItem>

            {/* ─── TIER 2: 30-DAY ALL-ACCESS PASS (Featured Centerpiece - Royal Indigo & Purple Liquid Glow) ─── */}
            <StaggerItem className="h-full">
              <div className="group relative rounded-3xl p-8 sm:p-9 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/50 bg-gradient-to-b from-white/[0.12] via-white/[0.03] to-transparent border border-indigo-500/40 hover:border-indigo-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_0_40px_-5px_rgba(99,102,241,0.3),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full md:scale-105 z-10">
                {/* Floating "Most Popular" Pill */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)] border border-white/20 whitespace-nowrap">
                  ⭐ Most Popular
                </div>

                {/* Ambient Soft Breathing Pulse Glow Backdrop */}
                <PulseGlow className="absolute -inset-1.5 rounded-3xl blur-2xl -z-10 bg-gradient-to-b from-indigo-500/40 via-purple-600/30 to-cyan-500/15 pointer-events-none" />

                <div>
                  {/* Top Pill Badge */}
                  <div className="mb-5 mt-1">
                    <span className="rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 border border-indigo-400/40 backdrop-blur-md">
                      30-Day All-Access
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight [text-shadow:0_0_25px_rgba(99,102,241,0.6)]">
                        $29
                      </span>
                      <span className="text-indigo-200/80 text-sm font-medium">
                        /30-day pass (no auto-renew)
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 line-through">
                        $59 USD
                      </span>
                      <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider bg-indigo-950/80 border border-indigo-700/50 px-2 py-0.5 rounded">
                        Prepaid One-Time
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    For most developers and creators who want unlimited tools + any 3 premium downloads.
                  </p>

                  {/* Features List with Dividers */}
                  <div className="space-y-1 pt-4 border-t border-white/[0.08] mb-8">
                    <div className="flex items-center gap-3 text-slate-200 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/25 text-indigo-300 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-medium text-white">Unlimited client-side tool processing</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/25 text-indigo-300 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Any 3 premium downloads of your choice</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/25 text-indigo-300 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Zero subscription trap — strictly one-time</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-200 text-sm py-2.5 border-b border-white/[0.04] last:border-0">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/25 text-indigo-300 shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.5)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Priority developer email support</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <MagneticButton className="w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(passProduct)}
                    className="rounded-full w-full block text-center cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white font-semibold py-3.5 shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] transition-all active:scale-[0.98]"
                  >
                    Get All-Access Pass
                  </button>
                </MagneticButton>
              </div>
            </StaggerItem>

            {/* ─── TIER 3: ALL-IN-ONE LIFETIME BUNDLE (Vibrant Violet & Warm Amber Highlight Liquid Glow) ─── */}
            <StaggerItem className="h-full">
              <div className="group relative rounded-3xl p-8 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-2 bg-slate-900/40 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent border border-purple-500/30 hover:border-purple-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full">
                {/* Ambient Glow Backdrop */}
                <div className="absolute -inset-1 rounded-3xl blur-xl opacity-30 -z-10 transition-opacity duration-300 group-hover:opacity-60 bg-gradient-to-b from-purple-500/30 via-pink-500/15 to-amber-500/10 pointer-events-none" />

                <div>
                  {/* Top Pill Badge */}
                  <div className="mb-5">
                    <span className="rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 bg-purple-500/15 text-purple-300 border border-purple-400/30 backdrop-blur-md">
                      Lifetime Vault
                    </span>
                  </div>

                  {/* Price Block */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white font-extrabold text-4xl sm:text-5xl tracking-tight">
                        $69
                      </span>
                      <span className="text-slate-400 text-sm font-medium">
                        /lifetime access
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-500 line-through">
                        $149 USD
                      </span>
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded">
                        Lifetime Deal
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    For power builders, founders, and agencies wanting complete permanent access.
                  </p>

                  {/* Features List with Dividers */}
                  <div className="space-y-1 pt-4 border-t border-white/[0.06] mb-8">
                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>All current &amp; future web tools access</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>All 3 AI prompt libraries (500+ prompts)</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>All PDF masterclasses &amp; starter codebases</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-300 text-sm py-2.5 border-b border-white/[0.04] last:border-0">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20 text-purple-400 shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.4)]">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span>Commercial license &amp; lifetime free updates</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <MagneticButton className="w-full">
                  <button
                    type="button"
                    onClick={() => setSelectedProduct(lifetimeProduct)}
                    className="rounded-full w-full block text-center cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.55)] transition-all active:scale-[0.98]"
                  >
                    Get Lifetime Bundle
                  </button>
                </MagneticButton>
              </div>
            </StaggerItem>
          </StaggerContainer>

          {/* ══════════════════════════════════════════════════════════════
              2. FILTERABLE CATALOG OF ALL INDIVIDUAL ASSETS & TOOLS
             ══════════════════════════════════════════════════════════════ */}
          {/* ══════════════════════════════════════════════════════════════
              2. FILTERABLE CATALOG OF ALL INDIVIDUAL ASSETS & TOOLS
             ══════════════════════════════════════════════════════════════ */}
          <div className="mt-20 pt-16 border-t border-slate-800/80">
            <FadeInView y={20} className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs font-semibold tracking-wide uppercase bg-slate-800/80 text-slate-300 border border-slate-700/60 backdrop-blur-md">
                📦 Individual Assets Catalog
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Browse Individual Kits &amp; Prompts
              </h3>
              <p className="text-sm text-slate-400">
                Prefer to buy an individual toolkit? Filter by category below.
              </p>
            </FadeInView>

            {/* Filter Tabs with animated layoutId indicator */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12 p-1.5 rounded-full bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl max-w-fit mx-auto">
              {filterTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryTab"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-indigo-400/50"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Products Grid with Liquid Glassmorphism & Staggered Viewport Entrance */}
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto">
              {filteredProducts.map((product) => {
                // Tier accent color mapping
                const isCyan = product.category === "tools" || product.slug.includes("seo");
                const isPurple = product.category === "prompts";
                const isIndigo = product.category === "pdf" || product.category === "bundle";

                const glowClass = isCyan
                  ? "from-cyan-500/20 to-blue-600/10"
                  : isPurple
                  ? "from-purple-500/25 to-pink-600/10"
                  : "from-indigo-500/25 to-purple-600/10";

                const borderClass = isCyan
                  ? "border-cyan-500/25 hover:border-cyan-400/40"
                  : isPurple
                  ? "border-purple-500/25 hover:border-purple-400/40"
                  : "border-indigo-500/25 hover:border-indigo-400/40";

                const buttonGrad = isCyan
                  ? "from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.35)]"
                  : isPurple
                  ? "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(168,85,247,0.35)]"
                  : "from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-400 hover:to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.35)]";

                return (
                  <StaggerItem key={product.id}>
                    <article
                      itemScope
                      itemType="https://schema.org/Product"
                      className={`group relative rounded-3xl p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1.5 bg-slate-900/40 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent border ${borderClass} shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between h-full`}
                    >
                      {/* Ambient Glow Backdrop */}
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
                            <h4
                              itemProp="name"
                              className="text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors leading-snug"
                            >
                              {product.title}
                            </h4>
                          </div>
                        </div>

                        {/* Description */}
                        <p
                          itemProp="description"
                          className="text-xs text-slate-400 leading-relaxed line-clamp-2 mt-2 mb-4"
                        >
                          {product.description}
                        </p>

                        {/* Deliverables */}
                        <div className="space-y-1 pt-3 border-t border-white/[0.04]">
                          {product.deliverables.slice(0, 3).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-2 text-xs text-slate-300 py-1"
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

                      {/* Price and Buttons */}
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
                          <span className="text-[10px] text-slate-500 font-medium">
                            Single / One-Time
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
                            className="w-full py-2.5 px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-center text-xs font-semibold text-slate-300 border border-white/10 hover:text-white transition-all duration-200"
                          >
                            Details →
                          </Link>
                        </div>
                      </div>
                    </article>
                  </StaggerItem>
                );
              })}
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
