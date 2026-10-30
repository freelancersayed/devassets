import type { Metadata } from "next";
import ImageStudioClient from "./ImageStudioClient";

export const metadata: Metadata = {
  title: "Smart Image Studio — Free Client-Side Image Compressor & Resizer",
  description:
    "Compress image file sizes, adjust aspect ratios (1:1, 16:9, 4:5), and convert between PNG, JPG, and WebP instantly in your browser. 100% offline, client-side, and private.",
  keywords: [
    "image compressor",
    "bulk image resizer",
    "png to webp",
    "jpg to webp",
    "aspect ratio resizer",
    "client-side image studio",
    "browser image optimizer",
    "free image compressor",
  ],
  alternates: {
    canonical: "https://devassets.online/tools/image-studio",
  },
  openGraph: {
    title: "Smart Image Studio — Free Browser Tool | DevAssets",
    description:
      "Compress images, convert formats (PNG/JPG/WebP), and bulk resize aspect ratios locally in your browser. 100% private.",
    url: "https://devassets.online/tools/image-studio",
    type: "website",
  },
};

export default function ImageStudioPage() {
  return <ImageStudioClient />;
}
