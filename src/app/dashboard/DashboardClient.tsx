"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

interface UserPurchase {
  id?: string;
  productId: string;
  productTitle: string;
  productSlug: string;
  licenseKey: string;
  status: string;
  version: string;
  format: string;
  category: string;
  purchasedAt: string;
  downloadUrl: string;
  accessUrl?: string;
}

type TabType = "overview" | "assets" | "tools" | "prompts" | "redeem" | "account";

const DASHBOARD_TOOLS = [
  {
    id: "tool-image-studio",
    title: "Smart Image Studio",
    tagline: "Bulk Resizer & Format Converter",
    desc: "100% client-side bulk image compressor, aspect ratio resizer (16:9, 1:1, 4:5), and multi-format converter (WebP, PNG, JPEG) with ZIP export.",
    icon: "🖼️",
    route: "/tools/image-studio",
    badge: "New Tool",
    badgeColor: "text-cyan-400 bg-cyan-950/60 border-cyan-800/50",
    features: ["Zero Telemetry", "Bulk Canvas Engine", "Instant ZIP Export"],
  },
  {
    id: "tool-video-audio",
    title: "Video to Audio Detacher",
    tagline: "48kHz Lossless WAV Extractor",
    desc: "Detach audio tracks from MP4, WebM, and MOV videos locally in your browser memory via Web Audio API without uploading a single byte.",
    icon: "🎵",
    route: "/tools/video-to-audio",
    badge: "Web Audio API",
    badgeColor: "text-emerald-400 bg-emerald-950/60 border-emerald-800/50",
    features: ["Lossless 48kHz WAV", "Offline In-Memory", "No File Size Limit"],
  },
  {
    id: "tool-pdf-word",
    title: "PDF to Word / TXT",
    tagline: "Zero-Knowledge Memory Stream",
    desc: "Extract clean formatted text from PDF files directly inside your browser and export genuine Microsoft Word (.docx) and TXT documents.",
    icon: "📄",
    route: "/tools/pdf-to-word",
    badge: "Private Parser",
    badgeColor: "text-indigo-400 bg-indigo-950/60 border-indigo-800/50",
    features: ["Native .docx Export", "No Server Upload", "Layout Preserving"],
  },
  {
    id: "tool-image-text",
    title: "Image to Word Formatted (OCR)",
    tagline: "Bengali & English Neural OCR",
    desc: "Extract text from screenshots and photos using client-side OCR engine. Includes Unicode to Bijoy SutonnyMJ conversion toggle.",
    icon: "📝",
    route: "/tools/image-to-text",
    badge: "Wasm OCR",
    badgeColor: "text-purple-400 bg-purple-950/60 border-purple-800/50",
    features: ["Bijoy & Unicode", "One-Click Copy", "Instant Docx Download"],
  },
];

const CURATED_PROMPTS = [
  {
    id: "p1",
    category: "Next.js 15 & Server Actions",
    title: "Enterprise Server Action Mutation Pipeline",
    targetAi: ["Claude 3.7", "GPT-4o", "DeepSeek-V3"],
    content: `You are designing a high-concurrency Server Action in Next.js 15 (App Router).

Apply the following architectural constraints:
1. Type Safety & Validation:
   - Use Zod schemas with .safeParseAsync().
   - Never accept untyped FormData directly without schema coercion.
   - Return a Discriminated Union response object:
     { success: true, data: T } | { success: false, error: { code: string, message: string, fieldErrors?: Record<string, string[]> } }
2. Security & Authentication:
   - Verify caller session using Better Auth / NextAuth before DB access.
   - Guard against CSRF with native Server Action origin verification.
   - Enforce rate-limiting using Upstash Redis token bucket per IP/User ID.
3. Database & Cache Invalidation:
   - Wrap operations inside an atomic transaction (Prisma / MongoDB withTransaction).
   - Call revalidateTag() instead of revalidatePath() for surgical cache invalidation.
4. Optimistic Updates:
   - Provide client hook utilizing React 19 useActionState and useOptimistic.

Generate: schema.ts, actions.ts, and ClientForm.tsx.`,
  },
  {
    id: "p2",
    category: "Next.js 15 & Server Actions",
    title: "Streaming SSR & Nested Suspense Topologies",
    targetAi: ["Claude 3.7", "GPT-4o"],
    content: `You are a Principal Frontend Architect optimizing Next.js 15 App Router pages for sub-200ms TTFB and Zero Cumulative Layout Shift (CLS).

Generate a nested Suspense streaming topology for a complex dashboard page:
1. Critical Path: Render page skeleton and static chrome immediately from edge.
2. Streaming Boundaries: Deconstruct UI into independent async Server Components:
   a) Fast dynamic data (Profile, Notifications: <50ms)
   b) Heavy aggregated metrics (Analytics, Revenue chart: 300-800ms)
   c) Third-party external API feeds (Live webhook feed: 1000ms+)
3. Skeleton Fallbacks: Tailwind CSS skeletons matching exact layout.
4. Error Boundaries: Localized error.tsx wrappers to prevent cascade crashes.`,
  },
  {
    id: "p3",
    category: "Database & Indexing",
    title: "Prisma & MongoDB Compound Indexing ESR Optimization",
    targetAi: ["Claude 3.7", "DeepSeek-R1"],
    content: `You are a Principal Database Administrator specializing in MongoDB Atlas and Prisma ORM.

Optimize a collection with 5,000,000+ documents handling 1,500 requests/second:
1. Compound index strategy strictly following Equality-Sort-Range (ESR) rule.
2. Prevent in-memory sorting (SORT_KEY_GENERATOR) and full collection scans (COLLSCAN).
3. Construct Prisma schema definition with @@index and @@unique directives.
4. Build a high-performance MongoDB Aggregation Pipeline utilizing $facet, $bucketAuto, and $project projections.`,
  },
  {
    id: "p4",
    category: "TypeScript & Security",
    title: "Branded Types & Discriminated Union Event Bus",
    targetAi: ["Claude 3.7", "GPT-4o"],
    content: `You are a Principal TypeScript Systems Engineer. Create bulletproof defensive types and runtime validators:
1. Branded / Nominal primitive types: type UserId = string & { readonly __brand: unique symbol }.
2. Discriminated union domain events with exhaustive switch pattern matching using 'never'.
3. Zero-runtime-overhead TypeScript type guards with (arg is Type).
4. Zod schema transformation pipeline with sanitization (trim, lowercasing, XSS strip).`,
  },
  {
    id: "p5",
    category: "Cloud & Microservices",
    title: "Idempotent Webhook Processing with Redis Leases",
    targetAi: ["Claude 3.7", "GPT-4o", "DeepSeek-V3"],
    content: `You are designing a zero-data-loss Webhook consumer for FastSpring/Stripe payments:
1. Signature Verification: Validate HMAC-SHA256 signature against raw request body before parsing JSON.
2. Distributed Lock: Acquire Redis SET NX EX lock with 60s lease per webhook ID.
3. Outbox Pattern: Insert audit log into MongoDB before executing fulfillment business logic.
4. Dead-Letter Queue: Retry with exponential backoff up to 5 attempts, then send to dead-letter queue.`,
  },
];

export default function DashboardClient() {
  const { data: session, isPending } = useSession();

  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Purchases / Licenses state
  const [purchases, setPurchases] = useState<UserPurchase[]>([]);
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(true);

  // License redemption state
  const [licenseKeyInput, setLicenseKeyInput] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemFeedback, setRedeemFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  // Clipboard copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Prompt search & filter
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch user purchases from API
  const fetchPurchases = async () => {
    try {
      setIsLoadingPurchases(true);
      const res = await fetch("/api/user/purchases");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.purchases)) {
          setPurchases(data.purchases);
        }
      }
    } catch (err) {
      console.error("Failed to load user purchases:", err);
    } finally {
      setIsLoadingPurchases(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchPurchases();
    }
  }, [session?.user]);

  const handleRedeem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) return;

    setIsRedeeming(true);
    setRedeemFeedback(null);

    try {
      const res = await fetch("/api/user/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey: licenseKeyInput.trim() }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setRedeemFeedback({
          type: "error",
          message: data.message || "Invalid or unrecognized license key.",
        });
      } else {
        setRedeemFeedback({
          type: "success",
          message: data.message || "License verified and asset unlocked successfully!",
        });
        setLicenseKeyInput("");
        await fetchPurchases();
      }
    } catch (err: any) {
      setRedeemFeedback({
        type: "error",
        message: err.message || "An unexpected error occurred while redeeming.",
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const copyToClipboard = (text: string, type: "key" | "prompt", id: string) => {
    navigator.clipboard.writeText(text);
    if (type === "key") {
      setCopiedKey(id);
      setTimeout(() => setCopiedKey(null), 2000);
    } else {
      setCopiedPromptId(id);
      setTimeout(() => setCopiedPromptId(null), 2000);
    }
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  // 1. Loading Skeleton State
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#070A12] text-slate-200 flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 animate-pulse flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl">⚡</span>
          </div>
          <p className="text-sm font-mono text-slate-400 animate-pulse">
            Loading your developer dashboard...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State
  if (!session?.user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative">
        <div className="max-w-md w-full p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-2xl text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl">
            🔒
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Sign In Required</h2>
            <p className="text-sm text-slate-400">
              Please sign in to access your developer kits, license keys, and personalized dashboard.
            </p>
          </div>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/login?callbackURL=/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30 text-center"
            >
              Sign In
            </Link>
            <Link
              href="/register?callbackURL=/dashboard"
              className="flex-1 py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-slate-200 font-semibold text-sm transition-all text-center"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;
  const filteredPrompts = CURATED_PROMPTS.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" || p.category.includes(selectedCategory);
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const SIDEBAR_ITEMS: {
    id: TabType;
    label: string;
    icon: string;
    badge?: string | number;
    badgeColor?: string;
  }[] = [
    { id: "overview", label: "Overview", icon: "📊" },
    {
      id: "assets",
      label: "My Digital Assets",
      icon: "📦",
      badge: purchases.length > 0 ? purchases.length : undefined,
      badgeColor: "bg-emerald-950 text-emerald-400 border border-emerald-800/60",
    },
    {
      id: "tools",
      label: "Free Browser Tools",
      icon: "⚡",
      badge: "4",
      badgeColor: "bg-cyan-950 text-cyan-400 border border-cyan-800/60",
    },
    {
      id: "prompts",
      label: "AI Prompt Vault",
      icon: "🤖",
      badge: "5",
      badgeColor: "bg-purple-950 text-purple-300 border border-purple-800/60",
    },
    { id: "redeem", label: "Redeem License", icon: "🔑" },
    { id: "account", label: "Account & Settings", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-200 py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative selection:bg-indigo-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ══════════════════════════════════════════════════════════════
            DESKTOP & MOBILE SIDEBAR + PREVIEW LAYOUT CONTAINER
           ══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* ══════════════════════════════════════════════════════════════
              LEFT SIDEBAR: মেনু গুলো বাম সাইডে
             ══════════════════════════════════════════════════════════════ */}
          <aside className="w-full lg:w-72 shrink-0 space-y-4 lg:sticky lg:top-24">
            {/* User Profile Summary Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-white/10 backdrop-blur-xl shadow-xl flex items-center gap-3.5">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-indigo-400/50 shadow-md shadow-indigo-500/20 shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-lg font-black text-white shadow-md shadow-indigo-600/30 uppercase shrink-0">
                  {(user.name || user.email || "U")[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-white text-sm truncate">
                    {user.name || "Developer"}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {user.email}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
                    Verified Member
                  </span>
                </div>
              </div>
            </div>

            {/* Sidebar Navigation Items Menu */}
            <div className="p-2 sm:p-2.5 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl">
              <div className="px-3 py-2 text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold hidden lg:block">
                Dashboard Navigation
              </div>

              {/* Mobile Horizontal Scroll vs Desktop Vertical Menu */}
              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 scrollbar-none">
                {SIDEBAR_ITEMS.map((item) => {
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                        isActive
                          ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-600/25"
                          : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{item.icon}</span>
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : item.badgeColor || "bg-white/[0.06] text-slate-300"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Sidebar Quick Footer */}
              <div className="pt-3 mt-2 border-t border-white/[0.08] hidden lg:block space-y-2">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.06] space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
                    <span>Privacy Engine</span>
                    <span className="text-emerald-400 font-bold">100% Native</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Client WebAssembly &amp; Web Audio memory execution.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT PREVIEW & CONTENT AREA: ডানপাশে প্রিভিউ
             ══════════════════════════════════════════════════════════════ */}
          <main className="flex-1 w-full min-w-0 space-y-6">
            {/* ──────────────────────────────────────────────────────────
                TAB 1: OVERVIEW PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "overview" && (
              <div className="space-y-6 animate-fadeIn">
                {/* Overview Banner */}
                <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/70 via-slate-900/80 to-purple-950/50 border border-indigo-500/30 shadow-xl backdrop-blur-xl relative overflow-hidden">
                  <div className="max-w-2xl space-y-3 relative z-10">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-indigo-300 bg-indigo-950/80 border border-indigo-800/60 inline-flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Client-Side Workspace Active
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      Welcome to your Developer Hub
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Instant access to your purchased system architecture directives, offline browser utilities, and fast license key management.
                    </p>
                  </div>
                </div>

                {/* 4 Stat Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-4">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Digital Assets</span>
                      <span>📦</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-white">
                      {purchases.length}
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {purchases.length > 0 ? "Full access active" : "No keys active"}
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Free Tools</span>
                      <span>🛠️</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-cyan-400">
                      4
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      100% In-Memory
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>AI Prompts</span>
                      <span>🤖</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-purple-400">
                      450+
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      Claude 3.7 &bull; GPT-4o
                    </p>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-md space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Telemetry</span>
                      <span>🛡️</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                      0 KB
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      Zero Server Uploads
                    </p>
                  </div>
                </div>

                {/* Quick Launch Free Tools Grid Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        Free Client-Side Browser Utilities
                      </h3>
                      <p className="text-xs text-slate-400">
                        Zero server latency. Powered natively by HTML5 Canvas &amp; Web Audio API.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab("tools")}
                      className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      View All Tools &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {DASHBOARD_TOOLS.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.route}
                        className="group p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-indigo-500/40 backdrop-blur-md transition-all flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl p-2 rounded-xl bg-white/[0.04] border border-white/10 group-hover:scale-110 transition-transform">
                              {tool.icon}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tool.badgeColor}`}>
                              {tool.badge}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-bold text-white text-sm group-hover:text-indigo-300 transition-colors">
                              {tool.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                              {tool.desc}
                            </p>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                          <span>Launch Tool</span>
                          <span>&rarr;</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                TAB 2: MY DIGITAL ASSETS & DOWNLOADS PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "assets" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      My Unlocked Digital Kits
                    </h2>
                    <p className="text-xs text-slate-400">
                      Download packages and copy license keys for your purchased kits.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("redeem")}
                    className="self-start sm:self-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md shadow-indigo-600/30"
                  >
                    + Redeem License Key
                  </button>
                </div>

                {isLoadingPurchases ? (
                  <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-white/10 space-y-3">
                    <div className="w-8 h-8 mx-auto border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-slate-400">Loading your digital assets...</p>
                  </div>
                ) : purchases.length > 0 ? (
                  <div className="grid grid-cols-1 gap-5">
                    {purchases.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-white/10 shadow-xl backdrop-blur-xl flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              {item.status} &bull; {item.version}
                            </span>
                            <span className="text-xs font-mono text-slate-400">
                              {item.format}
                            </span>
                          </div>

                          <h3 className="text-lg sm:text-xl font-bold text-white">
                            {item.productTitle}
                          </h3>
                          <p className="text-xs text-slate-400">
                            Includes 200+ Architecture Directives, Server Action Matrix, and Vector Cheatsheets.
                          </p>

                          {/* License Key with Copy Button */}
                          <div className="p-3 rounded-xl bg-slate-950/80 border border-white/[0.08] flex items-center justify-between gap-2 font-mono text-xs">
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-slate-500">License Key:</span>
                              <span className="text-indigo-300 font-semibold truncate">
                                {item.licenseKey}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(item.licenseKey, "key", item.licenseKey)}
                              className="px-3 py-1 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                            >
                              {copiedKey === item.licenseKey ? "✓ Copied!" : "Copy"}
                            </button>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                          <a
                            href={item.downloadUrl}
                            download
                            className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm text-center shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            <span>Download Full ZIP Package</span>
                          </a>
                          <Link
                            href={
                              item.accessUrl ||
                              (item.productSlug === "pro-utility-suite"
                                ? "/tools/pro-utility-suite"
                                : item.productSlug === "ui-ux-product-design-prompts"
                                ? "/access/ui-ux-product-design-prompts"
                                : "/access")
                            }
                            className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <span>Open Studio / Playbook</span>
                            <span>&rarr;</span>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 sm:p-12 text-center rounded-3xl bg-slate-900/40 border border-white/10 space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-3xl">
                      📦
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">No Digital Assets Unlocked Yet</h4>
                      <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                        You can redeem your FastSpring purchase key or instantly test with our demo license key!
                      </p>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setLicenseKeyInput("DEVASSETS-DEMO-2026");
                          setActiveTab("redeem");
                        }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
                      >
                        <span>⚡</span>
                        <span>Unlock with Demo Key (DEVASSETS-DEMO-2026)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                TAB 3: FREE BROWSER TOOLS PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "tools" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="pb-2 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Free Browser Tools Studio
                  </h2>
                  <p className="text-xs text-slate-400">
                    4 native browser tools running 100% in local memory with zero server uploads.
                  </p>
                </div>

                {/* Pro Utility Suite Commercial Banner */}
                <div className="p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-slate-950 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(245,158,11,0.08)]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        🛠️ Enterprise Suite ($39)
                      </span>
                      <span className="text-xs text-slate-400">
                        Commercial Batch Pipelines &amp; Desktop Runners
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      DevAssets Pro Utility Suite (Commercial License)
                    </h3>
                    <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                      Need multi-file batch processing, offline native .EXE &amp; .DMG desktop runners, or headless command-line automation? Launch the Pro Workbench.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <Link
                      href="/tools/pro-utility-suite"
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 hover:scale-105 transition-all text-center"
                    >
                      ⚡ Open Pro Workbench
                    </Link>
                    <Link
                      href="/products/pro-utility-suite"
                      className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                    >
                      Product Info
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {DASHBOARD_TOOLS.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl flex flex-col justify-between space-y-5 hover:border-indigo-500/40 transition-colors shadow-lg"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-3xl p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                            {tool.icon}
                          </span>
                          <span className={`text-[11px] font-bold px-3 py-1 rounded-full border ${tool.badgeColor}`}>
                            {tool.badge}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white">{tool.title}</h3>
                          <p className="text-xs font-semibold text-indigo-400 mt-0.5">{tool.tagline}</p>
                          <p className="text-xs text-slate-300 mt-2 leading-relaxed">{tool.desc}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-1">
                          {tool.features.map((feat, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-950/80 border border-white/[0.06] text-slate-300"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-mono">
                          0 Bytes Uploaded &bull; Offline
                        </span>
                        <Link
                          href={tool.route}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-semibold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span>Open Tool</span>
                          <span>&rarr;</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                TAB 4: AI PROMPT VAULT PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "prompts" && (
              <div className="space-y-6 animate-fadeIn">
                <div className="pb-2 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    AI Architecture Prompt Vault
                  </h2>
                  <p className="text-xs text-slate-400">
                    Production directives calibrated for Claude 3.7 Sonnet, GPT-4o, and DeepSeek-V3.
                  </p>
                </div>

                {/* Search & Category Filter Pills */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search prompts by keyword, directive, or architecture..."
                      className="w-full px-4 py-2.5 pl-10 rounded-xl bg-slate-900/80 border border-white/10 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-indigo-400"
                    />
                    <svg
                      className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {["All", "Next.js", "Database", "TypeScript", "Microservices"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors ${
                          selectedCategory === cat
                            ? "bg-indigo-600 text-white"
                            : "bg-white/[0.04] text-slate-400 hover:text-white"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Cards */}
                <div className="space-y-4">
                  {filteredPrompts.map((prompt) => (
                    <div
                      key={prompt.id}
                      className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-white/10 backdrop-blur-md space-y-4 hover:border-indigo-500/30 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/[0.06]">
                        <div>
                          <span className="text-[11px] font-mono text-indigo-400 uppercase tracking-wider">
                            {prompt.category}
                          </span>
                          <h4 className="text-base font-bold text-white mt-0.5">{prompt.title}</h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {prompt.targetAi.map((ai, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/10 text-slate-300"
                              >
                                {ai}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(prompt.content, "prompt", prompt.id)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                          >
                            {copiedPromptId === prompt.id ? (
                              <>
                                <span>✓</span>
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <span>📋</span>
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/[0.06] text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                        {prompt.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                TAB 5: REDEEM LICENSE PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "redeem" && (
              <div className="space-y-6 animate-fadeIn max-w-2xl">
                <div className="pb-2 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Redeem License Key
                  </h2>
                  <p className="text-xs text-slate-400">
                    Activate and link your purchased kits directly to your account.
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl shadow-xl space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-bold text-white text-base">Enter Your Product License</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Check your email receipt from FastSpring to find your activation license key.
                    </p>
                  </div>

                  <form onSubmit={handleRedeem} className="space-y-3">
                    <input
                      type="text"
                      value={licenseKeyInput}
                      onChange={(e) => setLicenseKeyInput(e.target.value)}
                      placeholder="e.g. DEVASSETS-DEMO-2026"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/10 text-white text-sm font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-400 uppercase"
                    />

                    <div className="flex flex-col sm:flex-row gap-3 pt-1">
                      <button
                        type="submit"
                        disabled={isRedeeming || !licenseKeyInput.trim()}
                        className="py-3 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:opacity-90 disabled:opacity-50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/30"
                      >
                        {isRedeeming ? "Verifying License..." : "Activate & Unlock Product"}
                      </button>

                      <button
                        type="button"
                        onClick={() => setLicenseKeyInput("DEVASSETS-DEMO-2026")}
                        className="py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                      >
                        ⚡ Architecture Prompts Demo
                      </button>

                      <button
                        type="button"
                        onClick={() => setLicenseKeyInput("DESIGN-UIUX-2026")}
                        className="py-3 px-4 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-xs text-pink-300 transition-colors cursor-pointer"
                      >
                        🎨 UI/UX Design Demo
                      </button>

                      <button
                        type="button"
                        onClick={() => setLicenseKeyInput("PRO-SUITE-COMMERCIAL-2026")}
                        className="py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-xs text-amber-300 transition-colors cursor-pointer"
                      >
                        🛠️ Pro Suite Demo
                      </button>
                    </div>
                  </form>

                  {redeemFeedback && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-medium border flex items-center gap-2.5 animate-fadeIn ${
                        redeemFeedback.type === "success"
                          ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                          : "bg-rose-950/60 border-rose-500/40 text-rose-300"
                      }`}
                    >
                      <span>{redeemFeedback.type === "success" ? "✓" : "⚠️"}</span>
                      <span>{redeemFeedback.message}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ──────────────────────────────────────────────────────────
                TAB 6: ACCOUNT & SETTINGS PREVIEW
               ────────────────────────────────────────────────────────── */}
            {activeTab === "account" && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="pb-2 border-b border-white/10">
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    Account &amp; Security Settings
                  </h2>
                  <p className="text-xs text-slate-400">
                    Review your account identity, active sessions, and purchase portal.
                  </p>
                </div>

                {/* Profile Details */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-4">
                  <h3 className="font-bold text-white text-base">Profile Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono">Full Name</span>
                      <p className="font-semibold text-white">{user.name || "Developer"}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono">Email Address</span>
                      <p className="font-semibold text-white">{user.email}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono">Account ID</span>
                      <p className="font-mono text-slate-300 truncate">{user.id}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-white/[0.06] space-y-1">
                      <span className="text-slate-500 font-mono">Role Access</span>
                      <p className="font-semibold text-emerald-400 uppercase">
                        {(user as any).role || "user"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* FastSpring Support */}
                <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-xl space-y-3">
                  <h3 className="font-bold text-white text-base">Order &amp; Billing Lookup</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    FastSpring is our Merchant of Record. For invoice receipts, charge lookups, or VAT exemptions, visit the FastSpring consumer portal.
                  </p>
                  <div className="pt-1 flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://devassets.test.onfastspring.com/popup-devassets"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 transition-colors text-center"
                    >
                      FastSpring Order Portal &rarr;
                    </a>
                    <a
                      href="mailto:support@devassets.online"
                      className="px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-semibold text-slate-200 transition-colors text-center"
                    >
                      Contact Support &rarr;
                    </a>
                  </div>
                </div>

                {/* Sign Out Card */}
                <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/20 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-rose-300 text-sm">Session Sign Out</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Securely terminate your authentication token and return to the home page.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors shrink-0 cursor-pointer shadow-lg shadow-rose-600/20"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
