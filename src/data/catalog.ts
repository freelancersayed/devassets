import {
  productsData,
  CatalogProduct,
  getCatalogProductBySlug,
  getAllCatalogSlugs,
} from "./products/index";

export type { CatalogProduct };
export { productsData, getCatalogProductBySlug, getAllCatalogSlugs };

export interface ToolItem {
  id: string;
  slug: string;
  title: string;
  badge: string;
  desc: string;
  icon: "FileText" | "ScanText" | "Music" | "Image";
  privacyNotice: string;
  capabilities: string[];
}

export const toolsData: ToolItem[] = [
  {
    id: "tool-1",
    slug: "pdf-to-word",
    title: "PDF to Word / Text Converter",
    badge: "Free Browser Tool",
    icon: "FileText",
    desc: "Extract formatted text and generate clean Word/TXT files directly in your browser with 100% client-side privacy.",
    privacyNotice: "100% Client-Side. Files never leave your browser.",
    capabilities: [
      "No server file upload",
      "Format-preserving extraction",
      "Instant .DOCX and .TXT download",
      "Zero file size limits",
    ],
  },
  {
    id: "tool-2",
    slug: "image-to-text",
    title: "Image to Word Formatted Converter",
    badge: "Free Browser Tool",
    icon: "ScanText",
    desc: "Instantly recognize and extract readable text from screenshots and photos with one-click copy.",
    privacyNotice: "Processed locally via client Canvas & WebAssembly OCR engine.",
    capabilities: [
      "PNG, JPG, WebP screenshot support",
      "One-click clipboard copy",
      "High-contrast text detection",
      "Zero latency — local processing",
    ],
  },
  {
    id: "tool-3",
    slug: "video-to-audio",
    title: "Video to Audio Detacher",
    badge: "Free Browser Tool",
    icon: "Music",
    desc: "Detach audio tracks from MP4, WebM, and MOV videos locally in your browser and download high-quality WAV.",
    privacyNotice: "Powered by browser Web Audio API. 100% private.",
    capabilities: [
      "Supports MP4, WebM, MOV containers",
      "Lossless WAV audio decoding",
      "Runs fully offline in your browser",
      "Instant background track extraction",
    ],
  },
  {
    id: "tool-4",
    slug: "image-studio",
    title: "Smart Image Studio",
    badge: "Free Browser Tool",
    icon: "Image",
    desc: "Compress image file sizes, adjust dimensions, and convert between PNG, JPG, and WebP instantly.",
    privacyNotice: "Client-side image buffer compression using HTML5 Canvas.",
    capabilities: [
      "Real-time compression preview",
      "Convert PNG ⇄ JPG ⇄ WebP",
      "Bulk aspect ratio resizing",
      "Zero telemetry or cloud storage",
    ],
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return toolsData.find((t) => t.slug === slug);
}

export function getAllTools(): ToolItem[] {
  return toolsData;
}
