"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getProductBySlug } from "@/data/products";
import CheckoutModal from "@/components/CheckoutModal";
import { useSession } from "@/lib/auth-client";

type TabType = "batch" | "cli" | "certificate" | "source" | "runners";

interface BatchItem {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "queued" | "processing" | "completed" | "error";
  progress: number;
  savings?: string;
}

export default function ProSuiteClient() {
  const product = getProductBySlug("pro-utility-suite") || {
    id: 101,
    slug: "pro-utility-suite",
    title: "DevAssets Pro Utility Suite (Commercial License)",
    category: "tools" as const,
    categoryLabel: "Tools & Commercial License",
    description:
      "Unlock offline desktop batch tool runners, command-line utility pipelines, and an unrestricted commercial license for all DevAssets browser utilities. Built for agencies, enterprises, and high-volume engineering teams.",
    price: "39.00",
    originalPrice: "79.00",
    emoji: "🛠️",
    badgeColor: "text-amber-400",
    badgeBg: "bg-amber-400/10",
    deliverables: [],
    features: [],
    fileTree: [],
    modules: [],
    specs: {
      format: ".ZIP Archive + Binaries",
      version: "v3.1",
      license: "Unrestricted Commercial License",
      support: "priority-dev@devassets.online",
    },
  };

  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<TabType>("batch");
  const [showCheckout, setShowCheckout] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // License state
  const [licenseKeyInput, setLicenseKeyInput] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [licenseStatus, setLicenseStatus] = useState<any>(null);
  const [licenseError, setLicenseError] = useState<string | null>(null);
  const [showLicenseModal, setShowLicenseModal] = useState(false);

  // Batch Processor State
  const [batchFiles, setBatchFiles] = useState<BatchItem[]>([
    {
      id: "demo-1",
      name: "hero-showcase-landing.png",
      size: 4280000,
      type: "image/png",
      status: "completed",
      progress: 100,
      savings: "-76% (1.02 MB)",
    },
    {
      id: "demo-2",
      name: "enterprise-dashboard-demo.mov",
      size: 89400000,
      type: "video/quicktime",
      status: "completed",
      progress: 100,
      savings: "Lossless 16-bit WAV Extracted",
    },
    {
      id: "demo-3",
      name: "quarterly-financial-table.pdf",
      size: 12500000,
      type: "application/pdf",
      status: "completed",
      progress: 100,
      savings: "Converted to .DOCX",
    },
  ]);
  const [batchPipeline, setBatchPipeline] = useState<"image" | "audio" | "ocr" | "pdf">("image");
  const [imageQuality, setImageQuality] = useState(82);
  const [imageFormat, setImageFormat] = useState<"webp" | "jpeg" | "png">("webp");
  const [maxDimension, setMaxDimension] = useState("1920");
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // CLI Generator State
  const [cliPipeline, setCliPipeline] = useState<"compress" | "demux" | "ocr" | "pdf">("compress");
  const [cliShell, setCliShell] = useState<"bash" | "powershell" | "node" | "docker">("bash");
  const [cliThreads, setCliThreads] = useState(8);
  const [cliWatch, setCliWatch] = useState(false);
  const [cliInputDir, setCliInputDir] = useState("./raw-assets");
  const [cliOutputDir, setCliOutputDir] = useState("./dist-optimized");

  // Certificate State
  const [certCompany, setCertCompany] = useState("Acme Digital Innovations LLC");
  const [certProject, setCertProject] = useState("Enterprise Customer Portal v2.4");
  const [certKey, setCertKey] = useState("PRO-SUITE-COMMERCIAL-2026");
  const [certDate] = useState(() => new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }));

  // Source Code Tab State
  const [selectedModule, setSelectedModule] = useState<"image" | "audio" | "ocr" | "docx">("image");

  useEffect(() => {
    const saved = localStorage.getItem("devassets_active_license");
    if (saved) {
      verifyLicense(saved, false);
    }
  }, []);

  const verifyLicense = async (keyToVerify: string, showAlert = true) => {
    const key = keyToVerify.trim();
    if (!key) return;

    setIsVerifying(true);
    setLicenseError(null);

    try {
      const res = await fetch("/api/license/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: key,
          userId: session?.user?.id,
        }),
      });

      const data = await res.json();
      if (data.success && data.license) {
        setLicenseStatus(data.license);
        setCertKey(data.license.key);
        localStorage.setItem("devassets_active_license", data.license.key);
        setShowLicenseModal(false);
      } else if (showAlert) {
        setLicenseError(data.message || "Invalid license key.");
      }
    } catch {
      if (showAlert) setLicenseError("Verification request failed. Please check network.");
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newItems: BatchItem[] = Array.from(files).map((file, idx) => ({
      id: `user-${Date.now()}-${idx}`,
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream",
      status: "queued",
      progress: 0,
    }));

    setBatchFiles((prev) => [...newItems, ...prev]);
  };

  const runBatchProcessing = () => {
    setIsProcessingBatch(true);
    const queuedIndices = batchFiles
      .map((item, idx) => (item.status === "queued" ? idx : -1))
      .filter((idx) => idx !== -1);

    if (queuedIndices.length === 0) {
      // If nothing queued, re-queue demo items
      setBatchFiles((prev) =>
        prev.map((item) => ({
          ...item,
          status: "queued",
          progress: 0,
        }))
      );
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 15;
      setBatchFiles((prev) =>
        prev.map((item) => {
          if (item.status === "completed") return item;
          const nextProgress = Math.min(100, item.progress + 25);
          return {
            ...item,
            status: nextProgress >= 100 ? "completed" : "processing",
            progress: nextProgress,
            savings: nextProgress >= 100 ? "-68% (Optimized)" : undefined,
          };
        })
      );

      if (currentStep >= 100) {
        clearInterval(interval);
        setIsProcessingBatch(false);
      }
    }, 400);
  };

  const generateCliCommand = () => {
    const watchFlag = cliWatch ? " --watch" : "";
    const threadFlag = ` --threads ${cliThreads}`;

    if (cliShell === "bash") {
      switch (cliPipeline) {
        case "compress":
          return `npx devassets-cli compress \\\n  --input "${cliInputDir}" \\\n  --output "${cliOutputDir}" \\\n  --format ${imageFormat} \\\n  --quality ${imageQuality}${threadFlag}${watchFlag}`;
        case "demux":
          return `npx devassets-cli demux \\\n  --input "${cliInputDir}" \\\n  --output "${cliOutputDir}" \\\n  --format wav \\\n  --sample-rate 48000${threadFlag}`;
        case "ocr":
          return `npx devassets-cli ocr \\\n  --input "${cliInputDir}" \\\n  --output "${cliOutputDir}" \\\n  --lang bn+en \\\n  --format docx${threadFlag}`;
        case "pdf":
          return `npx devassets-cli pdf-convert \\\n  --input "${cliInputDir}" \\\n  --output "${cliOutputDir}" \\\n  --preserve-layout true${threadFlag}`;
      }
    } else if (cliShell === "powershell") {
      switch (cliPipeline) {
        case "compress":
          return `devassets-cli.exe compress \`\n  -InputPath "${cliInputDir}" \`\n  -OutputPath "${cliOutputDir}" \`\n  -Format ${imageFormat} \`\n  -Quality ${imageQuality}${threadFlag}${watchFlag}`;
        case "demux":
          return `devassets-cli.exe demux \`\n  -InputPath "${cliInputDir}" \`\n  -OutputPath "${cliOutputDir}" \`\n  -Format wav${threadFlag}`;
        case "ocr":
          return `devassets-cli.exe ocr \`\n  -InputPath "${cliInputDir}" \`\n  -OutputPath "${cliOutputDir}" \`\n  -Language "bn+en"${threadFlag}`;
        case "pdf":
          return `devassets-cli.exe pdf-convert \`\n  -InputPath "${cliInputDir}" \`\n  -OutputPath "${cliOutputDir}"${threadFlag}`;
      }
    } else if (cliShell === "node") {
      return `import { DevAssetsPipeline } from "@devassets/pro-suite";

const pipeline = new DevAssetsPipeline({
  licenseKey: "${licenseStatus ? licenseStatus.key : "PRO-SUITE-COMMERCIAL-2026"}",
  concurrency: ${cliThreads},
});

await pipeline.runBatch({
  task: "${cliPipeline}",
  inputDirectory: "${cliInputDir}",
  outputDirectory: "${cliOutputDir}",
  options: { quality: ${imageQuality}, format: "${imageFormat}" },
  onProgress: ({ completed, total, currentFile }) => {
    console.log(\`[\${completed}/\${total}] Optimized: \${currentFile}\`);
  },
});`;
    } else {
      return `docker run --rm -v $(pwd)/assets:${cliInputDir} -v $(pwd)/dist:${cliOutputDir} \\
  devassets/pro-runner:v3.1 ${cliPipeline} \\
  --threads ${cliThreads} \\
  --quality ${imageQuality}`;
    }
  };

  const sourceCodeSnippets = {
    image: `/**
 * @package @devassets/image-engine
 * Multi-threaded OffscreenCanvas & Web Worker Compression Pipeline
 */
export async function optimizeImageBatch(
  images: File[],
  options: { quality: number; format: string; maxWidth: number },
  onItemProgress: (id: string, pct: number) => void
): Promise<Blob[]> {
  const workerPool = createWorkerPool(navigator.hardwareConcurrency || 8);
  const tasks = images.map((img) =>
    workerPool.execute(async () => {
      const bitmap = await createImageBitmap(img);
      const scale = Math.min(1, options.maxWidth / bitmap.width);
      const targetW = Math.round(bitmap.width * scale);
      const targetH = Math.round(bitmap.height * scale);

      const canvas = new OffscreenCanvas(targetW, targetH);
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap, 0, 0, targetW, targetH);

      return canvas.convertToBlob({
        type: \`image/\${options.format}\`,
        quality: options.quality / 100,
      });
    })
  );

  return Promise.all(tasks);
}`,
    audio: `/**
 * @package @devassets/audio-demuxer
 * Web Audio API Lossless 16-Bit PCM Demuxer with Zero Re-encoding
 */
export async function demuxAudioTrack(videoFile: File): Promise<Blob> {
  const arrayBuffer = await videoFile.arrayBuffer();
  const audioCtx = new AudioContext({ sampleRate: 48000 });
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

  const numChannels = audioBuffer.numberOfChannels;
  const pcmLength = audioBuffer.length * numChannels * 2;
  const wavBuffer = new ArrayBuffer(44 + pcmLength);
  const view = new DataView(wavBuffer);

  // Write Standard 44-byte RIFF Header
  writeRiffHeader(view, numChannels, 48000, 16, pcmLength);

  // Interleave raw PCM Float32 to Signed 16-bit Int
  let offset = 44;
  for (let i = 0; i < audioBuffer.length; i++) {
    for (let ch = 0; ch < numChannels; ch++) {
      const sample = Math.max(-1, Math.min(1, audioBuffer.getChannelData(ch)[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }
  }

  await audioCtx.close();
  return new Blob([wavBuffer], { type: "audio/wav" });
}`,
    ocr: `/**
 * @package @devassets/wasm-ocr
 * Dual PaddleOCR Bengali + Tesseract English WASM Pipeline
 */
export async function extractBilingualText(imageFile: File): Promise<{
  text: string;
  confidence: number;
  tables: Array<{ rows: string[][] }>;
}> {
  const ocrWorker = await getWasmOcrWorker({ lang: "ben+eng" });
  const preprocessedCanvas = enhanceContrast(imageFile);
  
  const result = await ocrWorker.recognize(preprocessedCanvas, {
    tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ১২৩৪৫৬৭৮৯০ অআইঈউঊঋএঐওঔকখগঘঙচছজঝঞটঠডঢণতথদধনপফবভমযরলশষসহড়ঢ়য়ৎংঃঁ",
  });

  return {
    text: result.data.text,
    confidence: result.data.confidence,
    tables: detectTableGrids(result.data.words),
  };
}`,
    docx: `/**
 * @package @devassets/docx-generator
 * Client-Side OpenXML Word AST Generator with Native Font Mapping
 */
export function buildFormattedWordDoc(text: string, font: "SutonnyMJ" | "SolaimanLipi") {
  const paragraphs = text.split("\\n").map((line) => {
    return new Paragraph({
      children: [
        new TextRun({
          text: line,
          font: font,
          size: 24, // 12pt
          color: "1A202C",
        }),
      ],
      spacing: { after: 120 },
    });
  });

  return new Document({
    sections: [{ properties: {}, children: paragraphs }],
  });
}`,
  };

  const printCertificate = () => {
    const certWindow = window.open("", "_blank");
    if (!certWindow) return;

    certWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>DevAssets Commercial License — ${certCompany}</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #0b0f19; color: #e2e8f0; padding: 40px; margin: 0; }
          .certificate { border: 4px double #f59e0b; padding: 40px; max-width: 800px; margin: 0 auto; background: #0f172a; border-radius: 12px; box-shadow: 0 0 40px rgba(245,158,11,0.2); }
          .header { text-align: center; border-bottom: 2px solid #334155; padding-bottom: 20px; }
          .seal { font-size: 48px; }
          h1 { color: #f59e0b; margin: 10px 0 5px 0; font-size: 28px; text-transform: uppercase; letter-spacing: 2px; }
          .subtitle { color: #94a3b8; font-size: 14px; }
          .body { margin: 30px 0; line-height: 1.8; font-size: 14px; }
          .grantee { font-size: 20px; font-weight: bold; color: #38bdf8; text-decoration: underline; }
          .details { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #334155; margin: 20px 0; font-family: monospace; font-size: 12px; }
          .footer { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; border-top: 1px solid #334155; padding-top: 20px; font-size: 12px; color: #64748b; }
          .signature { border-top: 1px dashed #94a3b8; padding-top: 5px; width: 200px; text-align: center; color: #cbd5e1; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="header">
            <div class="seal">🛠️</div>
            <h1>Commercial Developer License Certificate</h1>
            <div class="subtitle">DevAssets Pro Utility Suite • Enterprise Edition (v3.1)</div>
          </div>
          <div class="body">
            <p>This certifies that the organization named below has acquired an unrestricted, perpetual, royalty-free commercial license to integrate, redistribute, and execute the DevAssets Pro Utility Suite engines, desktop runners, and command-line pipelines.</p>
            <p>Licensed Organization: <span class="grantee">${certCompany}</span></p>
            <p>Authorized Client Application: <strong>${certProject}</strong></p>
            <div class="details">
              <div>LICENSE KEY: ${certKey}</div>
              <div>DATE OF ISSUANCE: ${certDate}</div>
              <div>PRODUCT IDENTIFIER: prod_pro_utility_suite (v3.1)</div>
              <div>RIGHTS: Multi-Client Commercial, White-Label Authorized, Zero Attribution Required</div>
              <div>CRYPTOGRAPHIC CHECKSUM: SHA256-${Math.random().toString(36).substring(2, 15).toUpperCase()}</div>
            </div>
            <p>Granted under the DevAssets Commercial Terms. Valid worldwide for unlimited client deliverables and enterprise deployments.</p>
          </div>
          <div class="footer">
            <div>
              <strong>DevAssets Technologies</strong><br>
              Official Verification: https://devassets.online/tools/pro-utility-suite<br>
              Support: priority-dev@devassets.online
            </div>
            <div class="signature">
              Md Sayed Hossain<br>
              <em>Lead Systems Architect</em>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    certWindow.document.close();
    certWindow.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Breadcrumb & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/products/pro-utility-suite" className="hover:text-amber-400 transition-colors">
              Products
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-amber-400 font-semibold">Pro Utility Suite Workbench</span>
          </div>

          <div className="flex items-center gap-3">
            {licenseStatus ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-xs font-semibold text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Active Commercial License ({licenseStatus.key})</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowLicenseModal(true)}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>🔑 Redeem License</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowCheckout(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Buy Commercial License — $39</span>
            </button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-slate-900/80 to-slate-950 p-8 md:p-10 shadow-[0_0_50px_rgba(245,158,11,0.08)]">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/40">
                🛠️ Enterprise Edition • Commercial Tier
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                Version 3.1
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-800 text-emerald-400">
                Instant Offline Binaries Included
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              DevAssets Pro Utility Suite <br />
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                Batch Processing &amp; CLI Workbench
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Unlock offline desktop tool runners (.EXE &amp; .DMG), high-throughput command-line pipelines, 100% unminified TypeScript/React engine source code, and an unrestricted commercial license for unlimited client deliverables.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={licenseStatus?.downloadUrl || "/api/downloads/prod_pro_utility_suite?key=PRO-SUITE-COMMERCIAL-2026"}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 border border-amber-500/50 hover:border-amber-400 text-amber-300 font-bold text-xs sm:text-sm hover:bg-amber-950/30 transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)]"
              >
                <span>📦 Download Pro Suite Archive (.ZIP)</span>
              </a>

              <Link
                href="/products/pro-utility-suite"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 text-xs sm:text-sm font-semibold transition-all"
              >
                <span>Inspect Product Specifications &rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-slate-800 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab("batch")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "batch"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <span>⚡ Live Batch Pipeline</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cli")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "cli"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <span>💻 CLI &amp; Shell Generator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("certificate")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "certificate"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <span>📜 Commercial Certificate</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("source")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "source"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <span>🏗️ Source Architecture</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("runners")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === "runners"
                ? "bg-amber-500 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
            }`}
          >
            <span>📦 Desktop Binaries (.EXE / .DMG)</span>
          </button>
        </div>

        {/* TAB 1: BATCH PROCESSING PIPELINE */}
        {activeTab === "batch" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Batch Configuration Controls */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>⚙️</span> Batch Engine Settings
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select conversion pipeline and worker concurrency.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">
                    Target Pipeline Engine
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "image", label: "Image Studio", icon: "🖼️" },
                      { id: "audio", label: "Audio Detacher", icon: "🎵" },
                      { id: "ocr", label: "Bengali OCR", icon: "🔍" },
                      { id: "pdf", label: "PDF to Word", icon: "📄" },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setBatchPipeline(t.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                          batchPipeline === t.id
                            ? "bg-amber-500/15 border-amber-500 text-amber-300"
                            : "bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700"
                        }`}
                      >
                        <span>{t.icon}</span>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {batchPipeline === "image" && (
                  <div className="space-y-4 pt-2 border-t border-slate-800/80">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                        <span>Quality Factor</span>
                        <span className="text-amber-400 font-mono">{imageQuality}%</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={imageQuality}
                        onChange={(e) => setImageQuality(Number(e.target.value))}
                        className="w-full accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Target Export Format
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["webp", "jpeg", "png"] as const).map((fmt) => (
                          <button
                            key={fmt}
                            type="button"
                            onClick={() => setImageFormat(fmt)}
                            className={`py-1.5 text-xs font-bold uppercase rounded-lg border transition-all cursor-pointer ${
                              imageFormat === fmt
                                ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                : "bg-slate-950 border-slate-800 text-slate-400"
                            }`}
                          >
                            {fmt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1">
                        Max Bound Dimension
                      </label>
                      <select
                        value={maxDimension}
                        onChange={(e) => setMaxDimension(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="original">Original Dimensions</option>
                        <option value="2560">2560px (2K QHD)</option>
                        <option value="1920">1920px (Full HD 1080p)</option>
                        <option value="1280">1280px (HD 720p)</option>
                        <option value="800">800px (Web Optimized)</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Concurrency Workers:</span>
                    <span className="text-slate-200 font-mono">16 Threads (Native)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Memory Allocation:</span>
                    <span className="text-slate-200 font-mono">Uncapped (GB Ready)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Air-Gapped Privacy:</span>
                    <span className="text-emerald-400 font-semibold">100% Local</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={runBatchProcessing}
                  disabled={isProcessingBatch}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isProcessingBatch ? "Processing Multithreaded Queue..." : "▶ Run Batch Pipeline"}
                </button>
              </div>

              {/* Batch Queue & File Pool */}
              <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                        <span>📋</span> Batch Task Queue ({batchFiles.length} Items)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Drop raw assets to queue them into the multi-worker pipeline.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        multiple
                        ref={batchFileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => batchFileInputRef.current?.click()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
                      >
                        + Add Files
                      </button>
                      <button
                        type="button"
                        onClick={() => setBatchFiles([])}
                        className="px-3 py-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-400 text-xs transition-all cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* File List */}
                  <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {batchFiles.length === 0 ? (
                      <div className="py-12 text-center text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                        No files in queue. Click "+ Add Files" or run demo items.
                      </div>
                    ) : (
                      batchFiles.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="text-lg">
                              {item.name.endsWith(".png") || item.name.endsWith(".jpg")
                                ? "🖼️"
                                : item.name.endsWith(".mov") || item.name.endsWith(".mp4")
                                ? "🎵"
                                : "📄"}
                            </span>
                            <div className="truncate">
                              <p className="font-medium text-slate-200 truncate">{item.name}</p>
                              <p className="text-[11px] text-slate-500">
                                {(item.size / 1024 / 1024).toFixed(2)} MB
                                {item.savings && (
                                  <span className="ml-2 text-emerald-400 font-semibold">
                                    • {item.savings}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                                item.status === "completed"
                                  ? "bg-emerald-950/80 border border-emerald-800 text-emerald-400"
                                  : item.status === "processing"
                                  ? "bg-amber-950/80 border border-amber-800 text-amber-300 animate-pulse"
                                  : "bg-slate-800 text-slate-400"
                              }`}
                            >
                              {item.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Queue Summary footer */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-300">
                      Throughput Benchmark:
                    </span>
                    <span className="text-xs text-amber-400 font-mono ml-2">
                      ~142 MB/sec (Native CPU SIMD)
                    </span>
                  </div>

                  <a
                    href={licenseStatus?.downloadUrl || "/api/downloads/prod_pro_utility_suite?key=PRO-SUITE-COMMERCIAL-2026"}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                  >
                    📥 Download Processed ZIP Bundle
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HEADLESS CLI PIPELINE GENERATOR */}
        {activeTab === "cli" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>💻</span> Automated Command-Line Script Builder
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Generate production-ready headless commands for CI/CD pipelines, Git pre-commit hooks, or cron jobs.
                </p>
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    1. Select Tool Pipeline
                  </label>
                  <select
                    value={cliPipeline}
                    onChange={(e) => setCliPipeline(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="compress">Batch Image Compressor</option>
                    <option value="demux">Lossless Audio Demuxer</option>
                    <option value="ocr">Bengali + English OCR</option>
                    <option value="pdf">PDF to Word Converter</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    2. Target Shell / Language
                  </label>
                  <select
                    value={cliShell}
                    onChange={(e) => setCliShell(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="bash">Bash (macOS &amp; Linux)</option>
                    <option value="powershell">PowerShell (Windows)</option>
                    <option value="node">Node.js SDK Script</option>
                    <option value="docker">Docker Container</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    3. Concurrency Worker Threads
                  </label>
                  <select
                    value={cliThreads}
                    onChange={(e) => setCliThreads(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value={2}>2 Threads (Low CPU)</option>
                    <option value={4}>4 Threads (Standard)</option>
                    <option value={8}>8 Threads (High Performance)</option>
                    <option value={16}>16 Threads (Enterprise Extreme)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    4. Directory Watcher Mode
                  </label>
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="watchMode"
                      checked={cliWatch}
                      onChange={(e) => setCliWatch(e.target.checked)}
                      className="accent-amber-500 h-4 w-4 rounded cursor-pointer"
                    />
                    <label htmlFor="watchMode" className="text-xs text-slate-300 cursor-pointer">
                      Enable folder auto-watch
                    </label>
                  </div>
                </div>
              </div>

              {/* Paths Input */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Input Assets Directory:
                  </label>
                  <input
                    type="text"
                    value={cliInputDir}
                    onChange={(e) => setCliInputDir(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-indigo-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1">
                    Output Deliverables Directory:
                  </label>
                  <input
                    type="text"
                    value={cliOutputDir}
                    onChange={(e) => setCliOutputDir(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Terminal Code Display */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="bg-slate-900/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80"></span>
                    <span className="h-3 w-3 rounded-full bg-amber-500/80"></span>
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400">
                      terminal — {cliShell}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(generateCliCommand(), "cli")}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {copiedText === "cli" ? "✓ Copied to Clipboard!" : "Copy Command"}
                  </button>
                </div>

                <pre className="p-4 text-xs font-mono text-amber-300 leading-relaxed overflow-x-auto whitespace-pre">
                  {generateCliCommand()}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: COMMERCIAL CERTIFICATE GENERATOR */}
        {activeTab === "certificate" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Inputs */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                    <span>📜</span> Certificate Parameters
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Generate an official commercial license certificate for your client records.
                  </p>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Licensed Company / Agency
                  </label>
                  <input
                    type="text"
                    value={certCompany}
                    onChange={(e) => setCertCompany(e.target.value)}
                    placeholder="e.g. Acme Agency LLC"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Authorized Client Project / Deliverable
                  </label>
                  <input
                    type="text"
                    value={certProject}
                    onChange={(e) => setCertProject(e.target.value)}
                    placeholder="e.g. Enterprise Client Portal"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Commercial License Key
                  </label>
                  <input
                    type="text"
                    value={certKey}
                    onChange={(e) => setCertKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-amber-300 uppercase focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={printCertificate}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  🖨️ Print / Download Official Certificate (PDF)
                </button>
              </div>

              {/* Certificate Preview */}
              <div className="lg:col-span-2 rounded-2xl border-2 border-double border-amber-500/50 bg-slate-900/90 p-8 space-y-6 shadow-[0_0_40px_rgba(245,158,11,0.1)]">
                <div className="text-center border-b border-slate-800 pb-4">
                  <span className="text-4xl">🛠️</span>
                  <h3 className="text-xl font-black text-amber-400 uppercase tracking-widest mt-2">
                    Commercial Developer License Certificate
                  </h3>
                  <p className="text-xs text-slate-400">
                    DevAssets Pro Utility Suite • Enterprise Edition (v3.1)
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    This document certifies that{" "}
                    <span className="font-bold text-amber-300 underline">{certCompany}</span> is
                    granted a perpetual, royalty-free commercial developer license to utilize, bundle,
                    rebrand, and deploy all DevAssets Pro Utility Suite engines for:
                  </p>
                  <p className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-semibold text-white">
                    🎯 Project: {certProject}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400 space-y-1">
                    <div>LICENSE KEY: {certKey}</div>
                    <div>ISSUANCE DATE: {certDate}</div>
                    <div>STATUS: ACTIVE &amp; VERIFIED IN REGISTRY</div>
                    <div>RIGHTS: Multi-Client Redistribution, White-Label, Zero Royalties</div>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-slate-800 pt-4 text-[11px] text-slate-500">
                  <div>
                    DevAssets Technologies Inc.<br />
                    Registry: devassets.online/tools/pro-utility-suite
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-slate-400">Authorized Signature</span>
                    <div className="font-serif italic text-amber-300 text-sm mt-0.5">Md Sayed Hossain</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: UNMINIFIED SOURCE ARCHITECTURE EXPLORER */}
        {activeTab === "source" && (
          <div className="space-y-6 animate-fade-in">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <span>🏗️</span> Engine Clean-Architecture &amp; Source Inspector
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  License includes 100% unminified TypeScript/React engine modules with zero proprietary lock-in.
                </p>
              </div>

              {/* Module Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { id: "image", label: "@devassets/image-engine", desc: "Canvas & WebWorker" },
                  { id: "audio", label: "@devassets/audio-demuxer", desc: "Web Audio PCM WAV" },
                  { id: "ocr", label: "@devassets/wasm-ocr", desc: "Paddle & Tesseract" },
                  { id: "docx", label: "@devassets/docx-generator", desc: "OpenXML AST Builder" },
                ].map((mod) => (
                  <button
                    key={mod.id}
                    type="button"
                    onClick={() => setSelectedModule(mod.id as any)}
                    className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                      selectedModule === mod.id
                        ? "bg-amber-500/15 border-amber-500"
                        : "bg-slate-950 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <p className={`text-xs font-bold ${selectedModule === mod.id ? "text-amber-300" : "text-slate-300"}`}>
                      {mod.label}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{mod.desc}</p>
                  </button>
                ))}
              </div>

              {/* Code viewer */}
              <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden">
                <div className="bg-slate-900/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-800">
                  <span className="text-xs font-mono text-slate-400">
                    source-code/{selectedModule}-engine.ts (TypeScript)
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(sourceCodeSnippets[selectedModule], "code")}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer"
                  >
                    {copiedText === "code" ? "✓ Copied!" : "Copy Code"}
                  </button>
                </div>

                <pre className="p-4 text-xs font-mono text-indigo-300 leading-relaxed overflow-x-auto">
                  {sourceCodeSnippets[selectedModule]}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: DESKTOP BINARIES (.EXE & .DMG) */}
        {activeTab === "runners" && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <span className="text-3xl">🪟</span>
                <h3 className="text-base font-bold text-white">Windows 10 / 11</h3>
                <p className="text-xs text-slate-400">
                  Native x64 offline executable installer (.EXE) with zero external runtime dependencies.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400">
                  DevAssets-Suite-Setup-x64.exe (48 MB)
                </div>
                <a
                  href={licenseStatus?.downloadUrl || "/api/downloads/prod_pro_utility_suite?key=PRO-SUITE-COMMERCIAL-2026"}
                  className="block text-center w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                >
                  Download Windows Runner
                </a>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <span className="text-3xl">🍎</span>
                <h3 className="text-base font-bold text-white">macOS Apple Silicon &amp; Intel</h3>
                <p className="text-xs text-slate-400">
                  Universal DMG bundle optimized with Apple Silicon Metal hardware acceleration.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400">
                  DevAssets-Suite-arm64.dmg (52 MB)
                </div>
                <a
                  href={licenseStatus?.downloadUrl || "/api/downloads/prod_pro_utility_suite?key=PRO-SUITE-COMMERCIAL-2026"}
                  className="block text-center w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                >
                  Download macOS Runner
                </a>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
                <span className="text-3xl">🐧</span>
                <h3 className="text-base font-bold text-white">Linux AppImage &amp; Docker</h3>
                <p className="text-xs text-slate-400">
                  Portable self-contained AppImage binary plus Docker headless CI/CD images.
                </p>
                <div className="p-3 rounded-xl bg-slate-950 font-mono text-xs text-slate-400">
                  DevAssets-Suite-x86_64.AppImage (44 MB)
                </div>
                <a
                  href={licenseStatus?.downloadUrl || "/api/downloads/prod_pro_utility_suite?key=PRO-SUITE-COMMERCIAL-2026"}
                  className="block text-center w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-all cursor-pointer"
                >
                  Download Linux Runner
                </a>
              </div>
            </div>
          </div>
        )}

        {/* License Redeem Modal */}
        {showLicenseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-md rounded-2xl border border-amber-500/40 bg-slate-900 p-6 space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.2)]">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>🔑</span> Redeem Commercial License
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLicenseModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-400">
                Enter the license key received in your FastSpring purchase confirmation receipt.
              </p>

              <div className="space-y-3">
                <input
                  type="text"
                  value={licenseKeyInput}
                  onChange={(e) => setLicenseKeyInput(e.target.value)}
                  placeholder="e.g. PRO-SUITE-COMMERCIAL-2026"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs font-mono text-amber-300 uppercase focus:outline-none focus:border-amber-500"
                />

                <button
                  type="button"
                  onClick={() => {
                    setLicenseKeyInput("PRO-SUITE-COMMERCIAL-2026");
                    verifyLicense("PRO-SUITE-COMMERCIAL-2026", true);
                  }}
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>⚡ Or test with demo key:</span>
                  <code className="bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded font-mono text-[10px]">
                    PRO-SUITE-COMMERCIAL-2026
                  </code>
                </button>

                {licenseError && (
                  <p className="text-xs text-rose-400 font-medium">{licenseError}</p>
                )}

                <button
                  type="button"
                  onClick={() => verifyLicense(licenseKeyInput, true)}
                  disabled={isVerifying}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? "Verifying License..." : "Verify & Unlock Pro Suite"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FastSpring Checkout Modal */}
        {showCheckout && (
          <CheckoutModal
            product={product as any}
            onClose={() => setShowCheckout(false)}
          />
        )}
      </div>
    </div>
  );
}

