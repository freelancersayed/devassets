"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setIsProfileOpen(false);
  }, [pathname]);

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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsOpen(false);
    setIsProfileOpen(false);

    if (pathname !== "/") {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-3.5 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        {/* Logo: DevAssets with Code/Terminal Icon */}
        <Link
          href="/"
          aria-label="DevAssets Homepage"
          className="flex items-center gap-2.5 group"
        >
          <span className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform duration-200">
            <svg
              className="w-5 h-5 text-white"
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
          <span className="text-xl font-black tracking-tight text-slate-50">
            Dev<span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Assets</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link
            href="/"
            className={`hover:text-indigo-400 transition-colors ${
              pathname === "/" ? "text-indigo-400 font-semibold" : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            className={`hover:text-indigo-400 transition-colors ${
              pathname.startsWith("/products") ? "text-indigo-400 font-semibold" : ""
            }`}
          >
            All Products
          </Link>
          <a
            href="/#tools"
            onClick={(e) => scrollToSection(e, "tools")}
            className="hover:text-indigo-400 transition-colors"
          >
            Free Tools
          </a>
        </div>

        {/* Action CTA: User Profile with Floating Dropdown */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user ? (
            <div className="relative" ref={profileRef}>
              {/* Profile Pill Trigger Button */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 backdrop-blur-md transition-all cursor-pointer group"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-200 max-w-[120px] truncate group-hover:text-white">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${
                    isProfileOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Glassmorphic Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-2 z-50 animate-fadeIn space-y-1">
                  {/* Dropdown User Info Header */}
                  <div className="px-3 py-2.5 border-b border-white/[0.08] space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-bold text-white truncate">
                        {session.user.name || "Developer"}
                      </p>
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.5 rounded">
                        Active
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate">
                      {session.user.email}
                    </p>
                  </div>

                  {/* Dropdown Links */}
                  <div className="pt-1 space-y-0.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-sm">📊</span>
                      <span>User Dashboard</span>
                    </Link>

                    <Link
                      href="/access"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-sm">🔑</span>
                      <span>Redeem License Key</span>
                    </Link>

                    <a
                      href="#tools"
                      onClick={(e) => scrollToSection(e, "tools")}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors"
                    >
                      <span className="text-sm">⚡</span>
                      <span>Free Browser Tools</span>
                    </a>
                  </div>

                  {/* Divider & Sign Out Button */}
                  <div className="pt-1 border-t border-white/[0.08]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleSignOut();
                      }}
                      disabled={isSigningOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <span className="text-sm">🚪</span>
                      <span>{isSigningOut ? "Signing out..." : "Sign Out"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-xs sm:text-sm font-semibold text-slate-300 hover:text-white px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                aria-label="Get started with free tools and resources"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/25"
              >
                <span>Get Started Free</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none cursor-pointer"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden mt-3 rounded-2xl bg-slate-900/95 border border-slate-800 p-4 space-y-2 animate-fade-in shadow-2xl">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-800/80 ${
              pathname === "/" ? "text-indigo-400 font-semibold bg-slate-800/40" : "text-slate-200"
            }`}
          >
            Home
          </Link>
          <Link
            href="/products"
            onClick={() => setIsOpen(false)}
            className={`block px-4 py-2.5 text-sm font-medium rounded-xl hover:bg-slate-800/80 ${
              pathname.startsWith("/products") ? "text-indigo-400 font-semibold bg-slate-800/40" : "text-slate-200"
            }`}
          >
            All Products
          </Link>
          <a
            href="/#tools"
            onClick={(e) => scrollToSection(e, "tools")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            Free Tools
          </a>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {session?.user ? (
              <>
                {/* Mobile User Info Card */}
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-indigo-400/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                      {(session.user.name || session.user.email || "U")[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile Dashboard Button */}
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2"
                >
                  <span>📊</span>
                  <span>User Dashboard</span>
                </Link>

                {/* Mobile Redeem License Button */}
                <Link
                  href="/access"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center px-4 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/40 border border-indigo-800/40 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🔑</span>
                  <span>Redeem License Key</span>
                </Link>

                {/* Mobile Sign Out Button */}
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-800/30 transition-colors cursor-pointer"
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/25"
                >
                  <span>Get Started Free</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
