"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

interface UnlockedLicense {
  key: string;
  productId: string;
  productSlug: string;
  productTitle: string;
  licenseType: string;
  version: string;
  status: string;
  issuedAt: string;
  isDemo?: boolean;
  downloadUrl: string;
}

interface PromptItem {
  id: string;
  section: string;
  title: string;
  targetAi: string[];
  filename: string;
  prompt: string;
}

const SAMPLE_PROMPTS: PromptItem[] = [
  {
    id: "p1",
    section: "Section 1: Next.js 15 & Server Actions",
    title: "Enterprise Server Action Mutation Pipeline",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o", "DeepSeek-V3"],
    filename: "01-server-actions-crud-matrix.md",
    prompt: `You are designing a high-concurrency Server Action in Next.js 15 (App Router).

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
    section: "Section 1: Next.js 15 & Server Actions",
    title: "Streaming SSR & Nested Suspense Topologies",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o"],
    filename: "02-streaming-ssr-suspense-boundaries.md",
    prompt: `You are a Principal Frontend Architect optimizing Next.js 15 App Router pages for sub-200ms TTFB and Zero Cumulative Layout Shift (CLS).

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
    section: "Section 2: High-Concurrency PostgreSQL & Prisma",
    title: "Prisma & MongoDB Compound Indexing ESR Optimization",
    targetAi: ["Claude 3.7 Sonnet", "DeepSeek-R1"],
    filename: "01-prisma-mongodb-compound-indexing.md",
    prompt: `You are a Principal Database Administrator specializing in MongoDB Atlas and Prisma ORM.

Optimize a collection with 5,000,000+ documents handling 1,500 requests/second:
1. Compound index strategy strictly following Equality-Sort-Range (ESR) rule.
2. Prevent in-memory sorting (SORT_KEY_GENERATOR) and full collection scans (COLLSCAN).
3. Construct Prisma schema definition with @@index and @@unique directives.
4. Build a high-performance MongoDB Aggregation Pipeline utilizing $facet, $bucketAuto, and $project projections.`,
  },
  {
    id: "p4",
    section: "Section 3: Defensive TypeScript Types & Strict Schema",
    title: "Branded Types & Discriminated Union Event Bus",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o", "DeepSeek-V3"],
    filename: "04-defensive-typescript-validators.md",
    prompt: `You are a Principal TypeScript Systems Engineer. Create bulletproof defensive types and runtime validators:
1. Branded / Nominal primitive types: type UserId = string & { readonly __brand: unique symbol }.
2. Discriminated union domain events with exhaustive switch pattern matching using 'never'.
3. Zero-runtime-overhead TypeScript type guards with (arg is Type).
4. Zod schema transformation pipeline with sanitization (trim, lowercasing, XSS strip).`,
  },
  {
    id: "p5",
    section: "Section 4: Microservices Event Bus & Redis Caching",
    title: "Idempotent Webhook Receivers & Distributed Locks (Redlock)",
    targetAi: ["Claude 3.7 Sonnet", "GPT-4o"],
    filename: "02-idempotency-keys-and-distributed-locks.md",
    prompt: `Build an enterprise webhook receiver (FastSpring, Stripe, GitHub) resilient against network retries:
1. Atomic distributed lock using Redis SET resource_name my_random_value NX PX 30000 (Redlock algorithm).
2. Database uniqueness constraint check on order_id or event_id.
3. Replay attack prevention with timestamp drift verification (±300 seconds).
4. Asynchronous job queuing returning HTTP 200 in under 150ms.`,
  },
  {
    id: "p6",
    section: "Section 5: Automated Jest & Playwright Test Generators",
    title: "Playwright Critical E2E Customer Journey Suite",
    targetAi: ["GPT-4o", "Claude 3.7 Sonnet", "DeepSeek-V3"],
    filename: "02-playwright-critical-e2e-flows.md",
    prompt: `Construct an enterprise Playwright E2E automation test script:
1. Page Object Model (POM) architecture.
2. Webhook / payment checkout simulation with mock network intercepts (page.route).
3. Multi-viewport responsive tests (Desktop 1920x1080, Mobile iPhone 14).
4. Accessibility audits using @axe-core/playwright to verify WCAG 2.2 AA standards.`,
  },
  {
    id: "p7",
    section: "Security Hardening",
    title: "Cryptographic HMAC SHA-256 Webhook Verification",
    targetAi: ["Claude 3.7 Sonnet", "DeepSeek-V3"],
    filename: "02-hmac-webhook-verification.md",
    prompt: `Implement constant-time cryptographic verification for incoming payment webhooks:
1. Native Node.js crypto.createHmac('sha256', secret).
2. Timing-safe equality check (crypto.timingSafeEqual) to defeat side-channel timing attacks.
3. Raw body buffer verification before JSON deserialization.
4. Auto-quarantine spoofed payload attempts with security audit logging.`,
  },
];

export default function AccessPortalPage() {
  const { data: session } = useSession();
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [licenseData, setLicenseData] = useState<UnlockedLicense | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("All");

  const DEMO_KEY = "DEVASSETS-DEMO-2026";

  useEffect(() => {
    // Check saved license key in localStorage
    const savedKey = localStorage.getItem("devassets_active_license");
    if (savedKey) {
      setLicenseKey(savedKey);
      handleVerify(savedKey);
    }
  }, []);

  const handleVerify = async (keyToVerify?: string) => {
    const key = (keyToVerify || licenseKey).trim();
    if (!key) {
      setError("Please enter a license key.");
      return;
    }

    setLoading(true);
    setError(null);

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

      if (data.success && data.license) {
        setLicenseData(data.license);
        localStorage.setItem("devassets_active_license", data.license.key);
      } else {
        setError(data.message || "Invalid license key.");
      }
    } catch (err: any) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPrompt = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearLicense = () => {
    localStorage.removeItem("devassets_active_license");
    setLicenseData(null);
    setLicenseKey("");
  };

  const sections = ["All", ...Array.from(new Set(SAMPLE_PROMPTS.map((p) => p.section)))];
  const filteredPrompts =
    activeSection === "All"
      ? SAMPLE_PROMPTS
      : SAMPLE_PROMPTS.filter((p) => p.section === activeSection);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-400">
            <span>🔑</span> DevAssets License & Downloads Vault
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Customer Product Access Portal
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Enter your commercial license key to unlock your digital assets, download the
            production bundle, and access the prompt matrix playbook.
          </p>
        </div>

        {/* License Verification Card */}
        <div className="max-w-2xl mx-auto bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
          {!licenseData ? (
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="licenseKey"
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
                >
                  Enter License Key
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    id="licenseKey"
                    type="text"
                    value={licenseKey}
                    onChange={(e) => setLicenseKey(e.target.value)}
                    placeholder="e.g. DEVASSETS-DEMO-2026"
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm font-mono text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors uppercase"
                  />
                  <button
                    type="button"
                    onClick={() => handleVerify()}
                    disabled={loading}
                    className="px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      "Unlock Product"
                    )}
                  </button>
                </div>
              </div>

              {/* Demo License Key Auto-Fill Helper */}
              <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-indigo-300">Need immediate demo access?</span>
                  <p className="text-slate-400 mt-0.5">
                    Use our full-access testing key: <code className="text-amber-300 font-mono font-bold">{DEMO_KEY}</code>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setLicenseKey(DEMO_KEY);
                    handleVerify(DEMO_KEY);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 font-semibold text-xs transition-colors shrink-0 cursor-pointer"
                >
                  ⚡ Auto-fill Demo Key
                </button>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-900/80 text-rose-300 text-xs flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>
          ) : (
            /* Unlocked Product Status */
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      {licenseData.productTitle}
                      {licenseData.isDemo && (
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-mono">
                          DEMO ACCESS
                        </span>
                      )}
                    </h2>
                    <p className="text-xs text-slate-400 font-mono">Key: {licenseData.key}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClearLicense}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Switch Key
                </button>
              </div>

              {/* License Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">License Type</span>
                  <span className="font-semibold text-slate-200 mt-1 block">
                    {licenseData.licenseType}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block">Status</span>
                  <span className="font-semibold text-emerald-400 mt-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ACTIVE
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-500 block">Version</span>
                  <span className="font-semibold text-indigo-400 mt-1 block font-mono">
                    {licenseData.version}
                  </span>
                </div>
              </div>

              {/* Primary Download Actions */}
              <div className="pt-2 space-y-3">
                <a
                  href={licenseData.downloadUrl}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-95"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Full Package (.ZIP Archive - 14.8 MB)</span>
                </a>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/products/fullstack-architecture-prompts/catalog.json"
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    <span>📄</span> Download catalog.json
                  </a>
                  <a
                    href="/products/fullstack-architecture-prompts/prompt-playbook.md"
                    download
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 hover:border-slate-500 text-xs font-semibold text-slate-300 transition-colors"
                  >
                    <span>📖</span> Download prompt-playbook.md
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live Prompt Explorer Vault */}
        {licenseData && (
          <div className="space-y-6 pt-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>⚡</span> Live Prompt Playbook & Matrix
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Copy battle-tested architecture prompts directly into Claude 3.7, GPT-4o, or DeepSeek.
                </p>
              </div>

              {/* Section Filter */}
              <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0">
                {sections.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setActiveSection(sec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      activeSection === sec
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                        : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
                    }`}
                  >
                    {sec.replace("Section ", "Sec ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPrompts.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 space-y-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider">
                        {item.section}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.targetAi.map((ai) => (
                          <span
                            key={ai}
                            className="px-2 py-0.5 rounded-md bg-purple-950/60 border border-purple-800/60 text-[10px] text-purple-300 font-mono"
                          >
                            {ai}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-slate-100">{item.title}</h3>
                    <div className="relative">
                      <pre className="text-xs text-slate-300 bg-slate-950 rounded-xl p-4 border border-slate-800/80 font-mono max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                        {item.prompt}
                      </pre>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/60 text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">{item.filename}</span>
                    <button
                      type="button"
                      onClick={() => handleCopyPrompt(item.id, item.prompt)}
                      className="px-3.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedId === item.id ? (
                        <>
                          <span className="text-emerald-400">✓</span> Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                          </svg>
                          Copy Prompt
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="text-center pt-8">
          <Link
            href="/products/fullstack-system-architecture-prompts"
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1.5"
          >
            ← Return to Full-Stack Architecture Prompts Product Page
          </Link>
        </div>
      </div>
    </div>
  );
}

