"use client";

import { useState, useRef, useEffect } from "react";
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
  { id: "prompts", label: "Prompts", href: "/prompts" },
  { id: "guides", label: "Learning Guides", href: "/#guides" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("home");
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
    if (pathname?.startsWith("/prompts")) {
      setActiveItem("prompts");
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
    setIsProfileOpen(false);

    if (item.id === "about" || item.id === "contact" || item.id === "prompts") {
      setActiveItem(item.id);
      return;
    }

    // Home, Tools, Learning Guides on homepage
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

        {/* Right Side Actions: License Redeem, Better Auth Session Awareness */}
        <div className="hidden md:flex items-center gap-3">
          {/* Redeem License Key Button */}
          <Link
            href="/access"
            className="text-indigo-300 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/50 border border-indigo-800/50 hover:bg-indigo-900/50 text-xs font-semibold"
          >
            <span>🔑</span>
            <span>Redeem Key</span>
          </Link>

          {session?.user ? (
            <div className="relative" ref={profileRef}>
              {/* Profile Pill Trigger Button */}
              <button
                type="button"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                aria-expanded={isProfileOpen}
                aria-haspopup="true"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-indigo-500/40 backdrop-blur-md transition-all cursor-pointer group"
              >
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-6 h-6 rounded-full object-cover border border-indigo-400/50"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white uppercase shadow-sm">
                    {(session.user.name || session.user.email || "U")[0]}
                  </div>
                )}
                <span className="text-xs font-semibold text-slate-200 max-w-[110px] truncate group-hover:text-white">
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
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl p-2 z-50 animate-fade-in space-y-1">
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
                      href="/#tools"
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
          className="flex md:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/5 transition-colors focus:outline-none cursor-pointer"
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
            <Link
              href="/access"
              onClick={() => setIsOpen(false)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-300 hover:bg-white/[0.04] transition-all flex items-center gap-2"
            >
              <span>🔑</span>
              <span>Redeem License Key</span>
            </Link>
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
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
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
                  className="w-full text-center py-2.5 rounded-xl text-sm font-medium text-rose-300 bg-rose-950/30 hover:bg-rose-950/50 border border-rose-800/40 transition-colors disabled:opacity-50 cursor-pointer"
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
