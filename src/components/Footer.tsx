import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#09090B] border-t border-[#27272A] px-4 sm:px-6 lg:px-8 py-14 transition-colors"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#27272A] text-xs">
          {/* Brand Info & Identity */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#18181B] border border-[#27272A] text-[#10B981] flex items-center justify-center font-mono font-bold text-xs">
                &gt;_
              </div>
              <span className="text-sm font-semibold tracking-[-0.02em] text-[#FAFAFA]">
                DevAssets
              </span>
            </div>

            <p className="text-[#A1A1AA] max-w-sm leading-relaxed">
              Curated client-side developer utilities, deterministic AI prompt engineering libraries, and production-tested React architecture toolkits.
            </p>

            <div className="pt-1 text-[11px] font-mono text-[#71717A]">
              Operated by Md Sayed &middot; satkhira-9450, Khulna, Bangladesh
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#FAFAFA] font-semibold">
              Resources
            </div>
            <ul className="space-y-1.5 text-[#A1A1AA]">
              <li>
                <Link href="/tools" className="hover:text-[#10B981] transition-colors">
                  Browser Utilities
                </Link>
              </li>
              <li>
                <Link href="/prompts" className="hover:text-[#10B981] transition-colors">
                  AI Prompt Library
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-[#10B981] transition-colors">
                  Pricing &amp; Bundles
                </Link>
              </li>
              <li>
                <Link href="/access" className="hover:text-[#10B981] transition-colors">
                  Redeem License Key
                </Link>
              </li>
            </ul>
          </div>

          {/* Compliance & Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <div className="font-mono text-[11px] uppercase tracking-wider text-[#FAFAFA] font-semibold">
              Support &amp; Compliance
            </div>
            <p className="text-[#A1A1AA]">
              Direct Engineering Inquiries:
              <br />
              <a
                href="mailto:support@devassets.online"
                className="text-[#FAFAFA] hover:text-[#10B981] font-mono transition-colors"
              >
                support@devassets.online
              </a>
            </p>
            <p className="text-[11px] text-[#71717A] font-mono">
              Mon – Fri: 09:00 – 17:00 (UTC+6)
            </p>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div>
            &copy; {currentYear} DevAssets. All rights reserved.
          </div>

          <nav aria-label="Legal Links" className="flex flex-wrap items-center gap-5">
            <Link href="/about" className="hover:text-[#10B981] transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-[#10B981] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#10B981] transition-colors">
              Terms of Service
            </Link>
            <Link href="/refund" className="hover:text-[#10B981] transition-colors">
              Refund Policy
            </Link>
            <Link href="/contact" className="hover:text-[#10B981] transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
