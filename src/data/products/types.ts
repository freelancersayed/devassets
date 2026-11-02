export interface CatalogProduct {
  id: number;
  slug: string;
  title: string;
  category: "tools" | "prompts" | "pdf" | "bundle";
  categoryLabel: string;
  description: string;
  price: string;
  originalPrice: string;
  emoji: string;
  badgeColor: string;
  badgeBg: string;
  deliverables: string[];
  features: string[];
  fileTree: string[];
  modules: string[];
  specs: {
    format: string;
    version: string;
    license: string;
    support: string;
  };
  fastspringProductId?: string;
  accessUrl?: string;
}

