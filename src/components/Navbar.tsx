"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

interface NavItem {
  id: "home" | "tools" | "prompts" | "guides" | "about" | "contact";
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "tools", label: "Tools", href: "/#tools" },
  { id: "prompts", label: "Prompts", href: "/#prompts" },
  { id: "guides", label: "Learning Guides", href: "/#guides" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("home");
  const pathname = usePathname();
  const { data: session } = useSession();

  // Synchronize active navigation link based on current path and hash
  useEffect(() => {
    if (pathname === "/about") {
      setActiveItem("about");
      return;
    }
    if (pathname === "/contact") {
      setActiveItem("contact");
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

        // Check scroll position if at the very top
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
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    item: NavItem
  ) => {
    setIsOpen(false);

    if (item.id === "about" || item.id === "contact") {
      setActiveItem(item.id);
      return;
    }

    // Home, Tools, Prompts, Learning Guides
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
      } else if (item.id === "prompts") {
        window.dispatchEvent(
          new CustomEvent("filter-catalog", { detail: { category: "prompts" } })
        );
        const el =
          document.getElementById("catalog-filter") ||
          document.getElementById("products");
        if (el) el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", "/#prompts");
        setActiveItem("prompts");
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#070B14]/80 border-b border-white/10 transition-all">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Side: DevAssets Brand Logo with Glowing Code/Terminal Icon */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, navItems[0])}
          aria-label="DevAssets Homepage"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-600/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition-all duration-200">
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
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            Dev<span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-purple-400 bg-clip-text text-transparent">Assets</span>
          </span>
        </Link>

        {/* Center Navigation Menu: Desktop (hidden md:flex items-center gap-1 lg:gap-2) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 lg:gap-2"
        >
          {navItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={
                  isActive
                    ? "bg-white/[0.08] text-white border border-white/10 rounded-full px-4 py-1.5 text-sm font-medium"
                    : "text-slate-300 hover:text-white hover:bg-white/[0.04] rounded-full px-4 py-1.5 text-sm font-medium transition-all"
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions: Better Auth Session Awareness */}
        <div className="hidden md:flex items-center gap-2.5">
          {session?.user ? (
            <div className="flex items-center gap-2.5">
              {/* User Avatar & Name Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-5 h-5 rounded-full object-cover border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="text-xs font-medium text-slate-200 max-w-[110px] truncate">
                  {session.user.name || session.user.email?.split("@")[0]}
                </span>
              </div>

              {/* Dashboard Link */}
              <Link
                href="/dashboard"
                className="text-xs sm:text-sm font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Dashboard</span>
              </Link>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleSignOut}
                disabled={isSigningOut}
                className="text-xs sm:text-sm font-medium text-slate-400 hover:text-rose-400 px-3 py-1.5 rounded-full hover:bg-rose-950/20 hover:border-rose-800/30 border border-transparent transition-all cursor-pointer disabled:opacity-50"
              >
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full text-sm font-medium transition-all hover:bg-white/[0.06] border border-transparent hover:border-white/10"
              >
                Log in
              </Link>
              <Link
                href="/register"
                aria-label="Get started with free tools and resources"
                className="inline-flex items-center gap-1.5 px-4.5 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Get Started</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button (md:hidden) */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/5 transition-colors focus:outline-none"
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

      {/* Mobile Responsive Drawer (md:hidden) */}
      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#070B14]/95 backdrop-blur-2xl px-4 py-5 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white/[0.08] text-white border border-white/10"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {session?.user ? (
              <>
                <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10">
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
                    <p className="text-xs font-semibold text-white truncate">
                      {session.user.name || "User"}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-all"
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Dashboard</span>
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  disabled={isSigningOut}
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800/40 transition-colors disabled:opacity-50"
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-2.5 rounded-xl text-sm font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/30 active:scale-[0.99] transition-all"
                >
                  <span>Get Started</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
