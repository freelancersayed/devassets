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
    title: "Image to Text OCR Extractor",
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

export const productsData: CatalogProduct[] = [
  // Category: tools
  {
    id: 101,
    slug: "pro-utility-suite",
    title: "DevAssets Pro Utility Suite (Commercial License)",
    category: "tools",
    categoryLabel: "Tools & Commercial License",
    description:
      "Unlock offline desktop batch tool runners, command-line utility pipelines, and an unrestricted commercial license for all DevAssets browser utilities. Built for agencies, enterprises, and high-volume engineering teams.",
    price: "39.00",
    originalPrice: "79.00",
    emoji: "🛠️",
    badgeColor: "text-amber-400",
    badgeBg: "bg-amber-400/10",
    deliverables: [
      "Offline Batch Tool Runners (.EXE & .DMG)",
      "Full Unminified Source Code License",
      "Priority 1-on-1 Developer Email Support",
      "Commercial Multi-Project Redistribution Rights",
    ],
    features: [
      "Batch PDF, OCR, Image, and Audio processors",
      "Full TypeScript / React source code included",
      "Commercial license for infinite client deliverables",
    ],
    fileTree: [
      "devassets-pro-utility-suite/",
      "├── runners/",
      "│   ├── pdf-word-batch.exe",
      "│   ├── ocr-extractor.exe",
      "│   └── audio-detacher.exe",
      "├── src/",
      "│   ├── core-converters/",
      "│   ├── audio-engine/",
      "│   └── ocr-wasm-pipeline/",
      "├── docs/",
      "│   └── commercial-integration-guide.pdf",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Module 1: Automated Batch Processing with CLI Pipelines",
      "Module 2: Client-Side Web Worker Architecture",
      "Module 3: High-Performance Canvas Image Resizing",
      "Module 4: Enterprise Audio Buffer Demuxing (WAV / MP3)",
      "Module 5: Commercial Licensing & White-Label Redistribution",
    ],
    specs: {
      format: ".ZIP Archive + Binaries + Docs",
      version: "v3.1",
      license: "Unrestricted Commercial Developer License",
      support: "support@devassets.online",
    },
  },

  // Category: prompts
  {
    id: 201,
    slug: "fullstack-system-architecture-prompts",
    title: "Full-Stack Dev & System Architecture Prompts",
    category: "prompts",
    categoryLabel: "AI Engineering Prompts",
    description:
      "200+ battle-tested prompts engineered for Claude 3.7/Sonnet, GPT-4o, and DeepSeek. Accelerate Next.js App Router architecture, automate API refactoring, build resilient database schemas, and generate complete unit test suites.",
    price: "19.00",
    originalPrice: "39.00",
    emoji: "🤖",
    badgeColor: "text-purple-400",
    badgeBg: "bg-purple-400/10",
    deliverables: [
      "200+ Curated Prompts for Next.js, React & Node.js",
      "API Refactoring, Security & Database Optimization",
      "Automated Unit & E2E Test Suite Generators",
      "Delivered in JSON + Markdown + Printable PDF",
    ],
    features: [
      "200+ system architecture prompts",
      "Ready-to-use prompt matrices in JSON & Markdown",
      "Tested with Claude, GPT-4, and DeepSeek",
    ],
    fileTree: [
      "fullstack-architecture-prompts/",
      "├── prompts/",
      "│   ├── nextjs-app-router/",
      "│   ├── microservices-api/",
      "│   ├── database-indexing/",
      "│   ├── unit-testing-jest/",
      "│   └── security-hardening/",
      "├── catalog.json",
      "├── prompt-playbook.md",
      "├── docs/",
      "│   └── architecture-prompts-guide.pdf",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Section 1: Next.js 15 & Server Action Engineering Prompts",
      "Section 2: High-Concurrency PostgreSQL & Prisma Optimization",
      "Section 3: Defensive TypeScript Types & Strict Schema Validators",
      "Section 4: Microservices Event Bus & Redis Caching Directives",
      "Section 5: Automated Jest & Playwright Test Generators",
    ],
    specs: {
      format: "JSON + Markdown + PDF Guide",
      version: "v2026.1",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },
  {
    id: 202,
    slug: "ui-ux-product-design-prompts",
    title: "UI/UX & Product Design Prompt Library",
    category: "prompts",
    categoryLabel: "Design System Prompts",
    description:
      "150+ structured prompts for UI/UX designers and frontend developers. Generate scalable design tokens, create cohesive dark/light mode palettes, draft high-fidelity wireframe specs, and run rigorous WCAG 2.2 accessibility reviews.",
    price: "15.00",
    originalPrice: "29.00",
    emoji: "🎨",
    badgeColor: "text-pink-400",
    badgeBg: "bg-pink-400/10",
    deliverables: [
      "150+ Design System & Component Token Prompts",
      "Figma-to-Code & Micro-Interaction Directives",
      "WCAG 2.2 AA Accessibility Audit Directives",
      "Instant Download (.ZIP with Markdown & PDF)",
    ],
    features: [
      "150+ UI/UX design prompts",
      "WCAG accessibility testing frameworks",
      "Micro-interaction and token generators",
    ],
    fileTree: [
      "ui-ux-design-prompts/",
      "├── design-tokens/",
      "├── component-specs/",
      "├── accessibility-wcag/",
      "├── interactive-states/",
      "├── tokens.json",
      "├── docs/",
      "│   └── design-system-prompt-guide.pdf",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Section 1: Modern Color Palette & HSL Token Generation",
      "Section 2: Accessible Typography Hierarchy & Fluid Type Scales",
      "Section 3: Micro-Animations & Interactive Hover State Directives",
      "Section 4: WCAG 2.2 AA Compliance Checklists & Prompts",
      "Section 5: Complex Dashboard & Mobile UI Layout Blueprints",
    ],
    specs: {
      format: "JSON + Markdown + PDF Guide",
      version: "v2.0",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },
  {
    id: 203,
    slug: "technical-seo-cwv-prompts",
    title: "Technical SEO & Core Web Vitals Prompt System",
    category: "prompts",
    categoryLabel: "SEO Prompt Engineering",
    description:
      "120+ structured prompts for technical SEO engineers and web performance specialists. Generate nested JSON-LD schema graphs, optimize crawl budgets, analyze INP/LCP layout bottlenecks, and build authoritative topic clusters.",
    price: "19.00",
    originalPrice: "39.00",
    emoji: "📈",
    badgeColor: "text-cyan-400",
    badgeBg: "bg-cyan-400/10",
    deliverables: [
      "120+ Structured Prompts for JSON-LD & OpenGraph",
      "Metadata Clustering & Content Silhouette Matrices",
      "Technical Audit & Core Web Vitals Diagnostic Workflows",
      "Immediate Multi-Format Download (JSON, MD, PDF)",
    ],
    features: [
      "120+ technical SEO prompts",
      "Core Web Vitals diagnostic trees",
      "Automated schema graph builders",
    ],
    fileTree: [
      "seo-cwv-prompts/",
      "├── schema-generators/",
      "├── cwv-diagnostics/",
      "├── crawl-budget-rules/",
      "├── topical-clustering/",
      "├── prompts-export.json",
      "├── docs/",
      "│   └── seo-prompt-playbook.pdf",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Section 1: Nested JSON-LD Schema (Organization, Product, FAQ, Article)",
      "Section 2: INP & LCP Diagnostic Decision Trees",
      "Section 3: Crawl Efficiency, Sitemap Hierarchy & Robots.txt Directives",
      "Section 4: Programmatic SEO & Content Matrix Formulation",
    ],
    specs: {
      format: "JSON + Markdown + PDF Guide",
      version: "v2026.1",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },

  // Category: pdf (Masterclasses & Starter Kits)
  {
    id: 301,
    slug: "javascript-patterns-toolkit",
    title: "Advanced JavaScript Patterns & Engine Toolkit",
    category: "pdf",
    categoryLabel: "Code Library + PDF Manual",
    description:
      "Deep dive into JS engine internals, closures, async/await mastery, and 50+ production-ready utility patterns. Includes a comprehensive Jest test suite, benchmarking configs, and an 85-page technical reference manual covering every module in detail.",
    price: "29.00",
    originalPrice: "59.00",
    emoji: "💛",
    badgeColor: "text-amber-400",
    badgeBg: "bg-amber-400/10",
    deliverables: [
      "50+ Modular JS/TS Utility & Pattern Files",
      "Jest Unit Test Suite & Benchmarks",
      "85-Page Technical Reference Manual (PDF)",
      "Standard Commercial & Personal License",
    ],
    features: [
      "Production-ready utility patterns",
      "Complete Jest test suite & benchmarks",
      "85-page technical reference manual",
    ],
    fileTree: [
      "javascript-patterns-toolkit/",
      "├── src/",
      "│   ├── closures/",
      "│   ├── async-patterns/",
      "│   ├── engine-internals/",
      "│   ├── design-patterns/",
      "│   └── utility-functions/",
      "├── tests/",
      "│   └── __tests__/",
      "├── benchmarks/",
      "├── docs/",
      "│   └── technical-reference-manual.pdf",
      "├── package.json",
      "├── jest.config.ts",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Module 1: V8 Engine Internals & Memory Management",
      "Module 2: Closures, Scoping & Execution Context Deep-Dive",
      "Module 3: Async/Await, Promises & Event Loop Patterns",
      "Module 4: Functional Programming Utilities (Curry, Compose, Pipe)",
      "Module 5: Design Patterns (Observer, Singleton, Factory, Strategy)",
      "Module 6: Interview-Ready Code Challenges with Solutions",
    ],
    specs: {
      format: ".ZIP Archive + PDF Manual",
      version: "v2.4",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },
  {
    id: 302,
    slug: "react-enterprise-starter-kit",
    title: "Advanced React Enterprise Starter Kit",
    category: "pdf",
    categoryLabel: "React Enterprise Codebase + Manual",
    description:
      "A production-grade React + TypeScript starter kit featuring 2 complete reference applications (E-Commerce Admin Dashboard & Real-Time Chat), a reusable component library with custom hooks, performance profiling setup, and a 30-page architecture manual.",
    price: "49.00",
    originalPrice: "79.00",
    emoji: "💚",
    badgeColor: "text-emerald-400",
    badgeBg: "bg-emerald-400/10",
    deliverables: [
      "2 Complete Reference App Codebases (Dashboard & Chat)",
      "Reusable Custom Hooks & Component Library",
      "Performance Profiling Setup & Benchmarks",
      "30-Page Architecture Manual (PDF)",
    ],
    features: [
      "2 production reference applications",
      "Reusable hooks & component library",
      "30-page architecture manual",
    ],
    fileTree: [
      "react-enterprise-starter-kit/",
      "├── apps/",
      "│   ├── ecommerce-dashboard/",
      "│   └── realtime-chat/",
      "├── packages/",
      "│   ├── ui-components/",
      "│   └── hooks/",
      "├── profiling/",
      "│   └── react-profiler-config.ts",
      "├── docs/",
      "│   └── architecture-manual.pdf",
      "├── package.json",
      "├── tsconfig.json",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Chapter 1: Project Architecture & Monorepo Setup",
      "Chapter 2: Reusable Component Library with TypeScript",
      "Chapter 3: Custom Hooks — State, Data Fetching & Auth",
      "Chapter 4: E-Commerce Admin Dashboard (Full Build)",
      "Chapter 5: Real-Time Chat Application (WebSocket Integration)",
      "Chapter 6: Performance Profiling & Optimization Strategies",
    ],
    specs: {
      format: ".ZIP Archive + PDF Manual",
      version: "v2.4",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },
  {
    id: 303,
    slug: "technical-seo-cwv-toolkit",
    title: "Technical SEO & CWV Strategy Blueprint",
    category: "pdf",
    categoryLabel: "Developer Toolkit + PDF Blueprint",
    description:
      "A developer-focused SEO toolkit featuring copy-paste JSON-LD structured data schemas, Lighthouse CI configs, Core Web Vitals (LCP, INP, CLS) debugging workflows, and a comprehensive 30-day technical SEO audit template with step-by-step guidance.",
    price: "19.00",
    originalPrice: "39.00",
    emoji: "💙",
    badgeColor: "text-cyan-400",
    badgeBg: "bg-cyan-400/10",
    deliverables: [
      "Copy-Paste JSON-LD Structured Data Schemas",
      "Lighthouse CI Configs & Diagnostic Playbooks",
      "Core Web Vitals (LCP, INP, CLS) Debugging Workflows",
      "30-Day Technical SEO Audit Template & Guide (PDF)",
    ],
    features: [
      "JSON-LD structured data schemas",
      "Lighthouse CI & CWV debugging tools",
      "30-day SEO audit template & guide",
    ],
    fileTree: [
      "technical-seo-cwv-toolkit/",
      "├── schemas/",
      "│   ├── organization.json",
      "│   ├── product.json",
      "│   ├── faq-page.json",
      "│   └── breadcrumb.json",
      "├── lighthouse/",
      "│   └── lighthouserc.json",
      "├── cwv-debugging/",
      "│   ├── lcp-workflow.md",
      "│   ├── inp-workflow.md",
      "│   └── cls-workflow.md",
      "├── docs/",
      "│   └── seo-audit-guide.pdf",
      "├── templates/",
      "│   └── 30-day-audit-checklist.xlsx",
      "├── LICENSE",
      "└── README.md",
    ],
    modules: [
      "Module 1: Technical SEO Foundations & Crawl Budget Optimization",
      "Module 2: JSON-LD Structured Data Implementation",
      "Module 3: Core Web Vitals — LCP, INP & CLS Deep-Dive",
      "Module 4: Lighthouse CI Integration & Automated Auditing",
      "Module 5: 30-Day Technical SEO Audit Playbook",
    ],
    specs: {
      format: ".ZIP Archive + PDF Guide",
      version: "v2.4",
      license: "Single-Developer Commercial & Personal Use",
      support: "support@devassets.online",
    },
  },

  // Category: bundle
  {
    id: 401,
    slug: "all-access-pass-30-day",
    title: "30-Day All-Access Pass (Prepaid One-Time)",
    category: "bundle",
    categoryLabel: "Prepaid Access Pass",
    description:
      "A flexible, non-recurring prepaid 30-day pass for developers and agencies. Enjoy unlimited client-side tool processing plus your choice of any 3 premium codekits, prompt libraries, or PDF masterclasses with instant delivery.",
    price: "29.00",
    originalPrice: "59.00",
    emoji: "⚡",
    badgeColor: "text-amber-400",
    badgeBg: "bg-amber-400/10",
    deliverables: [
      "30 Days Unlimited Client-Side Tool Processing",
      "Choice of Any 3 Premium Code/Prompt/PDF Downloads",
      "Non-Recurring One-Time Charge (Zero Subscription Traps)",
      "Direct Priority Email Support Access",
    ],
    features: [
      "Zero auto-renewal — strictly one-time payment",
      "Instant token delivery for any 3 product downloads",
      "Full 30-day commercial usage rights",
    ],
    fileTree: [
      "devassets-30day-pass/",
      "├── pass-token.key",
      "├── download-portal-instructions.pdf",
      "├── commercial-terms.txt",
      "└── support-contact.txt",
    ],
    modules: [
      "Benefit 1: Unlimited Web Tool Execution (PDF, OCR, Video, Image)",
      "Benefit 2: Instant Unlock of 3 Premium Digital Packages",
      "Benefit 3: Direct Developer Email Support",
      "Benefit 4: Full Commercial Rights for Client Projects",
    ],
    specs: {
      format: "Prepaid Digital Key + Portal Access",
      version: "v2026.1",
      license: "Single-Developer 30-Day Commercial Rights",
      support: "support@devassets.online",
    },
  },
  {
    id: 402,
    slug: "all-in-one-lifetime-bundle",
    title: "All-in-One DevAssets Lifetime Bundle",
    category: "bundle",
    categoryLabel: "Ultimate Lifetime Access",
    description:
      "The definitive digital asset library for developers, consultants, and tech founders. Unlock permanent, lifetime access to all current and upcoming web utilities, prompt libraries, and complete PDF architecture masterclasses with zero recurring fees.",
    price: "69.00",
    originalPrice: "149.00",
    emoji: "👑",
    badgeColor: "text-indigo-400",
    badgeBg: "bg-indigo-400/10",
    deliverables: [
      "Lifetime Access to All Current & Future Web Tools",
      "All AI Prompt Libraries (Full-Stack, UI/UX, SEO)",
      "All PDF Masterclasses & Starter Codebases",
      "Commercial Developer License & Lifetime Free Updates",
    ],
    features: [
      "Single payment, lifetime updates",
      "Includes all 3 starter codekits and all 3 prompt libraries",
      "Commercial license for unlimited personal and client projects",
    ],
    fileTree: [
      "devassets-lifetime-bundle/",
      "├── codekits/",
      "│   ├── javascript-patterns-toolkit.zip",
      "│   ├── react-enterprise-starter-kit.zip",
      "│   └── technical-seo-cwv-toolkit.zip",
      "├── prompts/",
      "│   ├── fullstack-architecture-prompts.zip",
      "│   ├── ui-ux-design-prompts.zip",
      "│   └── seo-cwv-prompts.zip",
      "├── tools-pro/",
      "│   └── pro-utility-suite.zip",
      "├── master-license.pdf",
      "└── README.md",
    ],
    modules: [
      "Vault 1: Full-Stack Code Kits & Starter Applications",
      "Vault 2: Complete Prompt Engineering Systems",
      "Vault 3: PDF Architecture Manuals & Benchmarks",
      "Vault 4: Pro Utility Batch Runners",
      "Vault 5: Lifetime Free Updates & Support",
    ],
    specs: {
      format: "Complete Master Vault (.ZIP) + Future Updates",
      version: "v2026.LIFETIME",
      license: "Lifetime Multi-Project Commercial License",
      support: "support@devassets.online",
    },
  },
];

export function getToolBySlug(slug: string): ToolItem | undefined {
  return toolsData.find((t) => t.slug === slug);
}

export function getAllTools(): ToolItem[] {
  return toolsData;
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return productsData.find((p) => p.slug === slug);
}

export function getAllCatalogSlugs(): string[] {
  return productsData.map((p) => p.slug);
}
