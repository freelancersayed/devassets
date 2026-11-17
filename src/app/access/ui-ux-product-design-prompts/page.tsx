"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import CheckoutModal from "@/components/CheckoutModal";
import { getProductBySlug } from "@/data/products";

interface PromptItem {
  id: string;
  category: string;
  title: string;
  targetAi: string[];
  filename: string;
  description: string;
  prompt: string;
}

const UIUX_PROMPTS: PromptItem[] = [
  {
    id: "ux-1",
    category: "Color & Tokens",
    title: "OKLCH & HSL Semantic Color Elevation Token System",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o", "DeepSeek-V3"],
    filename: "01-oklch-semantic-elevation-tokens.md",
    description: "Generate mathematically sound, accessible 12-step color palettes with cohesive dark/light surfaces.",
    prompt: `You are an elite Design System Architect specializing in color science and modern CSS token architectures (CSS Color Module Level 4 / OKLCH).

Create a production-grade Design Token Color Palette for a modern digital web platform with the following requirements:

1. Color Science & Space:
   - Use OKLCH color space for perceptually uniform lightness and chroma across hues.
   - Define a 12-step scale for Primary (Brand), Neutral (Surface & Canvas), Success, Warning, and Destructive.
   - Lightness curves must guarantee APCA and WCAG 2.2 AA (4.5:1 for body text, 3:1 for large text/icons).

2. Semantic Surface & Elevation Mapping:
   - Provide explicit tokens for:
     --surface-canvas (base background)
     --surface-subtle (card background, muted containers)
     --surface-raised (modals, dropdowns, sticky headers)
     --surface-overlay (backdrops, focus rings)
   - Include automatic dark-mode inversion tokens where contrast remains crisp without washed-out grays.

3. Code Outputs:
   - Export standard CSS Variables (:root and .dark)
   - Export Tailwind CSS v4 @theme configuration object
   - Export a JSON Design Token format compatible with Style Dictionary / Figma Tokens.`,
  },
  {
    id: "ux-2",
    category: "Figma to Code",
    title: "Figma Auto-Layout to Tailwind CSS v4 & React JSX Directives",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o"],
    filename: "02-figma-autolayout-to-tailwind-v4.md",
    description: "Translate complex Figma component hierarchies and nested auto-layouts directly into zero-regression code.",
    prompt: `You are an expert Frontend Design Technologist bridging Figma UI specs and production React 19 / Tailwind CSS v4.

When provided with a Figma Auto-Layout spec or JSON export, generate pixel-perfect, accessible React components following these directives:

1. Layout & Alignment Rules:
   - Horizontal Auto-Layout -> 'flex flex-row items-center gap-[token]'
   - Vertical Auto-Layout -> 'flex flex-col gap-[token]'
   - Fill Container -> 'flex-1 w-full min-w-0'
   - Hug Contents -> 'w-auto shrink-0'
   - Space Between -> 'justify-between'
   - Negative Gap / Overlap -> 'isolate flex -space-x-[token]'

2. Responsive & Fluid Behavior:
   - Use modern CSS subgrid or auto-fit grids where multi-card wrapping is required.
   - Avoid fixed heights ('h-[500px]'); use responsive aspect-ratios ('aspect-video') or min-h with flex padding.

3. Accessible HTML Semantics:
   - Never use generic <div> for clickable cards. Use <article>, <button>, or Next.js <Link>.
   - Include aria-label for icon buttons and aria-expanded for disclosure widgets.

Generate: Complete TypeScript component with Tailwind classes and variant props.`,
  },
  {
    id: "ux-3",
    category: "WCAG Accessibility",
    title: "WCAG 2.2 Level AA Rigorous Accessibility Audit Matrix",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o", "DeepSeek-V3"],
    filename: "03-wcag-22-aa-accessibility-audit.md",
    description: "Comprehensive automated audit criteria for color contrast, focus targets, keyboard traps, and ARIA.",
    prompt: `Act as a Certified Web Accessibility Specialist (CPACC / WAS). Conduct a comprehensive WCAG 2.2 Level AA compliance review for the provided component or page layout.

Audit systematically across the following 5 criteria:

1. Target Size (Minimum) — Criterion 2.5.8:
   - Verify every interactive touch target is at least 24x24 CSS pixels or has sufficient spacing offset.
   - Flag crowded inline links, tiny close icons, and pagination chevrons.

2. Focus Not Obscured & Appearance — Criteria 2.4.11 & 2.4.13:
   - Ensure sticky headers, floating banners, and toasts do not conceal active focus indicators.
   - Ensure focus rings have at least 3:1 contrast against adjacent background colors and 2px visible outline.

3. Color Contrast & Non-Text Contrast:
   - Text vs Background: >= 4.5:1 (normal text), >= 3:1 (18pt / 14pt bold).
   - UI Components & Graphical Objects: >= 3:1 for input borders, toggle switches, and tab active states.

4. Screen Reader Announcers & Name/Role/Value:
   - Provide correct ARIA roles: role="dialog" aria-modal="true" aria-labelledby="dialog-title".
   - Ensure dynamic toasts announce via aria-live="polite".

Output: Diagnostic matrix with Pass/Fail status, exact CSS/HTML remediations, and testing code.`,
  },
  {
    id: "ux-4",
    category: "Typography",
    title: "Fluid Typography & Modular Type Scale with CSS Clamp()",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o"],
    filename: "04-fluid-typography-clamp-scale.md",
    description: "Generate fluid font size scales that smoothly scale across mobile (375px) to 4K ultra-wide (2560px).",
    prompt: `You are an expert Typography & Responsive Design Systems Engineer.

Create a fluid modular typography scale using mathematical CSS clamp() formulas.

Requirements:
1. Viewport Range:
   - Minimum Viewport: 375px (Mobile Portrait)
   - Maximum Viewport: 1920px (Desktop Full HD)
   - Preferred scaling rate using slope-intercept formula: clamp(min, val, max).

2. Type Hierarchy Tokens:
   - --text-xs (Legal, Microcopy): 11px -> 12px
   - --text-sm (Captions, Badges): 13px -> 14px
   - --text-base (Body Paragraphs): 15px -> 16px
   - --text-lg (Subheaders, Leads): 18px -> 20px
   - --text-xl (Card Titles): 20px -> 24px
   - --text-2xl (Section Headers): 24px -> 32px
   - --text-3xl (Page Headlines): 30px -> 42px
   - --text-4xl (Hero Display): 38px -> 58px

3. Line Heights & Letter Spacing:
   - Tighter letter-spacing (-0.02em to -0.04em) on display sizes for modern visual polish.
   - Optimal reading measure: 1.5 - 1.65 line-height for body copy.

Output: Ready-to-copy CSS variables and Tailwind CSS font-size utility config.`,
  },
  {
    id: "ux-5",
    category: "Micro-Interactions",
    title: "Physics-Based Micro-Interactions & Framer Motion Blueprints",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o"],
    filename: "05-micro-interaction-physics-framer.md",
    description: "Natural spring physics, tactile hover states, and smooth skeleton loading transitions.",
    prompt: `You are an Interaction Designer and Creative Frontend Technologist.

Design a comprehensive set of physics-based micro-interactions using Framer Motion and Tailwind CSS.

Include implementations for:
1. Tactile Button Tap:
   - whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
   - Spring transition: stiffness: 400, damping: 17.
2. Fluid Modal Sheet Drawer:
   - Drag to dismiss with velocity threshold detection.
   - AnimatePresence backdrop blur fade (rgba(0,0,0,0.6) + backdrop-blur-md).
3. Expanding Search Bar / Filter Pill:
   - LayoutId animation with shared element morphing.
4. Skeleton Shimmer Sweep:
   - Shimmer gradient animation running smoothly with GPU transform translate3d.

Generate: Complete, copy-paste React components with TypeScript and Framer Motion motion.* primitives.`,
  },
  {
    id: "ux-6",
    category: "Components",
    title: "Accessible Enterprise Form & Validation State Design Tokens",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o", "DeepSeek-V3"],
    filename: "06-form-validation-states-tokens.md",
    description: "Multi-state input tokens (Default, Hover, Focus-Visible, Error, Success, Disabled, Loading).",
    prompt: `Act as a Design System Component Lead. Architect a complete token hierarchy and component specification for Enterprise Form Inputs.

Requirements:
1. Seven Distinct Interactive States:
   - Idle / Default
   - Hover
   - Focused (Focus-Visible with 2px ring offset)
   - Error (with destructive alert border and inline helper text)
   - Success (with checkmark confirmation icon)
   - Disabled (opacity: 0.5, cursor: not-allowed, pointer-events: none)
   - Loading / Submitting (integrated spinner and aria-busy="true")

2. Floating Label & Helper Text Mechanics:
   - Accessible label linking via htmlFor / id.
   - Error messaging associated via aria-describedby and aria-invalid="true".

3. Form Factor Variations:
   - Small (32px height for compact dashboards)
   - Medium (40px height for standard layouts)
   - Large (48px height for landing page hero forms)

Output: Comprehensive CSS token map and React TypeScript form field component.`,
  },
];

export default function UiUxPromptAccessPage() {
  const { data: session } = useSession();
  const product = getProductBySlug("ui-ux-product-design-prompts");

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<PromptItem>(UIUX_PROMPTS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  // License state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [licenseKeyInput, setLicenseKeyInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [licenseError, setLicenseError] = useState<string | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("devassets_active_license");
    if (saved) {
      verifyKey(saved, false);
    }
  }, []);

  const verifyKey = async (keyToVerify: string, showError = true) => {
    const key = keyToVerify.trim();
    if (!key) return;

    setIsVerifying(true);
    setLicenseError(null);

    try {
      const res = await fetch("/api/license/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: key,
          userId: session?.user?.id,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsUnlocked(true);
        localStorage.setItem("devassets_active_license", key);
        setShowUnlockModal(false);
      } else if (showError) {
        setLicenseError(data.message || "Invalid license key.");
      }
    } catch {
      if (showError) setLicenseError("Verification failed. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  const copyPromptText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = [
    "All",
    "Color & Tokens",
    "Figma to Code",
    "WCAG Accessibility",
    "Typography",
    "Micro-Interactions",
    "Components",
  ];

  const filteredPrompts = UIUX_PROMPTS.filter((p) => {
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.prompt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-pink-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/products/ui-ux-product-design-prompts" className="hover:text-pink-400 transition-colors">
              Products
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-pink-400 font-semibold">UI/UX Design System Studio</span>
          </div>

          <div className="flex items-center gap-3">
            {isUnlocked ? (
              <span className="px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                License Active &amp; Verified
              </span>
            ) : (
              <button
                type="button"
                onClick={() => setShowUnlockModal(true)}
                className="text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors cursor-pointer"
              >
                🔑 Unlock with Key
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-[#09090B] font-bold text-xs shadow-sm shadow-[#10B981]/20 active:scale-95 transition-all cursor-pointer"
            >
              <span>Buy License — $15.00</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-[#27272A] bg-[#18181B] p-8 md:p-10 shadow-xl">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20">
                🎨 Design System &amp; Token Studio
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#09090B] border border-[#27272A] text-[#FAFAFA]">
                v2.0 Release
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-semibold bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                FastSpring Instant Delivery
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#FAFAFA] tracking-tight leading-tight">
              UI/UX &amp; Product Design <br />
              <span className="text-[#10B981]">
                Prompt Library &amp; Token Studio
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
              150+ battle-tested prompts for UI/UX designers and frontend developers. Generate scalable OKLCH design tokens, translate Figma auto-layouts into zero-regression Tailwind code, and run automated WCAG 2.2 AA accessibility audits.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/api/downloads/prod_ui_ux_design_prompts?key=DESIGN-UIUX-2026"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#10B981] hover:bg-[#34D399] text-[#09090B] font-bold text-xs sm:text-sm shadow-sm shadow-[#10B981]/20 transition-all cursor-pointer"
              >
                <span>📦 Download Full Package (.ZIP)</span>
              </a>

              <Link
                href="/products/ui-ux-product-design-prompts"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-[#09090B] border border-[#27272A] text-[#FAFAFA] hover:border-[#10B981]/50 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Inspect Product Details &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Token Palette Preview Bar */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>🎨</span> Live OKLCH Token Swatch Preview (Light &amp; Dark Harmonious Scale)
            </span>
            <span className="text-[11px] font-mono text-pink-400">
              Generated via Design Token Prompt #01
            </span>
          </div>

          <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
            {[
              { step: "50", hex: "#fdf2f8", oklch: "97% 0.02 340" },
              { step: "100", hex: "#fce7f3", oklch: "93% 0.04 340" },
              { step: "200", hex: "#fbcfe8", oklch: "87% 0.08 340" },
              { step: "300", hex: "#f9a8d4", oklch: "78% 0.14 340" },
              { step: "400", hex: "#f472b6", oklch: "68% 0.20 340" },
              { step: "500", hex: "#ec4899", oklch: "58% 0.24 340" },
              { step: "600", hex: "#db2777", oklch: "51% 0.24 340" },
              { step: "700", hex: "#be185d", oklch: "43% 0.22 340" },
              { step: "800", hex: "#9d174d", oklch: "35% 0.18 340" },
              { step: "900", hex: "#831843", oklch: "27% 0.14 340" },
              { step: "950", hex: "#500724", oklch: "16% 0.09 340" },
              { step: "Surface", hex: "#0b0f19", oklch: "11% 0.02 260" },
            ].map((swatch, i) => (
              <div key={i} className="space-y-1 text-center">
                <div
                  className="h-10 rounded-lg border border-white/10 shadow-inner"
                  style={{ backgroundColor: swatch.hex }}
                ></div>
                <div className="text-[10px] font-mono text-slate-400">{swatch.step}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filter Pills & Search */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex overflow-x-auto gap-2 p-1 rounded-2xl bg-slate-900/80 border border-slate-800 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-pink-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.4)]"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts (e.g. OKLCH, WCAG, Figma)..."
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 w-full sm:w-64"
            />
          </div>
        </div>

        {/* Main Prompt Explorer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prompt List Sidebar */}
          <div className="space-y-3 lg:col-span-1 max-h-[650px] overflow-y-auto pr-1">
            {filteredPrompts.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPrompt(item)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                  selectedPrompt.id === item.id
                    ? "bg-pink-950/30 border-pink-500/80 shadow-[0_0_20px_rgba(236,72,153,0.15)]"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-pink-500/10 text-pink-400 border border-pink-500/20">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {item.filename}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.targetAi.map((ai, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[9px] font-medium bg-slate-950 border border-slate-800 text-slate-400"
                    >
                      {ai}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Active Prompt Reader & Copy Area */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/80 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-500/15 text-pink-300 border border-pink-500/30">
                      {selectedPrompt.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      {selectedPrompt.filename}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedPrompt.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => copyPromptText(selectedPrompt.prompt, selectedPrompt.id)}
                  className="px-4 py-2 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                >
                  {copiedId === selectedPrompt.id ? "✓ Copied to Clipboard!" : "📋 Copy Prompt"}
                </button>
              </div>

              {/* Prompt Text Block */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {selectedPrompt.prompt}
                </pre>
              </div>
            </div>

            {/* Prompt Footer info */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span>Optimized for:</span>
                <span className="text-slate-200 font-semibold">
                  {selectedPrompt.targetAi.join(" • ")}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/api/downloads/prod_ui_ux_design_prompts?key=DESIGN-UIUX-2026"
                  className="text-pink-400 hover:underline font-semibold"
                >
                  Download Full .ZIP Package &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Unlock License Modal */}
        {showUnlockModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-md rounded-2xl border border-pink-500/40 bg-slate-900 p-6 space-y-4 shadow-[0_0_50px_rgba(236,72,153,0.2)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔑</span> Redeem UI/UX License Key
                </h3>
                <button
                  type="button"
                  onClick={() => setShowUnlockModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Enter your FastSpring purchase key or test instantly with the official demo key.
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  value={licenseKeyInput}
                  onChange={(e) => setLicenseKeyInput(e.target.value)}
                  placeholder="e.g. DESIGN-UIUX-2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-pink-300 uppercase focus:outline-none focus:border-pink-500"
                />

                <button
                  type="button"
                  onClick={() => {
                    setLicenseKeyInput("DESIGN-UIUX-2026");
                    verifyKey("DESIGN-UIUX-2026", true);
                  }}
                  className="text-[11px] text-pink-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>⚡ Test with demo key:</span>
                  <code className="bg-pink-950/60 border border-pink-800/60 px-1.5 py-0.5 rounded font-mono text-[10px]">
                    DESIGN-UIUX-2026
                  </code>
                </button>

                {licenseError && (
                  <p className="text-xs text-rose-400 font-medium">{licenseError}</p>
                )}

                <button
                  type="button"
                  onClick={() => verifyKey(licenseKeyInput, true)}
                  disabled={isVerifying}
                  className="w-full py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? "Verifying License..." : "Verify & Unlock"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FastSpring Checkout Modal */}
        {showCheckout && product && (
          <CheckoutModal
            product={product}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </div>
    </div>
  );
}

