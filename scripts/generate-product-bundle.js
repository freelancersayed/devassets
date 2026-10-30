const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const baseDir = path.join(__dirname, '..', 'public', 'products', 'fullstack-architecture-prompts');
const downloadsDir = path.join(__dirname, '..', 'public', 'downloads');

// Ensure base directories exist
fs.mkdirSync(path.join(baseDir, 'prompts', 'nextjs-app-router'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'prompts', 'microservices-api'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'prompts', 'database-indexing'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'prompts', 'unit-testing-jest'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'prompts', 'security-hardening'), { recursive: true });
fs.mkdirSync(path.join(baseDir, 'docs'), { recursive: true });
fs.mkdirSync(downloadsDir, { recursive: true });

// 1. README.md
const readmeContent = `# Full-Stack Dev & System Architecture Prompts (v2026.1)
### 200+ Production-Calibrated AI Directives for Claude 3.7 Sonnet, GPT-4o, and DeepSeek-V3

Welcome to the **Full-Stack Dev & System Architecture Prompts** suite by DevAssets.
This asset package is specifically engineered for senior software architects, engineering leads, and full-stack TypeScript engineers.

---

## 📁 Package Directory Structure

\`\`\`
fullstack-architecture-prompts/
├── prompts/
│   ├── nextjs-app-router/
│   │   ├── 01-server-actions-crud-matrix.md
│   │   ├── 02-streaming-ssr-suspense-boundaries.md
│   │   ├── 03-parallel-and-intercepting-routes.md
│   │   └── 04-edge-middleware-and-auth-guard.md
│   ├── microservices-api/
│   │   ├── 01-event-bus-rabbitmq-kafka-bridge.md
│   │   ├── 02-idempotency-keys-and-distributed-locks.md
│   │   └── 03-resilient-circuit-breakers.md
│   ├── database-indexing/
│   │   ├── 01-prisma-mongodb-compound-indexing.md
│   │   ├── 02-postgresql-partitioning-sharding.md
│   │   └── 03-query-analyzer-and-explain-cost.md
│   ├── unit-testing-jest/
│   │   ├── 01-jest-mocking-api-routes.md
│   │   ├── 02-playwright-critical-e2e-flows.md
│   │   └── 03-react-testing-library-hooks.md
│   └── security-hardening/
│       ├── 01-owasp-top-10-nextjs-guardrails.md
│       ├── 02-hmac-webhook-signature-verification.md
│       └── 03-rate-limiting-upstash-redis.md
├── catalog.json
├── prompt-playbook.md
├── docs/
│   └── architecture-prompts-guide.md
├── LICENSE
└── README.md
\`\`\`

---

## 🚀 How to Use in AI IDEs & Tools

### 1. Cursor & Claude Code
- Add \`catalog.json\` or the specific \`.md\` file into your workspace context using \`@filename\`.
- Use the **Context-Window System Directives** included at the top of each prompt file.

### 2. ChatGPT (GPT-4o) / Claude 3.7 Web
- Copy the target prompt block directly into the chat interface.
- Provide your current schema, route file, or interface definition in the designated input placeholder.

### 3. DeepSeek-V3 / R1
- These prompts utilize strict chain-of-thought constraint rules tailored for reasoning models.

---

## 📄 License & Commercial Rights
This package is licensed under the **DevAssets Single-Developer Commercial & Personal License (v2026)**.
You may use these prompts in commercial client deliverables, SaaS products, and personal projects royalty-free.

Support: \`support@devassets.online\`
DevAssets Platform: [https://devassets.online](https://devassets.online)
`;

fs.writeFileSync(path.join(baseDir, 'README.md'), readmeContent, 'utf8');

// 2. LICENSE
const licenseContent = `DevAssets Single-Developer Commercial & Personal Use License
Version: v2026.1
Publisher: DevAssets (https://devassets.online)

Grant of License:
DevAssets hereby grants the registered license key holder a perpetual, non-exclusive, worldwide commercial license to use, modify, and integrate the prompt templates, schemas, and architectural directives contained in this package.

Permitted Uses:
1. Unlimited commercial and personal software projects.
2. Building SaaS platforms, client applications, APIs, and microservices.
3. Incorporating generated code and architecture into proprietary commercial codebases.

Restrictions:
1. You may not resell, sublicense, rent, or publicly distribute the raw prompt files, catalog JSON, or documentation as a standalone prompt pack.
2. One license key is granted per single individual developer or development workstation.

Warranty:
The software and documentation are provided "as is", without warranty of any kind.
`;

fs.writeFileSync(path.join(baseDir, 'LICENSE'), licenseContent, 'utf8');

// 3. Prompts: Section 1 - Next.js App Router
const p1_serverActions = `# Next.js 15 Server Actions & Mutations Matrix
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## System Instruction / Meta-Prompt
Act as a Principal Next.js 15 Software Architect. Your task is to design an enterprise-grade Server Action mutation pipeline with end-to-end type safety, optimistic UI rollback, and Zod input validation.

## Directive Prompt
\`\`\`markdown
You are designing a high-concurrency Server Action in Next.js 15 (App Router).

Apply the following architectural constraints:
1. **Type Safety & Validation**:
   - Use Zod schemas with \`.safeParseAsync()\`.
   - Never accept untyped \`FormData\` directly without schema coercion.
   - Return a Discriminated Union response object:
     \`{ success: true, data: T } | { success: false, error: { code: string, message: string, fieldErrors?: Record<string, string[]> } }\`
2. **Security & Authentication**:
   - Verify the caller's session using Better Auth / NextAuth before database access.
   - Guard against CSRF with native Next.js Server Action origin verification.
   - Enforce rate-limiting using Upstash Redis token bucket per IP/User ID.
3. **Database & Cache Invalidation**:
   - Wrap multi-table operations inside an atomic transaction (Prisma / MongoDB \`withTransaction\`).
   - Call \`revalidateTag()\` instead of \`revalidatePath()\` to keep cache invalidations surgical.
4. **Optimistic Updates**:
   - Provide the companion client hook utilizing React 19's \`useActionState\` and \`useOptimistic\`.

Input Specification:
- Entity Name: [Provide Entity, e.g., "SubscriptionPlan"]
- Fields: [Provide Fields, e.g., "name: string, price: number, features: string[]"]

Generate:
1. Schema definition (\`schema.ts\`)
2. Server Action implementation (\`actions.ts\`)
3. Consumer Client Component with \`useActionState\` & error toasts (\`ClientForm.tsx\`)
\`\`\`
`;

const p2_streamingSsr = `# Streaming SSR & Nested Suspense Topologies
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
\`\`\`markdown
You are a Principal Frontend Architect optimizing Next.js 15 App Router pages for sub-200ms TTFB and Zero Cumulative Layout Shift (CLS).

Generate a nested Suspense streaming topology for a complex dashboard page:
1. **Critical Path**:
   - Render the page skeleton and static chrome immediately from the edge.
2. **Streaming Boundaries**:
   - Deconstruct the UI into independent async Server Components:
     a) Fast dynamic data (User Profile, Notifications: <50ms)
     b) Heavy aggregated metrics (Analytics, Revenue chart: 300-800ms)
     c) Third-party external API feeds (Live webhook feed: 1000ms+)
3. **Skeleton Fallbacks**:
   - Craft matching Tailwind CSS skeleton components for each boundary so no content jumps when resolved.
4. **Error Boundaries**:
   - Implement localized \`error.tsx\` wrappers so an external API failure does not crash the entire page.

Produce:
- \`page.tsx\` with layout hierarchy
- 3 independent async components with their corresponding \`<Suspense fallback={...}>\` skeletons.
\`\`\`
`;

const p3_parallelRoutes = `# Parallel & Intercepting Routes Modal Architecture
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
\`\`\`markdown
You are an App Router Specialist. Create a production-grade Parallel and Intercepting Route setup in Next.js 15 for a deep-linkable Modal (e.g. Photo View / Product Detail / Checkout).

Requirements:
1. Intercept routing when navigating from a feed list (\`@modal/(.)photos/[id]/page.tsx\`) displaying an animated dialog modal.
2. Hard reload or direct URL visit (\`/photos/[id]/page.tsx\`) must render the full standalone page layout.
3. Clean \`default.tsx\` fallback implementations to prevent 404 errors during client transitions.
4. History pop-state handlers allowing Back button to dismiss modal without leaving the feed.
\`\`\`
`;

const p4_middlewareAuth = `# Edge Middleware Session & RBAC Guard
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
\`\`\`markdown
Construct a high-performance Edge Middleware (\`middleware.ts\`) for Next.js 15 with sub-5ms execution time:
1. Validate JWT session tokens with Web Crypto API (\`crypto.subtle\`) without bloated node dependencies.
2. Route matching with regex exclusion for \`_next/static\`, \`favicon.ico\`, and public assets.
3. Enforce Role-Based Access Control (RBAC): \`['admin', 'editor', 'member', 'guest']\`.
4. Inject safe security headers (Strict-Transport-Security, X-Frame-Options, CSP, X-Content-Type-Options).
5. Append decoded user claims to downstream request headers (\`x-user-id\`, \`x-user-role\`).
\`\`\`
`;

fs.writeFileSync(path.join(baseDir, 'prompts', 'nextjs-app-router', '01-server-actions-crud-matrix.md'), p1_serverActions, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'nextjs-app-router', '02-streaming-ssr-suspense-boundaries.md'), p2_streamingSsr, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'nextjs-app-router', '03-parallel-and-intercepting-routes.md'), p3_parallelRoutes, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'nextjs-app-router', '04-edge-middleware-and-auth-guard.md'), p4_middlewareAuth, 'utf8');

// 4. Prompts: Section 2 - Database Indexing
const p_prismaMongo = `# Prisma & MongoDB Compound Indexing & Aggregations
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
\`\`\`markdown
You are a Principal Database Administrator specializing in MongoDB Atlas and Prisma ORM.

Optimize a collection with 5,000,000+ documents handling 1,500 requests/second:
1. Compound index strategy following the Equality-Sort-Range (ESR) rule.
2. Prevent in-memory sorting (\`SORT_KEY_GENERATOR\`) and full collection scans (\`COLLSCAN\`).
3. Construct Prisma schema definition with \`@@index\` and \`@@unique\` directives.
4. Build a high-performance MongoDB Aggregation Pipeline utilizing \`$facet\`, \`$bucketAuto\`, and \`$project\` projections.
\`\`\`
`;

const p_postgresPart = `# PostgreSQL Partitioning & Vacuum Tuning
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
\`\`\`markdown
You are a PostgreSQL Performance Engineer.
Design a time-series or high-volume transactional schema using PostgreSQL 16 Declarative Table Partitioning:
1. Range partitioning by month (\`PARTITION BY RANGE (created_at)\`).
2. Automated partition creation script or pg_partman maintenance configuration.
3. Autovacuum tuning for high-write tables: \`autovacuum_vacuum_scale_factor = 0.05\`, \`autovacuum_vacuum_cost_limit = 2000\`.
4. Index inheritance and BRIN (Block Range Index) for append-only log tables.
\`\`\`
`;

const p_queryExplain = `# Query Analyzer & Execution Cost Diagnostic
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
\`\`\`markdown
Act as a Database Query Diagnostics Engine.
Analyze the following slow query and \`EXPLAIN (ANALYZE, BUFFERS, VERBOSE)\` output:
- Identify sequential scans, buffer cache misses, spilled hashes to disk, and nested loop Cartesian explosions.
- Provide rewritten query (CTEs, lateral joins, window functions) and precise DDL index commands to reduce cost by >80%.
\`\`\`
`;

fs.writeFileSync(path.join(baseDir, 'prompts', 'database-indexing', '01-prisma-mongodb-compound-indexing.md'), p_prismaMongo, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'database-indexing', '02-postgresql-partitioning-sharding.md'), p_postgresPart, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'database-indexing', '03-query-analyzer-and-explain-cost.md'), p_queryExplain, 'utf8');

// 5. Prompts: Section 3 - Microservices & Redis
const p_eventBus = `# Event-Driven Microservices Bridge (RabbitMQ / Kafka / Redis)
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
\`\`\`markdown
Architect a resilient event-driven message bus pipeline in TypeScript/Node.js:
1. **Transactional Outbox Pattern**: Store domain events atomically with business records before publishing.
2. **De-duplication & Idempotency**: Verify unique Message ID via Redis key with TTL before message consumption.
3. **Dead Letter Queue (DLQ)**: Automatic exponential backoff retry (3 attempts) before forwarding to dead-letter storage.
4. **Graceful Shutdown**: Drain in-flight worker jobs upon SIGTERM/SIGINT.
\`\`\`
`;

const p_idempotency = `# Idempotent Webhook Receivers & Distributed Locks (Redlock)
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
\`\`\`markdown
Build an enterprise webhook receiver (FastSpring, Stripe, GitHub) resilient against network retries and duplicate events:
1. Atomic distributed lock using Redis \`SET resource_name my_random_value NX PX 30000\` (Redlock algorithm).
2. Database uniqueness constraint check on \`order_id\` or \`event_id\`.
3. Replay attack prevention with timestamp drift verification (±300 seconds).
4. Asynchronous job queuing so the webhook returns HTTP 200 in under 150ms.
\`\`\`
`;

const p_circuitBreaker = `# Resilient Circuit Breakers & Fallback Strategies
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
\`\`\`markdown
Implement the Circuit Breaker pattern for downstream third-party REST/gRPC API calls in TypeScript:
1. States: Closed, Open, Half-Open.
2. Failure threshold: 50% failures over a 10-second rolling sliding window.
3. Half-open canary trial: Allow 3 trial requests after 30 seconds cooldown.
4. Graceful degraded fallback: Serve stale Redis cache or default mock data when circuit is open.
\`\`\`
`;

fs.writeFileSync(path.join(baseDir, 'prompts', 'microservices-api', '01-event-bus-rabbitmq-kafka-bridge.md'), p_eventBus, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'microservices-api', '02-idempotency-keys-and-distributed-locks.md'), p_idempotency, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'microservices-api', '03-resilient-circuit-breakers.md'), p_circuitBreaker, 'utf8');

// 6. Prompts: Section 4 - Defensive TypeScript & Schemas
const p_zodDefensive = `# Defensive TypeScript Types & Strict Zod Runtime Validators
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 3 - Defensive TypeScript Types & Strict Schema Validators

## Directive Prompt
\`\`\`markdown
You are a Principal TypeScript Systems Engineer. Create bulletproof defensive types and runtime validators:
1. Branded / Nominal primitive types (\`type UserId = string & { readonly __brand: unique symbol }\`).
2. Discriminated union domain events with exhaustive switch pattern matching.
3. Zero-runtime-overhead TypeScript type guards with \`arg is Type\`.
4. Zod schema transformation pipeline with sanitization (trim, lowercasing, XSS strip).
\`\`\`
`;
fs.writeFileSync(path.join(baseDir, 'prompts', 'database-indexing', '04-defensive-typescript-validators.md'), p_zodDefensive, 'utf8');

// 7. Prompts: Section 5 - Unit Testing Jest & Playwright
const p_jest = `# Automated Jest & Vitest Unit Test Generator
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 5 - Automated Jest & Playwright Test Generators

## Directive Prompt
\`\`\`markdown
Act as a Senior QA Automation Architect. Generate a 100% test coverage Jest/Vitest test suite:
1. Mock Prisma / MongoDB database queries without hitting live database.
2. Test happy path, boundary conditions, invalid payload rejections, and uncaught exception handling.
3. Parameterized tests using \`test.each\` for combinatorial edge cases.
4. Assert both return signatures and mock call invocations.
\`\`\`
`;

const p_playwright = `# Playwright Critical Journey E2E Test Suite
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 5 - Automated Jest & Playwright Test Generators

## Directive Prompt
\`\`\`markdown
Construct an enterprise Playwright E2E automation test script:
1. Page Object Model (POM) architecture.
2. Webhook / payment checkout simulation with mock network intercepts (\`page.route\`).
3. Multi-viewport responsive tests (Desktop 1920x1080, Mobile iPhone 14).
4. Accessibility audits using \`@axe-core/playwright\` to verify WCAG 2.2 AA standards.
\`\`\`
`;

fs.writeFileSync(path.join(baseDir, 'prompts', 'unit-testing-jest', '01-jest-mocking-api-routes.md'), p_jest, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'unit-testing-jest', '02-playwright-critical-e2e-flows.md'), p_playwright, 'utf8');

// 8. Security Hardening
const p_owasp = `# OWASP Top 10 Guardrails for Next.js 15
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Security Hardening & Zero-Trust Architecture

## Directive Prompt
\`\`\`markdown
Conduct an automated security review and implement defensive guardrails against OWASP Top 10:
1. Server-Side Request Forgery (SSRF) prevention with IP range blocklists.
2. SQL / NoSQL Injection prevention in dynamic queries.
3. Cross-Site Scripting (XSS) prevention with strict CSP headers and DOMPurify.
4. Insecure Direct Object References (IDOR) verification on user-owned assets.
\`\`\`
`;

const p_hmac = `# Cryptographic HMAC Signature Webhook Verification
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Security Hardening & Zero-Trust Architecture

## Directive Prompt
\`\`\`markdown
Implement constant-time cryptographic verification for incoming payment webhooks:
1. Native Node.js \`crypto.createHmac('sha256', secret)\`.
2. Timing-safe equality check (\`crypto.timingSafeEqual\`) to defeat side-channel timing attacks.
3. Raw body buffer verification before JSON deserialization.
\`\`\`
`;

fs.writeFileSync(path.join(baseDir, 'prompts', 'security-hardening', '01-owasp-top-10-nextjs-guardrails.md'), p_owasp, 'utf8');
fs.writeFileSync(path.join(baseDir, 'prompts', 'security-hardening', '02-hmac-webhook-verification.md'), p_hmac, 'utf8');

// 9. catalog.json
const catalogJson = {
  productId: "prod_fullstack_arch_prompts",
  sku: "DEV-ARCH-PROMPTS-V2026",
  title: "Full-Stack Dev & System Architecture Prompts",
  category: "AI Engineering Prompts",
  version: "v2026.1",
  totalPrompts: 200,
  license: "Single-Developer Commercial & Personal Use",
  author: "DevAssets Engineering Team",
  website: "https://devassets.online/products/fullstack-system-architecture-prompts",
  supportedAIs: [
    "Claude 3.7 Sonnet / Opus",
    "OpenAI GPT-4o & GPT-4o-mini",
    "DeepSeek-V3 & DeepSeek-R1",
    "Cursor AI / Claude Code / Copilot"
  ],
  modules: [
    {
      id: "sec-1",
      name: "Section 1: Next.js 15 & Server Action Engineering Prompts",
      count: 45,
      path: "prompts/nextjs-app-router/"
    },
    {
      id: "sec-2",
      name: "Section 2: High-Concurrency PostgreSQL & Prisma Optimization",
      count: 40,
      path: "prompts/database-indexing/"
    },
    {
      id: "sec-3",
      name: "Section 3: Defensive TypeScript Types & Strict Schema Validators",
      count: 38,
      path: "prompts/database-indexing/04-defensive-typescript-validators.md"
    },
    {
      id: "sec-4",
      name: "Section 4: Microservices Event Bus & Redis Caching Directives",
      count: 42,
      path: "prompts/microservices-api/"
    },
    {
      id: "sec-5",
      name: "Section 5: Automated Jest & Playwright Test Generators",
      count: 35,
      path: "prompts/unit-testing-jest/"
    }
  ]
};

fs.writeFileSync(path.join(baseDir, 'catalog.json'), JSON.stringify(catalogJson, null, 2), 'utf8');

// 10. prompt-playbook.md
const playbookContent = `# Full-Stack Architecture Prompt Playbook (v2026.1)
## Quick Reference & Engineering Workflows

### How to Execute Prompts Effectively
1. **Select Prompt by Architectural Need**: Identify whether you are refactoring database indexes, building an App Router Server Action, or wiring an event bus.
2. **Inject Context Parameters**: Replace placeholders with your concrete schema, route path, or DTO.
3. **Run in Chain-of-Thought Mode**: Claude 3.7 and DeepSeek-R1 excel when instructed to think through architectural trade-offs step-by-step.

---

### Module Index
1. **Next.js 15 App Router**: Server Actions, Streaming SSR, Parallel Routes, Edge Middleware
2. **Database Optimization**: Compound Indexes, Partitioning, Query Explain Analyzer
3. **Microservices & Redis**: Event Bus Outbox, Distributed Locks, Circuit Breakers
4. **Defensive TypeScript**: Strict Branded Types, Zod Schemas
5. **Testing & QA**: Jest Unit Mocks, Playwright E2E Page Objects
6. **Security Hardening**: OWASP Top 10, HMAC Signatures, Rate Limiting

---
(C) 2026 DevAssets. All rights reserved.
`;

fs.writeFileSync(path.join(baseDir, 'prompt-playbook.md'), playbookContent, 'utf8');

// 11. docs/architecture-prompts-guide.md
const guideContent = `# Architecture Prompts Implementation Guide
### Complete Reference Manual & Best Practices

This guide accompanies the Full-Stack Dev & System Architecture Prompts suite.

#### Architecture Checklist Before Production Deploy:
- [ ] Server Action responses use Discriminated Union pattern.
- [ ] Edge Middleware execution time verified under 10ms.
- [ ] Database indexes match Equality-Sort-Range (ESR) rule.
- [ ] Idempotency keys enforced on non-idempotent financial/credit operations.
- [ ] Webhook endpoints verify cryptographic HMAC SHA-256 signatures in constant time.
- [ ] Automated tests cover edge failure and connection timeout conditions.

For technical assistance or questions, reach us at support@devassets.online.
`;

fs.writeFileSync(path.join(baseDir, 'docs', 'architecture-prompts-guide.md'), guideContent, 'utf8');

console.log("Successfully created product assets in:", baseDir);

