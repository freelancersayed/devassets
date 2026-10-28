import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPromptBySlug, getRelatedPrompts } from "@/lib/prompts";
import PromptDetailView from "@/components/prompts/PromptDetailView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) return {};

  return {
    title: `${prompt.title} — AI Prompt | DevAssets`,
    description: prompt.description,
    alternates: {
      canonical: `https://devassets.online/prompts/${prompt.slug}`,
    },
    openGraph: {
      title: `${prompt.title} | DevAssets AI Prompt Library`,
      description: prompt.description,
      url: `https://devassets.online/prompts/${prompt.slug}`,
      type: "article",
      images: [
        {
          url: prompt.image,
          width: 1200,
          height: 630,
          alt: prompt.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: prompt.title,
      description: prompt.description,
      images: [prompt.image],
    },
  };
}

export default async function PromptDetailPage({ params }: Props) {
  const { slug } = await params;
  const prompt = await getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = await getRelatedPrompts(
    slug,
    prompt.category as string,
    4
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: prompt.title,
    description: prompt.description,
    category: prompt.category,
    image: prompt.image,
    brand: {
      "@type": "Organization",
      name: "DevAssets",
    },
    offers: {
      "@type": "Offer",
      price: prompt.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `https://devassets.online/prompts/${prompt.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PromptDetailView prompt={prompt} relatedPrompts={relatedPrompts} />
    </>
  );
}
