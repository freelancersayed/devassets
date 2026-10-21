import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site Footer"
      className="bg-slate-950 border-t border-slate-900 px-6 py-12 transition-colors duration-300"
    >
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8 border-b border-slate-900 text-sm">
          {/* Left Column */}
          <div className="space-y-3 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white">
                <svg
                  className="w-4 h-4"
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
              <span className="text-xl font-black text-slate-50">
                Dev<span className="text-indigo-400">Assets</span>
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-400">
              Operated by Md Sayed
            </p>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Production-ready developer templates, AI prompt systems, and private browser utilities.
            </p>
            <div className="pt-1">
              <a
                href="https://www.facebook.com/groups/1110390561349873"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="DevAssets Help Zone Community"
                className="inline-flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Join Developer Community</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2 text-center md:text-right text-xs text-slate-400">
            <p>
              📧 Support Email:{" "}
              <a
                href="mailto:support@devassets.online"
                className="text-indigo-400 hover:underline font-medium"
              >
                support@devassets.online
              </a>
            </p>
            <p>📍 Address: Satkhira-9450, Khulna, Bangladesh</p>
            <p>⏱️ Business Hours: Monday – Friday, 9:00 AM – 5:00 PM (UTC+6)</p>
            <p className="text-slate-500 pt-1">
              🔒 Merchant of Record & Payment Compliance Verified
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center md:text-left">
            &copy; {currentYear} <span className="font-semibold text-slate-400">DevAssets</span>. All rights reserved.
          </div>

          <nav
            aria-label="Legal & Information Links"
            className="flex flex-wrap justify-center gap-6 text-xs font-semibold text-slate-500"
          >
            <Link
              href="/about"
              className="hover:text-indigo-400 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/privacy"
              className="hover:text-indigo-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-indigo-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund"
              className="hover:text-indigo-400 transition-colors"
            >
              Refund Policy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
