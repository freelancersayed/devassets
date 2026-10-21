import { productsData, type CatalogProduct } from "./catalog";

export type Product = CatalogProduct;

export const products: Product[] = productsData;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
