import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us — Empowering Developers Worldwide",
  description:
    "Learn about DevAssets: our mission, values, and why developers choose our production-ready code kits, architecture templates, and technical guides.",
  alternates: {
    canonical: "https://devassets.online/about",
  },
};

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About DevAssets",
    url: "https://devassets.online/about",
    description:
      "DevAssets is a digital product publisher providing production-ready code kits, architecture templates, and technical guides for developers.",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://devassets.online/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://devassets.online/about",
        },
      ],
    },
  };

  return (
    <article className="max-w-4xl mx-auto py-16 px-6 text-slate-300 bg-slate-950 min-h-[75vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-xs text-slate-400"
      >
        <Link href="/" className="hover:text-indigo-400 transition-colors">
          Home
        </Link>
        <span className="text-slate-600">/</span>
        <span className="text-indigo-400 font-medium">About Us</span>
      </nav>

      <h1 className="text-4xl font-extrabold text-slate-50 mb-3 text-gradient">
        About Us
      </h1>
      <p className="text-sm text-slate-500 mb-10 tracking-wide">
        Empowering Developers &amp; Engineers Worldwide
      </p>

      <div className="space-y-8 text-[15px] leading-relaxed">
        <p>
          Welcome to{" "}
          <strong className="text-slate-100">DevAssets</strong>, a digital
          products company specializing in production-ready code templates,
          architecture kits, and developer guides. We create practical, modern
          engineering resources including reusable JavaScript and React starter
          kits, technical SEO auditing tools, and comprehensive implementation
          manuals.
        </p>

        <p>
          Operated by <strong className="text-slate-100">Md Sayed</strong> and
          based in Satkhira-9450, Khulna, Bangladesh, our goal is to provide
          clear, up-to-date, and actionable code and documentation that helps
          engineers accelerate their workflow — without unnecessary complexity.
        </p>

        {/* Vision & Mission */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 mb-3 flex items-center gap-2">
            <span>🚀</span> Our Vision &amp; Mission
          </h2>
          <p className="text-slate-400">
            The tech industry moves fast. Finding structured, high-quality, and
            production-ready code resources can be difficult. At DevAssets, we
            focus on creating carefully engineered developer kits such as our{" "}
            <em className="text-slate-300">
              Advanced JavaScript Patterns &amp; Engine Toolkit
            </em>
            ,{" "}
            <em className="text-slate-300">
              Advanced React Enterprise Starter Kit
            </em>
            , and{" "}
            <em className="text-slate-300">
              Technical SEO &amp; Core Web Vitals Audit Toolkit
            </em>
            . Every resource is regularly reviewed and updated to stay aligned
            with current industry standards.
          </p>
        </div>

        {/* Why Trust Us */}
        <div>
          <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
            <span>🛡️</span> Why Customers Trust Us
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-lg mt-0.5">⚡</span>
              <div>
                <strong className="text-slate-200 block mb-1">
                  Instant Digital Delivery
                </strong>
                <span className="text-slate-400 text-sm">
                  All products are delivered securely and immediately after
                  successful payment. No delays.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-lg mt-0.5">🔒</span>
              <div>
                <strong className="text-slate-200 block mb-1">
                  Secure Global Checkout
                </strong>
                <span className="text-slate-400 text-sm">
                  Payments are processed through trusted, PCI-compliant payment
                  processors with full global tax compliance.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-lg mt-0.5">📄</span>
              <div>
                <strong className="text-slate-200 block mb-1">
                  Clear Product Information
                </strong>
                <span className="text-slate-400 text-sm">
                  Every product includes detailed descriptions, file tree
                  previews, and technical specifications so customers know
                  exactly what they are purchasing.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-indigo-400 text-lg mt-0.5">🌍</span>
              <div>
                <strong className="text-slate-200 block mb-1">
                  Global Customer Support
                </strong>
                <span className="text-slate-400 text-sm">
                  We serve customers worldwide and provide support via email
                  during business hours.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Business Information */}
        <div className="pt-8 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 mb-4">
            Business Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-400">
            <div className="space-y-2">
              <p>
                <span className="text-slate-500">Brand / Business Name:</span>{" "}
                DevAssets (Operated by Md Sayed)
              </p>
              <p>
                <span className="text-slate-500">Address:</span>{" "}
                Satkhira-9450, Khulna, Bangladesh
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="text-slate-500">Support Email:</span>{" "}
                <a
                  href="mailto:support@devassets.online"
                  className="text-indigo-400 hover:underline"
                >
                  support@devassets.online
                </a>
              </p>
              <p>
                <span className="text-slate-500">Business Hours:</span> Monday
                – Friday, 9:00 AM – 5:00 PM (UTC+6)
              </p>
              <p>
                <span className="text-slate-500">Website:</span>{" "}
                devassets.online
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 pt-4">
          DevAssets is committed to transparency, secure transactions, and
          delivering practical digital resources to the global tech community.
        </p>
      </div>
    </article>
  );
}
