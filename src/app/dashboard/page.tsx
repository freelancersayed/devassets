"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#070B14]">
        <div className="flex items-center gap-3 text-slate-400">
          <svg className="animate-spin h-5 w-5 text-indigo-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span className="text-sm">Loading your developer dashboard...</span>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center bg-[#070B14] px-4">
        <div className="max-w-md w-full rounded-3xl border border-white/10 bg-slate-900/60 p-8 backdrop-blur-xl text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
            <p className="text-sm text-slate-400">
              Please log in to your DevAssets account to view your dashboard, downloads, and licensed toolkits.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/login"
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-[85vh] bg-[#070B14] py-16 px-4 sm:px-6 relative overflow-hidden text-slate-300">
      {/* Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-cyan-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10">
        {/* User Welcome Banner */}
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.08] via-white/[0.02] to-transparent p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-400/50 shadow-md"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-600 flex items-center justify-center text-2xl font-black text-white uppercase shadow-lg shadow-indigo-500/25">
                {(user.name || user.email || "U")[0]}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Welcome, {user.name || "Developer"}!
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {(user as { role?: string }).role || "User"}
                </span>
              </div>
              <p className="text-sm text-slate-400 mt-1">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-slate-300 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 transition-all"
            >
              Browse Store
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-rose-300 hover:text-rose-200 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-800/40 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </button>
          </div>
        </div>

        {/* Quick Access Grid */}
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
            <span>⚡</span> Quick Navigation Hub
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/#tools"
              className="group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl hover:border-indigo-500/40 hover:bg-slate-900/70 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                🛠️
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-indigo-300 transition-colors">
                Free Web Tools
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Client-side PDF &amp; image conversion utilities.
              </p>
            </Link>

            <Link
              href="/#prompts"
              className="group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl hover:border-purple-500/40 hover:bg-slate-900/70 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3 group-hover:scale-105 transition-transform">
                🤖
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                AI Prompts
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                500+ curated system prompts and workflows.
              </p>
            </Link>

            <Link
              href="/#guides"
              className="group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl hover:border-cyan-500/40 hover:bg-slate-900/70 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-105 transition-transform">
                📚
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Learning Guides
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Technical masterclasses &amp; production kits.
              </p>
            </Link>

            <Link
              href="/contact"
              className="group rounded-2xl border border-white/10 bg-slate-900/40 p-5 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                💬
              </div>
              <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Help &amp; Support
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Direct inquiry to our engineering team.
              </p>
            </Link>
          </div>
        </div>

        {/* License & Resources Access Status */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <h3 className="text-lg font-bold text-white">Your Digital Asset Library</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Instant access to acquired starter kits and guides.
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              ✓ Account Status: Active
            </span>
          </div>

          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-xl">
              📦
            </div>
            <p className="text-sm font-semibold text-white">Looking for your purchased assets?</p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              All digital product downloads are delivered instantly to your registered email ({user.email}). If you need a re-download link or custom license key, contact our support team.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold text-white bg-indigo-600/80 hover:bg-indigo-600 border border-indigo-400/30 transition-all"
              >
                Contact Support Desk
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
