import type { Metadata } from "next";
import { productsData } from "@/data/products";
import ProductsClient from "./ProductsClient";

export const metadata: Metadata = {
  title: "All Products & Developer Assets | DevAssets",
  description:
    "Explore production-grade developer utilities, offline batch runners, AI prompt libraries, and complete starter kits with instant commercial license and fulfillment.",
  alternates: {
    canonical: "https://devassets.online/products",
  },
  openGraph: {
    title: "All Products & Developer Assets | DevAssets",
    description:
      "Explore production-grade developer utilities, offline batch runners, AI prompt libraries, and complete starter kits with instant commercial license.",
    url: "https://devassets.online/products",
    type: "website",
  },
};

export default function ProductsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "DevAssets Digital Catalog",
    description: "Production-grade developer tools, AI prompts, and software kits.",
    itemListElement: productsData.map((prod, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: prod.title,
        description: prod.description,
        url: `https://devassets.online/products/${prod.slug}`,
        offers: {
          "@type": "Offer",
          price: prod.price,
          priceCurrency: "USD",
        },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsClient initialProducts={productsData} />
    </>
  );
}

