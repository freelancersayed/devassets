import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug, getAllSlugs } from "@/data/products";
import ProductPageClient from "./ProductPageClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    alternates: {
      canonical: `https://devassets.online/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.title} | DevAssets`,
      description: product.description,
      url: `https://devassets.online/products/${product.slug}`,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Organization",
      name: "DevAssets (Operated by Md Sayed)",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://devassets.online/products/${product.slug}`,
      priceValidUntil: "2027-12-31",
    },
  };

  return (
    <article className="min-h-[75vh] bg-slate-950 px-6 py-16 text-slate-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <Link
            href="/#products"
            className="hover:text-indigo-400 transition-colors"
          >
            Products
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">{product.title}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl">{product.emoji}</span>
          <div>
            <span className="inline-block rounded-full bg-indigo-950/60 border border-indigo-900/50 px-3 py-1 text-xs font-bold uppercase text-indigo-400 mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-50">
              {product.title}
            </h1>
            <p className="mt-3 text-base text-slate-400 leading-relaxed max-w-2xl">
              {product.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: File Tree + Modules */}
          <div className="lg:col-span-2 space-y-8">
            {/* File Tree */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>📁</span> Package File Tree
              </h2>
              <pre className="text-xs text-slate-400 leading-relaxed font-mono bg-slate-950 rounded-xl p-4 border border-slate-800/60 overflow-x-auto">
                {product.fileTree.join("\n")}
              </pre>
            </div>

            {/* Module Breakdown */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>📖</span> Module / Chapter Breakdown
              </h2>
              <ol className="space-y-3">
                {product.modules.map((mod, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-950/60 border border-indigo-900/50 text-xs font-bold text-indigo-400 shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-slate-300">{mod}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Deliverables */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>📦</span> What You Get
              </h2>
              <ul className="space-y-3">
                {product.deliverables.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-slate-300"
                  >
                    <svg
                      className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: Specs + Buy */}
          <div className="space-y-6">
            {/* Technical Specifications */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h2 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <span>⚙️</span> Technical Specifications
              </h2>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                    Format
                  </dt>
                  <dd className="text-slate-300 mt-0.5">
                    {product.specs.format}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                    Version
                  </dt>
                  <dd className="text-slate-300 mt-0.5">
                    {product.specs.version}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                    License
                  </dt>
                  <dd className="text-slate-300 mt-0.5">
                    {product.specs.license}
                  </dd>
                </div>
                <div>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                    Support
                  </dt>
                  <dd className="mt-0.5">
                    <a
                      href={`mailto:${product.specs.support}`}
                      className="text-indigo-400 hover:underline"
                    >
                      {product.specs.support}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Purchase Card */}
            <div className="rounded-2xl border border-indigo-900/50 bg-gradient-to-b from-slate-900 to-slate-900/70 p-6 sticky top-24">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-black text-slate-50">
                  ${product.price}
                </span>
                <span className="text-sm font-medium line-through text-slate-500">
                  ${product.originalPrice}
                </span>
                <span className="text-xs font-semibold text-indigo-400">
                  USD
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-6">
                One-time purchase • Instant access • Free minor updates
              </p>

              <ProductPageClient product={product} />

              <p className="text-center text-[10px] text-slate-600 mt-3">
                🔒 256-bit SSL encrypted • Secure payment processing
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
