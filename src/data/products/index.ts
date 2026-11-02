import { CatalogProduct } from "./types";
import { proUtilitySuiteProduct } from "./pro-utility-suite";
import { fullstackArchitecturePromptsProduct } from "./fullstack-system-architecture-prompts";
import { uiUxProductDesignPromptsProduct } from "./ui-ux-product-design-prompts";
import { technicalSeoPromptsProduct } from "./technical-seo-cwv-prompts";
import { javascriptPatternsProduct } from "./javascript-patterns-toolkit";
import { reactEnterpriseProduct } from "./react-enterprise-starter-kit";
import { technicalSeoToolkitProduct } from "./technical-seo-cwv-toolkit";
import {
  starterSingleAssetProduct,
  allAccessPass30DayProduct,
  allInOneLifetimeBundleProduct,
} from "./bundles";

export * from "./types";
export {
  proUtilitySuiteProduct,
  fullstackArchitecturePromptsProduct,
  uiUxProductDesignPromptsProduct,
  technicalSeoPromptsProduct,
  javascriptPatternsProduct,
  reactEnterpriseProduct,
  technicalSeoToolkitProduct,
  starterSingleAssetProduct,
  allAccessPass30DayProduct,
  allInOneLifetimeBundleProduct,
};

export const productsData: CatalogProduct[] = [
  // Tools & Commercial License
  proUtilitySuiteProduct,

  // AI Engineering & Design Prompts
  fullstackArchitecturePromptsProduct,
  uiUxProductDesignPromptsProduct,
  technicalSeoPromptsProduct,

  // PDF Masterclasses & Starter Codebases
  javascriptPatternsProduct,
  reactEnterpriseProduct,
  technicalSeoToolkitProduct,

  // Access Passes & Lifetime Bundles
  starterSingleAssetProduct,
  allAccessPass30DayProduct,
  allInOneLifetimeBundleProduct,
];

export type Product = CatalogProduct;
export const products: Product[] = productsData;

export function getProductBySlug(slug: string): Product | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return productsData.map((p) => p.slug);
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getAllCatalogSlugs(): string[] {
  return productsData.map((p) => p.slug);
}

