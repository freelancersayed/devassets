import Hero from "@/components/Hero";
import ToolsSection from "@/components/ToolsSection";
import ProductCatalog from "@/components/ProductCatalog";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
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
