"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

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
            className="hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <a
            href="#tools"
            onClick={(e) => scrollToSection(e, "tools")}
            className="hover:text-indigo-400 transition-colors"
          >
            Free Tools
          </a>
          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            className="hover:text-indigo-400 transition-colors"
          >
            Store
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="hover:text-indigo-400 transition-colors"
          >
            Why Us
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="hover:text-indigo-400 transition-colors"
          >
            FAQ
          </a>
          <Link
            href="/about"
            className="hover:text-indigo-400 transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/access"
            className="text-indigo-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/60 hover:bg-indigo-900/60 text-xs font-semibold"
          >
            <span>🔑</span> Redeem License
          </Link>
        </div>

        {/* Action CTA: User Session Awareness */}
        <div className="hidden md:flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="text-xs font-medium text-slate-200 max-w-[120px] truncate">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-xs sm:text-sm font-semibold text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl hover:bg-white/[0.05] transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
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
          className="flex lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus:outline-none"
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
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            Home
          </Link>
          <a
            href="#tools"
            onClick={(e) => scrollToSection(e, "tools")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            Free Tools
          </a>
          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            Store
          </a>
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, "features")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            Why Us
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            FAQ
          </a>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-slate-200 rounded-xl hover:bg-slate-800/80"
          >
            About Us
          </Link>
          <Link
            href="/access"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-semibold text-indigo-300 rounded-xl hover:bg-slate-800/80"
          >
            🔑 Redeem License
          </Link>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-2">
            {session?.user ? (
              <>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-7 h-7 rounded-full object-cover border border-indigo-400/50"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase">
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
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-800/30 transition-colors"
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
