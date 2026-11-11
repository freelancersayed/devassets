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
    <article className="min-h-screen bg-[#09090B] text-[#A1A1AA] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 flex items-center gap-2 text-xs font-mono text-[#71717A]"
        >
          <Link href="/" className="hover:text-[#10B981] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#FAFAFA] font-medium">Contact</span>
        </nav>

        {/* Section Header */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-mono text-[#10B981] bg-[#18181B] border border-[#27272A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#FAFAFA] tracking-tight">
            Contact Our Engineering &amp; Support Team
          </h1>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Have questions about our digital code kits, browser utilities, or custom licenses? Reach out and we will get back to you promptly.
          </p>
        </div>

        {/* Grid Layout: Information Cards + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Support Email */}
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#10B981]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                  Direct Support Email
                </span>
                <p className="text-base font-bold text-[#FAFAFA] mt-0.5 font-mono">
                  <a
                    href="mailto:support@devassets.online"
                    className="hover:text-[#10B981] underline decoration-[#27272A] hover:decoration-[#10B981] transition-colors"
                  >
                    support@devassets.online
                  </a>
                </p>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Average response turnaround is within 24 hours.
                </p>
              </div>
            </div>

            {/* Card 2: Business Address */}
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#10B981]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                  Business Address
                </span>
                <p className="text-base font-semibold text-[#FAFAFA] mt-0.5">
                  Satkhira-9450, Khulna, Bangladesh
                </p>
                <p className="text-xs text-[#A1A1AA] mt-1">
                  Operated by Md Sayed (DevAssets HQ)
                </p>
              </div>
            </div>

            {/* Card 3: Business Hours */}
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#10B981]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#71717A]">
                  Business Hours
                </span>
                <p className="text-base font-semibold text-[#FAFAFA] mt-0.5 font-mono">
                  Monday – Friday, 9:00 AM – 5:00 PM (UTC+6)
                </p>
                <p className="text-xs text-[#A1A1AA] mt-1">
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
