import type { Metadata } from "next";
import PdfToWordClient from "./PdfToWordClient";

export const metadata: Metadata = {
  title: "PDF to Word / Text Converter — Free Browser Tool",
  description:
    "Convert PDF files to editable Word (.DOCX) or plain text (.TXT) files instantly in your browser. 100% client-side — no file uploads, no server, zero privacy risk.",
  keywords: [
    "pdf to word converter",
    "pdf to text",
    "free pdf converter",
    "browser pdf tool",
    "client-side pdf",
    "no upload pdf converter",
  ],
  alternates: {
    canonical: "https://devassets.online/tools/pdf-to-word",
  },
  openGraph: {
    title: "PDF to Word / Text Converter — Free Browser Tool | DevAssets",
    description:
      "Convert PDF files to .DOCX or .TXT instantly in your browser. Zero uploads, 100% private.",
    url: "https://devassets.online/tools/pdf-to-word",
    type: "website",
  },
};

export default function PdfToWordPage() {
  return <PdfToWordClient />;
}
