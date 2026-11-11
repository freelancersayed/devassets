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

const centerNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "tools", label: "Tools", href: "/tools" },
  { id: "prompts", label: "Prompts", href: "/prompts" },
  { id: "guides", label: "Learning Guides", href: "/guides" },
];

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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

        if (window.scrollY < 200) {
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FAFAFA]/90 dark:bg-[#0B0C0E]/90 border-b border-neutral-200/80 dark:border-neutral-850 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative">
        {/* COLUMN 1: MINIMALIST BRAND LOGO */}
        <div className="flex items-center shrink-0">
          <Link
            href="/"
            onClick={(e) => handleNavClick(e, centerNavItems[0])}
            aria-label="DevAssets Homepage"
            className="flex items-center gap-2.5 group"
          >
            {/* Crisp 16px geometric terminal icon */}
            <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xs">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="4 17 10 11 4 5" />
                <line x1="12" y1="19" x2="20" y2="19" />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
              DevAssets
            </span>
          </Link>
        </div>

        {/* COLUMN 2: ARCHITECTURAL 4-ITEM PILL BAR (CENTERED) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-neutral-100/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800/80 rounded-full p-1 backdrop-blur-md"
        >
          {centerNavItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3.5 py-1 rounded-full text-xs transition-all duration-150 ${
                  isActive
                    ? "bg-white text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50 shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* COLUMN 3: THEME TOGGLE & AUTH ACTIONS */}
        <div className="flex items-center gap-3 shrink-0">
          <ThemeToggle />

          {session?.user ? (
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-850 border border-neutral-200/80 dark:border-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 transition-colors"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center text-[10px] font-bold uppercase">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="max-w-[100px] truncate">
                  {session.user.name || "Dashboard"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-xs font-medium text-neutral-500 hover:text-rose-600 dark:text-neutral-400 dark:hover:text-rose-400 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/login"
                className="text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
              >
                Log in
              </Link>

              <Link
                href="/register"
                className="bg-indigo-600 hover:bg-indigo-500 active:translate-y-[1px] text-white text-xs font-medium px-4 py-1.5 rounded-lg shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>Register</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="flex md:hidden p-2 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors cursor-pointer"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-[#FAFAFA]/95 dark:bg-[#0B0C0E]/95 backdrop-blur-xl px-4 py-4 space-y-4 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {mobileNavItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-200/80 text-neutral-900 dark:bg-neutral-850 dark:text-neutral-100 font-semibold"
                      : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between px-1">
            <span className="text-xs font-mono text-neutral-500">Theme</span>
            <ThemeToggle />
          </div>

          <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex flex-col gap-2">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full text-center py-2 rounded-lg text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2 rounded-lg text-xs font-medium text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium rounded-lg transition-colors"
                >
                  <span>Register</span>
                  <span>&rarr;</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
