"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import CheckoutModal from "./CheckoutModal";
import type { Product } from "@/data/products";

export default function ProductCatalog() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <>
      <section
        id="products"
        aria-labelledby="products-heading"
        className="py-20 bg-slate-950 transition-colors duration-300 scroll-mt-24"
      >
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide mb-3">
              📦 Developer Toolkits &amp; Code Kits
            </span>
            <h2
              id="products-heading"
              className="text-3xl font-extrabold text-slate-50 sm:text-4xl"
            >
              Our Production-Ready Developer Kits
            </h2>
            <p className="mt-4 text-slate-400 text-sm">
              Each kit includes source code, documentation, and a commercial
              license. Select a product to view full details or purchase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product) => (
              <article
                key={product.id}
                itemScope
                itemType="https://schema.org/Product"
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-xl transition-all hover:border-slate-700/80 hover:shadow-indigo-900/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block rounded-full bg-indigo-950/60 border border-indigo-900/50 px-3 py-1 text-xs font-bold uppercase text-indigo-400">
                      {product.category.split("+")[0].trim()}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Instant Access
                    </span>
                  </div>

                  {/* Emoji icon */}
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800/60 mb-4 text-4xl">
                    {product.emoji}
                  </div>

                  <h3 itemProp="name" className="text-xl font-bold text-slate-50">
                    {product.title}
                  </h3>

                  <p
                    itemProp="description"
                    className="mt-3 text-sm text-slate-400 leading-relaxed line-clamp-3"
                  >
                    {product.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2.5 text-xs text-slate-300"
                      >
                        <svg
                          className="h-4 w-4 text-indigo-400 shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="mt-8 pt-6 border-t border-slate-800"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <meta itemProp="priceCurrency" content="USD" />
                  <meta itemProp="price" content={product.price} />
                  <link
                    itemProp="availability"
                    href="https://schema.org/InStock"
                  />

                  <div className="flex items-baseline gap-2 mb-4">
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

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      aria-label={`Buy ${product.title} for $${product.price} USD`}
                      className="block w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
                    >
                      Buy Now
                    </button>
                    <Link
                      href={`/products/${product.slug}`}
                      className="block w-full rounded-xl bg-slate-800/80 hover:bg-slate-800 py-3 text-center text-sm font-semibold text-slate-300 border border-slate-700/50 transition-all duration-200"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
