"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface AuthCardProps {
  mode: "login" | "register";
}

const slides = [
  {
    id: 1,
    tag: "⚡ 100% Client-Side Privacy",
    headline: "Instant Browser Tools. Zero Server Uploads.",
    subtext: "Fast, 100% private client-side conversions right inside your browser.",
    accentColor: "from-cyan-500/20 via-blue-600/15 to-transparent",
    badgeBorder: "border-cyan-400/40 text-cyan-300 bg-cyan-950/60",
    visualContent: (
      <div className="space-y-3 p-4 rounded-2xl bg-slate-950/70 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] backdrop-blur-md">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 font-mono">
          <span className="text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Client Web APIs Active
          </span>
          <span className="text-slate-400">0 KB Uploaded</span>
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">🎵</span>
            <div>
              <p className="font-semibold text-white">Audio Detacher</p>
              <p className="text-[10px] text-slate-400">Web Audio API &bull; 48kHz WAV</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
            Lossless
          </span>
        </div>
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs">
          <div className="flex items-center gap-2">
            <span className="text-base">📄</span>
            <div>
              
              <p className="font-semibold text-white">PDF to Word / TXT</p>
              <p className="text-[10px] text-slate-400">Zero-knowledge memory stream</p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2 py-0.5 rounded">
            Native
          </span>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    tag: "🤖 450+ Curated Prompts",
    headline: "Supercharge Workflows with AI Prompts.",
    subtext: "Over 450+ production-ready prompts for Next.js, React, UI/UX, and SEO.",
    accentColor: "from-purple-500/25 via-indigo-600/15 to-transparent",
    badgeBorder: "border-purple-400/40 text-purple-300 bg-purple-950/60",
    visualContent: (
      <div className="space-y-3 p-4 rounded-2xl bg-slate-950/70 border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.15)] backdrop-blur-md">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 font-mono">
          <span className="text-purple-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Claude 3.7 / GPT-4o / DeepSeek
          </span>
          <span className="text-slate-400">JSON + MD + PDF</span>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/80 border border-white/[0.06] text-xs space-y-1.5 font-mono">
          <p className="text-indigo-400 font-semibold">&gt; prompt.system_architecture.init()</p>
          <p className="text-slate-300 text-[11px] leading-relaxed">
            &quot;Architect high-concurrency Next.js App Router endpoints with defensive validation and Prisma schema indexing...&quot;
          </p>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span>⚡ 200+ Architecture Directives</span>
          <span className="text-purple-400 font-medium">Instant Export</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    tag: "📚 Technical Blueprints",
    headline: "Master Modern Tech with Deep Blueprints.",
    subtext: "In-depth masterclass guides and tested production boilerplates.",
    accentColor: "from-emerald-500/20 via-indigo-600/15 to-transparent",
    badgeBorder: "border-emerald-400/40 text-emerald-300 bg-emerald-950/60",
    visualContent: (
      <div className="space-y-3 p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)] backdrop-blur-md">
        <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10 font-mono">
          <span className="text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Verified Source Code Kits
          </span>
          <span className="text-slate-400">Commercial License</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06]">
            <p className="font-bold text-white">React Enterprise</p>
            <p className="text-[10px] text-slate-400 mt-0.5">2 Reference Apps + PDF</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-white/[0.06]">
            <p className="font-bold text-white">JS Engine Patterns</p>
            <p className="text-[10px] text-slate-400 mt-0.5">50+ Modular Patterns</p>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
          <span>📦 Includes Jest Suites &amp; Benchmarks</span>
          <span className="text-emerald-400 font-medium">v2.4 Ready</span>
        </div>
      </div>
    ),
  },
];

export default function AuthCard({ mode }: AuthCardProps) {
  const router = useRouter();
  const isRegister = mode === "register";

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Password validation helpers
  const isLengthValid = password.length >= 8;
  const hasMixedChars = /[0-9]/.test(password) && /[a-zA-Z]/.test(password);
  const doPasswordsMatch = Boolean(confirmPassword && password === confirmPassword);

  const isRegistrationReady =
    isRegister &&
    firstName.trim().length > 0 &&
    email.trim().length > 0 &&
    isLengthValid &&
    doPasswordsMatch &&
    agreeTerms;

  const isLoginReady = !isRegister && email.trim().length > 0 && password.length > 0;

  const isSubmitDisabled =
    isLoading ||
    Boolean(socialLoading) ||
    (isRegister ? !isRegistrationReady : !isLoginReady);

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle carousel every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (isRegister) {
      if (password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long.");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match. Please ensure both passwords match.");
        return;
      }
      if (!agreeTerms) {
        setErrorMessage("Please agree to the Terms & Conditions and Privacy Policy to continue.");
        return;
      }
    }

    setIsLoading(true);

    try {
      if (isRegister) {
        const fullName = `${firstName.trim()} ${lastName.trim()}`.trim() || email.split("@")[0];
        const res = await authClient.signUp.email({
          email,
          password,
          name: fullName,
          callbackURL: "/",
        });

        if (res.error) {
          setErrorMessage(res.error.message || "Failed to create account. Please check your credentials.");
          setIsLoading(false);
          return;
        }

        setSuccessMessage("Account created successfully! Redirecting...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/",
          rememberMe,
        });

        if (res.error) {
          setErrorMessage(res.error.message || "Invalid email or password. Please try again.");
          setIsLoading(false);
          return;
        }

        setSuccessMessage("Welcome back! Redirecting...");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
      setErrorMessage(msg);
      setIsLoading(false);
    }
  };

  const handleSocialAuth = async (provider: "google" | "github") => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setSocialLoading(provider);

    try {
      const res = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (res?.error) {
        setErrorMessage(res.error.message || `Failed to sign in with ${provider}.`);
        setSocialLoading(null);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Failed to sign in with ${provider}.`;
      setErrorMessage(msg);
      setSocialLoading(null);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative z-10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* ─── Split Screen Auth Card Container ─── */}
      <div className="max-w-5xl w-full mx-auto rounded-3xl overflow-hidden bg-slate-900/60 border border-white/10 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.1)] p-3 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 items-stretch relative">
        {/* ══════════════════════════════════════════════════════════════
            IMAGE BANNER / CAROUSEL SIDE
            • On Register (/register): LEFT (md:order-1)
            • On Login (/login): RIGHT (md:order-2)
            • On Mobile: Secondary (order-2 md:order-...)
           ══════════════════════════════════════════════════════════════ */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className={`relative rounded-2xl overflow-hidden min-h-[440px] sm:min-h-[500px] p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-slate-950 via-[#0B0F19] to-slate-950 border border-white/10 shadow-inner order-2 ${
            isRegister ? "md:order-1" : "md:order-2"
          }`}
        >
          {/* Ambient Glow for Active Slide */}
          <div
            className={`absolute inset-0 bg-gradient-to-b ${slides[currentSlide].accentColor} pointer-events-none transition-all duration-700`}
          />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/15 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/15 blur-3xl pointer-events-none rounded-full" />

          {/* Top Controls on the Banner */}
          <div className="flex items-center justify-between relative z-10">
            {/* Top-Left: DevAssets Logo with Glowing Terminal Icon */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-600/40 group-hover:scale-105 transition-transform duration-200">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </span>
              <span className="text-lg font-black tracking-tight text-white">
                Dev<span className="text-indigo-400">Assets</span>
              </span>
            </Link>

            {/* Top-Right: Glassmorphic "Back to website →" Button */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 backdrop-blur-md transition-all duration-200 active:scale-95 shadow-sm"
            >
              <span>Back to website</span>
              <span>→</span>
            </Link>
          </div>

          {/* Center Dynamic Slide Visual Content */}
          <div className="my-auto py-6 relative z-10 animate-fade-in key={currentSlide}">
            {slides[currentSlide].visualContent}
          </div>

          {/* Slide Text Content & Indicators */}
          <div className="relative z-10 space-y-4">
            <span
              className={`rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase inline-flex items-center gap-1.5 border backdrop-blur-md transition-colors ${slides[currentSlide].badgeBorder}`}
            >
              {slides[currentSlide].tag}
            </span>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                {slides[currentSlide].headline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                {slides[currentSlide].subtext}
              </p>
            </div>

            {/* 3 Pill-Shaped Navigation Dots */}
            <div className="flex items-center gap-2 pt-2">
              {slides.map((slide, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                        : "w-2.5 bg-white/30 hover:bg-white/50"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            FORM SIDE
            • On Register (/register): RIGHT (md:order-2)
            • On Login (/login): LEFT (md:order-1)
            • On Mobile: Always visible first (order-1 md:order-...)
           ══════════════════════════════════════════════════════════════ */}
        <div
          className={`p-6 sm:p-10 flex flex-col justify-center order-1 ${
            isRegister ? "md:order-2" : "md:order-1"
          }`}
        >
          {/* Header Title & Subtitle */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              {isRegister ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              {isRegister ? (
                <>
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-indigo-400 hover:text-purple-300 font-medium underline transition-colors"
                  >
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-indigo-400 hover:text-purple-300 font-medium underline transition-colors"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Error & Success Feedback Banners */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5 backdrop-blur-md animate-fade-in shadow-[0_0_20px_rgba(244,63,94,0.15)]">
              <svg className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div className="flex-1 leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2.5 backdrop-blur-md animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.15)]">
              <svg className="w-4 h-4 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div className="flex-1 font-medium">{successMessage}</div>
            </div>
          )}

          {/* Social Sign-in Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              disabled={isLoading || Boolean(socialLoading)}
              onClick={() => handleSocialAuth("google")}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              {socialLoading === "google" ? (
                <svg className="w-4 h-4 animate-spin text-indigo-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                /* Colored Google G Icon */
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Google</span>
            </button>

            <button
              type="button"
              disabled={isLoading || Boolean(socialLoading)}
              onClick={() => handleSocialAuth("github")}
              className="flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-50 disabled:cursor-not-allowed border border-white/10 text-xs sm:text-sm font-semibold text-slate-200 transition-all duration-200 active:scale-[0.98] cursor-pointer"
            >
              {socialLoading === "github" ? (
                <svg className="w-4 h-4 animate-spin text-purple-400" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                /* GitHub Octocat Icon */
                <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
              <span>GitHub</span>
            </button>
          </div>

          {/* Social Sign-in Divider */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-slate-900/90 px-3 text-xs text-slate-500 uppercase tracking-wider relative shrink-0">
              {isRegister ? "Or register with" : "Or continue with"}
            </span>
            <div className="border-t border-white/10 w-full" />
          </div>

          {/* Actual Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Sayed"
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-indigo-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Hossain"
                    className="w-full bg-white/[0.04] border border-white/10 focus:border-indigo-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-white/[0.04] border border-white/10 focus:border-indigo-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.04] border border-white/10 focus:border-indigo-400/60 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Password Requirements Guide (Registration Mode) */}
              {isRegister && password.length > 0 && (
                <div className="mt-2 p-2.5 rounded-xl bg-slate-950/70 border border-white/[0.08] text-xs space-y-1.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Password strength:</span>
                    <span
                      className={`font-semibold ${
                        isLengthValid && hasMixedChars
                          ? "text-emerald-400"
                          : isLengthValid
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      {isLengthValid && hasMixedChars
                        ? "Strong"
                        : isLengthValid
                        ? "Moderate"
                        : "Too short (min 8 chars)"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div
                      className={`flex items-center gap-1.5 ${
                        isLengthValid ? "text-emerald-400 font-medium" : "text-slate-500"
                      }`}
                    >
                      <span className="text-xs">{isLengthValid ? "✓" : "○"}</span>
                      <span>8+ characters</span>
                    </div>
                    <div
                      className={`flex items-center gap-1.5 ${
                        hasMixedChars ? "text-emerald-400 font-medium" : "text-slate-500"
                      }`}
                    >
                      <span className="text-xs">{hasMixedChars ? "✓" : "○"}</span>
                      <span>Letters &amp; numbers</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field (Registration Mode) */}
            {isRegister && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all pr-11 ${
                      confirmPassword.length > 0
                        ? doPasswordsMatch
                          ? "border-emerald-500/60 focus:border-emerald-400 bg-emerald-500/[0.02]"
                          : "border-rose-500/60 focus:border-rose-400 bg-rose-500/[0.02]"
                        : "border-white/10 focus:border-indigo-400/60"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1 cursor-pointer transition-colors"
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {confirmPassword.length > 0 && (
                  <p
                    className={`mt-1.5 text-[11px] flex items-center gap-1.5 font-medium ${
                      doPasswordsMatch ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {doPasswordsMatch ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span>Passwords do not match</span>
                      </>
                    )}
                  </p>
                )}
              </div>
            )}

            {/* Register Checkbox vs Login Actions Row */}
            {isRegister ? (
              <div className="pt-1 space-y-1.5">
                <label className="flex items-start gap-2.5 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/[0.05] text-indigo-500 focus:ring-indigo-500 cursor-pointer accent-indigo-500"
                  />
                  <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-indigo-400 underline hover:text-indigo-300">
                      Terms &amp; Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-indigo-400 underline hover:text-indigo-300">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 cursor-pointer group text-slate-400 select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/[0.05] text-indigo-500 focus:ring-indigo-500 cursor-pointer accent-indigo-500"
                  />
                  <span>Remember me</span>
                </label>
                <a
                  href="mailto:support@devassets.online?subject=Password%20Reset%20Request"
                  className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button (Active only when Terms agreed and inputs valid) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-3.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitDisabled
                    ? "bg-slate-800/40 text-slate-500 border border-white/[0.06] cursor-not-allowed opacity-50 shadow-none"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:opacity-95 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] active:scale-[0.98] cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{isRegister ? "Creating account..." : "Signing in..."}</span>
                  </>
                ) : (
                  <span>{isRegister ? "Create account" : "Sign in to DevAssets"}</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
