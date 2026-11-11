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
    <article className="max-w-4xl mx-auto py-16 px-6 text-[#A1A1AA] min-h-[75vh] transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-2 text-xs font-mono text-[#71717A]"
      >
        <Link href="/" className="hover:text-[#10B981] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-[#FAFAFA] font-medium">About Us</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] mb-3 tracking-tight">
        About Us
      </h1>
      <p className="text-xs font-mono uppercase tracking-wider text-[#10B981] mb-10">
        Empowering Developers &amp; Engineers Worldwide
      </p>

      <div className="space-y-8 text-[15px] leading-relaxed">
        <p>
          Welcome to{" "}
          <strong className="text-[#FAFAFA]">DevAssets</strong>, a digital
          products company specializing in production-ready code templates,
          architecture kits, and developer guides. We create practical, modern
          engineering resources including reusable JavaScript and React starter
          kits, technical SEO auditing tools, and comprehensive implementation
          manuals.
        </p>

        <p>
          Operated by <strong className="text-[#FAFAFA]">Md Sayed</strong> and
          based in Satkhira-9450, Khulna, Bangladesh, our goal is to provide
          clear, up-to-date, and actionable code and documentation that helps
          engineers accelerate their workflow — without unnecessary complexity.
        </p>

        {/* Vision & Mission */}
        <div className="p-6 rounded-xl bg-[#18181B] border border-[#27272A]">
          <h2 className="text-lg font-bold text-[#FAFAFA] mb-3 flex items-center gap-2">
            <span className="text-[#10B981]">&gt;_</span> Our Vision &amp; Mission
          </h2>
          <p className="text-[#A1A1AA]">
            The tech industry moves fast. Finding structured, high-quality, and
            production-ready code resources can be difficult. At DevAssets, we
            focus on creating carefully engineered developer kits such as our{" "}
            <em className="text-[#FAFAFA]">
              Advanced JavaScript Patterns &amp; Engine Toolkit
            </em>
            ,{" "}
            <em className="text-[#FAFAFA]">
              Advanced React Enterprise Starter Kit
            </em>
            , and{" "}
            <em className="text-[#FAFAFA]">
              Technical SEO &amp; Core Web Vitals Audit Toolkit
            </em>
            . Every resource is regularly reviewed and updated to stay aligned
            with current industry standards.
          </p>
        </div>

        {/* Why Trust Us */}
        <div>
          <h2 className="text-lg font-bold text-[#FAFAFA] mb-4 flex items-center gap-2">
            <span className="text-[#10B981]">🛡️</span> Why Customers Trust Us
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <li className="flex items-start gap-3">
              <span className="text-[#10B981] text-lg mt-0.5 font-bold">✓</span>
              <div>
                <strong className="text-[#FAFAFA] block mb-1">
                  Instant Digital Delivery
                </strong>
                <span className="text-[#A1A1AA] text-sm">
                  All products are delivered securely and immediately after
                  successful payment. No delays.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#10B981] text-lg mt-0.5 font-bold">✓</span>
              <div>
                <strong className="text-[#FAFAFA] block mb-1">
                  Secure Global Checkout
                </strong>
                <span className="text-[#A1A1AA] text-sm">
                  Payments are processed through trusted, PCI-compliant payment
                  processors with full global tax compliance.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#10B981] text-lg mt-0.5 font-bold">✓</span>
              <div>
                <strong className="text-[#FAFAFA] block mb-1">
                  Clear Product Information
                </strong>
                <span className="text-[#A1A1AA] text-sm">
                  Every product includes detailed descriptions, file tree
                  previews, and technical specifications so customers know
                  exactly what they are purchasing.
                </span>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#10B981] text-lg mt-0.5 font-bold">✓</span>
              <div>
                <strong className="text-[#FAFAFA] block mb-1">
                  Global Customer Support
                </strong>
                <span className="text-[#A1A1AA] text-sm">
                  We serve customers worldwide and provide support via email
                  during business hours.
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* Business Information */}
        <div className="pt-8 border-t border-[#27272A]">
          <h2 className="text-lg font-bold text-[#FAFAFA] mb-4">
            Business Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#A1A1AA]">
            <div className="space-y-2">
              <p>
                <span className="text-[#71717A] font-mono">Brand / Business:</span>{" "}
                DevAssets (Operated by Md Sayed)
              </p>
              <p>
                <span className="text-[#71717A] font-mono">Address:</span>{" "}
                Satkhira-9450, Khulna, Bangladesh
              </p>
            </div>

            <div className="space-y-2">
              <p>
                <span className="text-[#71717A] font-mono">Support Email:</span>{" "}
                <a
                  href="mailto:support@devassets.online"
                  className="text-[#10B981] hover:text-[#34D399] font-mono transition-colors"
                >
                  support@devassets.online
                </a>
              </p>
              <p>
                <span className="text-[#71717A] font-mono">Business Hours:</span> Monday
                – Friday, 9:00 AM – 5:00 PM (UTC+6)
              </p>
              <p>
                <span className="text-[#71717A] font-mono">Website:</span>{" "}
                devassets.online
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs text-[#71717A] pt-4 font-mono">
          DevAssets is committed to transparency, secure transactions, and
          delivering practical digital resources to the global tech community.
        </p>
      </div>
    </article>
  );
}
