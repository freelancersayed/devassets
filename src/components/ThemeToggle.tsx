"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-14 h-7 sm:w-16 sm:h-8 rounded-full bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 opacity-60 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative inline-flex items-center w-14 h-7 sm:w-16 sm:h-8 p-0.5 sm:p-1 rounded-full bg-slate-200/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-700/80 shadow-inner hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${className}`}
    >
      {/* Sliding animated indicator */}
      <motion.div
        className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white dark:bg-slate-800 shadow-sm text-amber-500 dark:text-indigo-400 z-10"
        layout
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        style={{
          marginLeft: isDark ? "auto" : "0",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.svg
              key="moon"
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
              transition={{ duration: 0.18 }}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </motion.svg>
          ) : (
            <motion.svg
              key="sun"
              initial={{ rotate: 90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: -90, scale: 0 }}
              transition={{ duration: 0.18 }}
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Background icons */}
      <span className="absolute left-1.5 sm:left-2 text-[9px] sm:text-[10px] select-none pointer-events-none opacity-60 dark:opacity-0 transition-opacity">
        ☀️
      </span>
      <span className="absolute right-1.5 sm:right-2 text-[9px] sm:text-[10px] select-none pointer-events-none opacity-0 dark:opacity-60 transition-opacity">
        🌙
      </span>
    </button>
  );
}

