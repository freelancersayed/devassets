import type { Metadata } from "next";
import ProSuiteClient from "./ProSuiteClient";

export const metadata: Metadata = {
  title: "DevAssets Pro Utility Suite — Enterprise Batch Pipelines & CLI Workbench",
  description:
    "Unlock offline desktop batch tool runners (.EXE & .DMG), command-line utility pipelines, unminified source code, and an unrestricted commercial license for all DevAssets browser utilities. Built for agencies and engineering teams.",
  keywords: [
    "batch image compressor",
    "offline desktop runners",
    "cli batch pipeline",
    "audio detacher",
    "tesseract wasm ocr",
    "devassets pro utility suite",
    "commercial software license",
    "white label tools",
  ],
  alternates: {
    canonical: "https://devassets.online/tools/pro-utility-suite",
  },
  openGraph: {
    title: "DevAssets Pro Utility Suite — Batch Pipelines & Commercial License",
    description:
      "Enterprise offline desktop runners, headless CLI automation scripts, unminified source code, and unlimited commercial client distribution rights.",
    url: "https://devassets.online/tools/pro-utility-suite",
    type: "website",
  },
};

export default function ProUtilitySuitePage() {
  return <ProSuiteClient />;
}
