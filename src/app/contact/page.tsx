import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us — Technical Support & Inquiries",
  description:
    "Get in touch with DevAssets. Contact our engineering team for inquiries regarding production-ready code kits, developer guides, and client-side web tools.",
  alternates: {
    canonical: "https://devassets.online/contact",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact DevAssets",
    url: "https://devassets.online/contact",
    description:
      "Contact DevAssets engineering and support team for inquiries regarding digital code kits, web tools, and technical guides.",
    mainEntity: {
      "@type": "Organization",
      name: "DevAssets",
      url: "https://devassets.online/",
      email: "support@devassets.online",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Satkhira-9450",
        addressLocality: "Satkhira",
        postalCode: "9450",
        addressRegion: "Khulna",
        addressCountry: "BD",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Support",
        email: "support@devassets.online",
        availableLanguage: ["English", "Bengali"],
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "09:00",
          closes: "17:00",
        },
      },
    },
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
          name: "Contact Us",
          item: "https://devassets.online/contact",
        },
      ],
    },
  };

  return (
    <article className="min-h-[80vh] bg-slate-50 dark:bg-[#070B14] py-16 px-4 sm:px-6 relative overflow-hidden text-slate-700 dark:text-slate-300 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      {/* Background Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">Contact</span>
        </nav>

        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide uppercase bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            💬 Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Contact Our Engineering &amp; Support Team
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Have questions about our digital code kits, browser utilities, or custom licenses? Reach out and we will get back to you promptly.
          </p>
        </div>

        {/* Grid Layout: Information Cards + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Support Email */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Direct Support Email
                </span>
                <p className="text-base font-bold text-white mt-0.5">
                  <a
                    href="mailto:support@devassets.online"
                    className="hover:text-indigo-400 underline decoration-indigo-400/40 transition-colors"
                  >
                    support@devassets.online
                  </a>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Average response turnaround is within 24 hours.
                </p>
              </div>
            </div>

            {/* Card 2: Business Address */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Business Address
                </span>
                <p className="text-base font-semibold text-white mt-0.5">
                  Satkhira-9450, Khulna, Bangladesh
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Operated by Md Sayed (DevAssets HQ)
                </p>
              </div>
            </div>

            {/* Card 3: Business Hours */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 backdrop-blur-xl shadow-xl space-y-3">
              <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Business Hours
                </span>
                <p className="text-base font-semibold text-white mt-0.5">
                  Monday – Friday, 9:00 AM – 5:00 PM (UTC+6)
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Weekend inquiries are handled the next business morning.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </article>
  );
}
