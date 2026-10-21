"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      aria-label="Main Navigation"
      className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl flex items-center justify-between">
        <Link
          href="/"
          aria-label="DevAssets Homepage"
          className="flex items-center gap-2 group"
        >
          <span className="w-10 h-10 block overflow-hidden rounded-xl bg-slate-800">
            <Image
              className="w-full h-full object-cover"
              src="/logo.png"
              alt="DevAssets Logo"
              width={40}
              height={40}
              priority
            />
          </span>
          <span className="text-xl font-black tracking-tight text-slate-50">
            Dev<span className="text-indigo-400">Assets</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-400">
          <Link
            href="/"
            className="hover:text-indigo-400 transition-colors"
          >
            Home
          </Link>
          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            className="hover:text-indigo-400 transition-colors"
          >
            Products
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
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            aria-label="Explore our developer toolkits and code kits"
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            Explore Products
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          className="flex md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors focus:outline-none"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 rounded-2xl bg-slate-900 border border-slate-800 p-4 space-y-3 animate-fade-in">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800"
          >
            Home
          </Link>
          <a
            href="#products"
            onClick={(e) => scrollToSection(e, "products")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800"
          >
            Products
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, "faq")}
            className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800"
          >
            FAQ
          </a>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-medium text-slate-300 rounded-xl hover:bg-slate-800"
          >
            About Us
          </Link>

          <div className="pt-2 border-t border-slate-800">
            <a
              href="#products"
              onClick={(e) => scrollToSection(e, "products")}
              className="block w-full text-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 shadow-lg shadow-indigo-600/20"
            >
              Explore Products
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
