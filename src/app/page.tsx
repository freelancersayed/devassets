import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Code-split below-the-fold sections for lightning-fast First Contentful Paint (FCP)
const ToolsSection = dynamic(() => import("@/components/ToolsSection"), {
  loading: () => <div className="min-h-[400px] bg-slate-950" />,
});

const ProductCatalog = dynamic(() => import("@/components/ProductCatalog"), {
  loading: () => <div className="min-h-[500px] bg-[#070B14]" />,
});

const WhyChooseUs = dynamic(() => import("@/components/WhyChooseUs"), {
  loading: () => <div className="min-h-[300px] bg-slate-950" />,
});

const FAQ = dynamic(() => import("@/components/FAQ"), {
  loading: () => <div className="min-h-[300px] bg-slate-950" />,
});

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section (Immediate Critical Paint) */}
      <Hero />

      {/* 2. Free Digital Web Utilities (id="tools") */}
      <ToolsSection />

      {/* 3. Filterable Digital Store (id="products") */}
      <ProductCatalog />

      {/* 4. Why Choose DevAssets (id="features") */}
      <WhyChooseUs />

      {/* 5. Frequently Asked Questions (id="faq") */}
      <FAQ />
    </>
  );
}
