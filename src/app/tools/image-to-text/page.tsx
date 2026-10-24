import type { Metadata } from "next";
import ImageToWordClient from "./ImageToWordClient";

export const metadata: Metadata = {
  title: "Image to Word Formatted Converter — Free Bengali & English OCR Tool",
  description:
    "Convert images, receipts, and tables into formatted, editable Word (.DOCX) files. Powered by PaddleOCR and img2table for Bengali and English text recognition.",
  keywords: [
    "image to word converter",
    "bengali ocr to word",
    "table extraction from image",
    "paddleocr bengali",
    "img2table docx",
    "image table to word converter",
    "free ocr to docx",
  ],
  alternates: {
    canonical: "https://devassets.online/tools/image-to-text",
  },
  openGraph: {
    title: "Image to Word Formatted Converter | DevAssets",
    description:
      "Convert images and tables with Bengali & English text into editable Word (.DOCX) documents.",
    url: "https://devassets.online/tools/image-to-text",
    type: "website",
  },
};

export default function ImageToWordPage() {
  return <ImageToWordClient />;
}
