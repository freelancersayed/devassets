export interface Product {
  id: number;
  slug: string;
  title: string;
  category: string;
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

export const products: Product[] = [
  {
    id: 1,
    slug: "javascript-patterns-toolkit",
    title: "Advanced JavaScript Patterns & Engine Toolkit",
    category: "Code Library (.ZIP) + Technical Manual (PDF)",
    description:
      "Deep dive into JS engine internals, closures, async/await mastery, and 50+ production-ready utility patterns. Includes a comprehensive Jest test suite, benchmarking configs, and an 85-page technical reference manual covering every module in detail.",
    price: "29.00",
    originalPrice: "59.00",
    emoji: "💛",
    badgeColor: "text-amber-500",
    badgeBg: "bg-amber-500/10",
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
    id: 2,
    slug: "react-enterprise-starter-kit",
    title: "Advanced React Enterprise Starter Kit",
    category: "Full-Stack React/TS Starter Kit + Documentation",
    description:
      "A production-grade React + TypeScript starter kit featuring 2 complete reference applications (E-Commerce Admin Dashboard & Real-Time Chat), a reusable component library with custom hooks, performance profiling setup, and a 30-page architecture manual.",
    price: "49.00",
    originalPrice: "79.00",
    emoji: "💚",
    badgeColor: "text-emerald-400",
    badgeBg: "bg-emerald-400/10",
    deliverables: [
      "2 Complete Reference App Codebases (E-Commerce Admin Dashboard & Real-Time Chat)",
      "Reusable Custom Hooks & TypeScript Component Library",
      "Performance Profiling Setup",
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
    id: 3,
    slug: "technical-seo-cwv-toolkit",
    title: "Technical SEO & Core Web Vitals Audit Toolkit",
    category: "Developer Toolkit + Audit Templates + Guide",
    description:
      "A developer-focused SEO toolkit featuring copy-paste JSON-LD structured data schemas, Lighthouse CI configs, Core Web Vitals (LCP, INP, CLS) debugging workflows, and a comprehensive 30-day technical SEO audit template with step-by-step guidance.",
    price: "19.00",
    originalPrice: "39.00",
    emoji: "💙",
    badgeColor: "text-cyan-400",
    badgeBg: "bg-cyan-400/10",
    deliverables: [
      "Copy-Paste JSON-LD Structured Data Schemas",
      "Lighthouse CI Configs",
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
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return products.map((p) => p.slug);
}
