import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#FAFAFA] dark:bg-[#0B0C0E] border-t border-neutral-200/80 dark:border-neutral-850 px-4 sm:px-6 lg:px-8 py-14 transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-neutral-200/80 dark:border-neutral-850 text-xs">
          {/* Brand Info & Identity */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 flex items-center justify-center font-mono font-bold text-xs">
                &gt;_
              </div>
              <span className="text-sm font-semibold tracking-[-0.02em] text-neutral-900 dark:text-neutral-100">
                DevAssets
              </span>
            </div>

            <p className="text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              Curated client-side developer utilities, deterministic AI prompt engineering libraries, and production-tested React architecture toolkits.
            </p>

            <div className="pt-1 text-[11px] font-mono text-neutral-500">
              Operated by Md Sayed &middot; satkhira-9450, Khulna, Bangladesh
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Resources
            </div>
            <ul className="space-y-1.5 text-neutral-600 dark:text-neutral-400">
              <li>
                <Link href="/tools" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Browser Utilities
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  AI Prompt Library
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Pricing &amp; Bundles
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-neutral-900 dark:hover:text-white transition-colors">
                  Redeem License Key
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-semibold">
              Support &amp; Compliance
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              Direct Engineering Inquiries:
              <br />
              <a
                href="mailto:support@devassets.online"
                className="text-neutral-900 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-mono"
              >
                support@devassets.online
              </a>
            </p>
            <p className="text-[11px] text-neutral-500 font-mono">
              Mon – Fri: 09:00 – 17:00 (UTC+6)
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {currentYear} DevAssets. All rights reserved.
          </div>

          <nav aria-label="Legal Links" className="flex flex-wrap items-center gap-5">
            <Link href="/about" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
