"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  id: string;
  label: string;
  href: string;
}

// Core 4-item navigation menu for centered desktop navbar
const centerNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "tools", label: "Tools", href: "/tools" },
  { id: "prompts", label: "Prompts", href: "/prompts" },
  { id: "guides", label: "Learning Guides", href: "/guides" },
];

// Expanded navigation menu for mobile drawer (including About and Contact)
const mobileNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "tools", label: "Tools", href: "/tools" },
  { id: "prompts", label: "Prompts", href: "/prompts" },
  { id: "guides", label: "Learning Guides", href: "/guides" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("home");
  const pathname = usePathname();
  const { data: session } = useSession();

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Synchronize active navigation item based on path and hash
  useEffect(() => {
    if (pathname === "/about") {
      setActiveItem("about");
      return;
    }
    if (pathname === "/contact") {
      setActiveItem("contact");
      return;
    }
    if (pathname?.startsWith("/prompts")) {
      setActiveItem("prompts");
      return;
    }
    if (pathname?.startsWith("/tools")) {
      setActiveItem("tools");
      return;
    }
    if (pathname?.startsWith("/guides")) {
      setActiveItem("guides");
      return;
    }

    if (pathname === "/") {
      const syncActiveSectionFromHashOrScroll = () => {
        const hash = window.location.hash.toLowerCase();
        if (hash === "#tools") {
          setActiveItem("tools");
          return;
        }
        if (hash === "#prompts") {
          setActiveItem("prompts");
          return;
        }
        if (hash === "#guides" || hash === "#pdf") {
          setActiveItem("guides");
          return;
        }

        if (window.scrollY < 250) {
          setActiveItem("home");
        }
      };

      syncActiveSectionFromHashOrScroll();

      const handleScroll = () => {
        if (window.scrollY < 200) {
          setActiveItem("home");
        }
      };

      window.addEventListener("hashchange", syncActiveSectionFromHashOrScroll);
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("hashchange", syncActiveSectionFromHashOrScroll);
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setActiveItem("");
    }
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    setIsOpen(false);

    if (item.id === "about" || item.id === "contact" || item.id === "prompts") {
      setActiveItem(item.id);
      return;
    }

    // Smooth section scrolling if on homepage
    if (pathname === "/") {
      e.preventDefault();

      if (item.id === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", "/");
        setActiveItem("home");
      } else if (item.id === "tools") {
        const el = document.getElementById("tools");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#tools");
        setActiveItem("tools");
      } else if (item.id === "guides") {
        window.dispatchEvent(
          new CustomEvent("filter-catalog", { detail: { category: "pdf" } })
        );
        const el =
          document.getElementById("catalog-filter") ||
          document.getElementById("products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#guides");
        setActiveItem("guides");
      }
    } else {
      setActiveItem(item.id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 dark:bg-[#070B14]/80 border-b border-slate-200/80 dark:border-white/10 shadow-xs dark:shadow-none transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* ══════════════════════════════════════════════════════════════════
            COLUMN 1: BRAND LOGO (FAR LEFT)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, centerNavItems[0])}
            aria-label="DevAssets Homepage"
            className="flex items-center gap-2.5 group"
          >
            {/* Glowing purple/indigo square icon with terminal symbol (>_) */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all duration-200 shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            {/* Text: DevAssets with Assets part in cyan/purple gradient text */}
            <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              Dev
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 dark:from-indigo-400 dark:via-purple-300 dark:to-cyan-400 bg-clip-text text-transparent">
                Assets
              </span>
            </span>
          </Link>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            COLUMN 2: CORE 4-ITEM NAVIGATION MENU (CENTERED)
           ══════════════════════════════════════════════════════════════════ */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-slate-100/80 dark:bg-white/[0.04] border border-slate-200/80 dark:border-white/10 rounded-full px-2 py-1 backdrop-blur-md shadow-xs"
        >
          {centerNavItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={
                  isActive
                    ? "bg-white text-slate-900 shadow-sm font-semibold dark:bg-white/[0.1] dark:text-white rounded-full px-4 py-1.5 text-sm transition-all"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ══════════════════════════════════════════════════════════════════
            COLUMN 3: THEME TOGGLE & AUTH ACTIONS (FAR RIGHT)
           ══════════════════════════════════════════════════════════════════ */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Theme Toggle Pill Switch */}
          <ThemeToggle />

          {/* Desktop Authentication Controls */}
          {session?.user ? (
            <div className="hidden md:flex items-center gap-3">
              {/* User Avatar Badge & Dashboard Link */}
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all hover:border-indigo-400/50"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User Avatar"}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-xs">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="max-w-[110px] truncate">
                  {session.user.name || "Dashboard"}
                </span>
              </Link>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 px-3 py-1.5 rounded-full border border-rose-200 dark:border-rose-900/40 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {/* Log in Button */}
              <Link
                href="/login"
                className="text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white text-sm font-medium px-3 py-2 rounded-lg transition-colors"
              >
                Log in
              </Link>

              {/* Register Button (Primary CTA) */}
              <Link
                href="/register"
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:opacity-95 text-white text-sm font-medium px-5 py-2 rounded-full shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center gap-1.5 active:scale-[0.98]"
              >
                <span>Get Started</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button (md:hidden) */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-200 dark:border-white/10 transition-colors focus:outline-none cursor-pointer"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          MOBILE RESPONSIVE DRAWER (md:hidden)
         ══════════════════════════════════════════════════════════════════ */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070B14]/95 backdrop-blur-2xl px-4 py-5 space-y-4 shadow-2xl animate-fade-in">
          {/* Navigation links: Home, Tools, Prompts, Learning Guides, plus About and Contact */}
          <div className="flex flex-col space-y-1">
            {mobileNavItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-slate-100 text-slate-900 border border-slate-200/80 dark:bg-white/[0.08] dark:text-white dark:border-white/10 font-semibold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Theme Toggle Row */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-2">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Appearance / Theme
            </span>
            <ThemeToggle />
          </div>

          {/* Mobile Auth Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover border border-indigo-400/50"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
                      {(session.user.name || session.user.email || "U")[0]}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {session.user.name || "Developer"}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  <span>📊</span>
                  <span>User Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-rose-600 dark:text-rose-300 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-950/50 border border-rose-200 dark:border-rose-800/40 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:opacity-95 text-white text-sm font-medium rounded-full shadow-md shadow-indigo-600/25 active:scale-[0.99] transition-all"
                >
                  <span>Get Started</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}