import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://devassets.online"),
  title: {
    default:
      "DevAssets — Production-Ready Code Templates, Architecture Kits & Developer Guides",
    template: "%s | DevAssets",
  },
  description:
    "Accelerate your engineering workflow with production-ready JavaScript and React starter kits, reusable code patterns, technical SEO auditing tools, and comprehensive implementation manuals.",
  keywords: [
    "javascript patterns toolkit",
    "react enterprise starter kit",
    "technical seo toolkit",
    "code templates",
    "developer guides",
    "devassets",
  ],
  authors: [{ name: "DevAssets (Operated by Md Sayed)" }],
  publisher: "DevAssets",
  applicationName: "DevAssets",
  formatDetection: { telephone: false },
  openGraph: {
    siteName: "DevAssets",
    type: "website",
    title:
      "DevAssets — Production-Ready Code Templates, Architecture Kits & Developer Guides",
    description:
      "Accelerate your engineering workflow with production-ready JavaScript and React starter kits, reusable code patterns, technical SEO auditing tools, and comprehensive implementation manuals.",
    url: "https://devassets.online/",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevAssets — Production-Ready Code Kits & Developer Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devassets",
    creator: "@devassets",
    title:
      "DevAssets — Production-Ready Code Templates & Developer Guides",
    description:
      "Accelerate your engineering workflow with production-ready JavaScript and React starter kits, technical SEO auditing tools, and implementation manuals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://devassets.online/",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "theme-color": "#020617",
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth dark`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://devassets.online/#organization",
                  name: "DevAssets (Operated by Md Sayed)",
                  url: "https://devassets.online/",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://devassets.online/logo.png",
                    caption: "DevAssets Logo",
                  },
                  email: "support@devassets.online",
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      email: "support@devassets.online",
                      contactType: "customer support",
                      availableLanguage: ["English", "Bengali"],
                    },
                  ],
                  sameAs: [
                    "https://www.facebook.com/groups/1110390561349873",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Satkhira",
                    postalCode: "9450",
                    addressRegion: "Khulna",
                    addressCountry: "BD",
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": "https://devassets.online/#website",
                  url: "https://devassets.online/",
                  name: "DevAssets",
                  description:
                    "Production-Ready Code Templates, Architecture Kits & Developer Guides",
                  publisher: {
                    "@id": "https://devassets.online/#organization",
                  },
                  inLanguage: "en-US",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-50 antialiased font-[family-name:var(--font-inter)]">
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
