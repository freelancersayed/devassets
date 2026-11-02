import { PromptDocument } from "@/types/prompt";

export const initialPrompts: PromptDocument[] = [
  {
    title: "Epic Fantasy Landscape",
    slug: "epic-fantasy-landscape",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "Generate breathtaking, high-detail medieval fantasy kingdoms perched atop misty mountains with cinematic volumetric lighting.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
    viewCount: 2140,
    likesCount: 142,
    accessType: "paid",
    preview: "High-fantasy environment prompt engineered for maximum architectural depth, atmospheric fog, and cinematic 8K scale.",
    compatibleModels: ["Midjourney v6", "DALL-E 3", "Stable Diffusion XL"],
    tags: ["Fantasy", "Landscape", "Cinematic", "Environment"],
    isPublished: true,
    content: `ACT AS A MASTER CONCEPT ARTIST AND CINEMATOGRAPHER.
GENERATE: An awe-inspiring epic fantasy citadel nestled on a jagged alpine mountain peak, surrounded by swirling mist and cascading waterfalls.
COMPOSITION: Ultra wide-angle panoramic vista, golden hour sunset rays breaking through storm clouds, warm ambient rim lighting on stone battlements.
STYLE: Unreal Engine 5 render, cinematic concept art, Greg Rutkowski & Albert Bierstadt aesthetic, hyper-detailed, 8K resolution, octane render.
NEGATIVE PROMPT: blurry, modern buildings, power lines, oversaturated neon, low contrast, distorted geometry.`,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-10-25"),
  },
  {
    title: "Cyberpunk Street Scene",
    slug: "cyberpunk-street-scene",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "Photorealistic futuristic dystopian alleyway illuminated by vivid neon signs, reflective wet pavement, and flying vehicles.",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop",
    viewCount: 1720,
    likesCount: 98,
    accessType: "paid",
    preview: "Vivid neo-Tokyo sci-fi street prompt with realistic puddles, volumetric rain, and detailed neon kanji signs.",
    compatibleModels: ["Midjourney v6", "DALL-E 3"],
    tags: ["Sci-Fi", "Cyberpunk", "Neon", "Urban"],
    isPublished: true,
    content: `ACT AS A HOLLYWOOD SCI-FI SET DESIGNER.
GENERATE: A rainy night cyberpunk street in Neo-Shinjuku with towering holographic billboards, glowing neon storefronts in electric cyan and magenta, and wet asphalt with ray-traced reflections.
DETAILS: Steam rising from street grates, pedestrians holding translucent illuminated umbrellas, futuristic hover-cars passing overhead in blurred motion.
CAMERA: 35mm lens, f/1.8 aperture, cinematic teal-and-orange color grading, anamorphic lens flares, photorealistic 8K.`,
    createdAt: new Date("2026-02-10"),
    updatedAt: new Date("2026-10-25"),
  },
  {
    title: "Realistic Portrait Photography",
    slug: "realistic-portrait-photography",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "Studio-grade editorial human portrait featuring natural skin texture, catchlights in the eyes, and shallow depth of field.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    viewCount: 3410,
    likesCount: 234,
    accessType: "free",
    preview: "Award-winning studio lighting prompt for natural human skin, authentic bokeh, and Hasselblad color science.",
    compatibleModels: ["Midjourney v6", "Flux.1", "DALL-E 3"],
    tags: ["Photography", "Portrait", "Studio", "Realistic"],
    isPublished: true,
    content: `GENERATE: Studio editorial medium close-up portrait of a woman with natural freckles and authentic skin micro-texture.
LIGHTING: Profoto softbox key light at 45 degrees, subtle warm reflector fill, soft hair rim light separating subject from dark charcoal canvas background.
CAMERA SETTINGS: Shot on Hasselblad H6D-100c, 100mm f/2.2 lens, ISO 64, natural catchlights in pupils, true color fidelity.`,
    createdAt: new Date("2026-02-18"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Astronaut on Alien Planet",
    slug: "astronaut-on-alien-planet",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "Solitary space explorer standing on crystalline extraterrestrial terrain under a giant ringed gas planet horizon.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    viewCount: 2840,
    likesCount: 186,
    accessType: "paid",
    preview: "Interstellar discovery composition with realistic spacesuit visor reflections and otherworldly planetary horizons.",
    compatibleModels: ["Midjourney v6", "Flux.1"],
    tags: ["Sci-Fi", "Space", "Astronaut", "Planetary"],
    isPublished: true,
    content: `ACT AS A HARD SCI-FI CINEMATOGRAPHER.
SCENE: Solitary astronaut in an advanced matte-white EVA spacesuit standing on an iridescent crystalline alien desert landscape.
SKY: Looming colossal ringed gas giant planet filling 40% of the purple twilight sky, binary stars on the horizon.
VISOR: Gold-tinted reflective helmet visor reflecting the strange terrain. Christopher Nolan Interstellar visual mood, 8K IMAX cinematography.`,
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Cozy Interior Design",
    slug: "cozy-interior-design",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "Modern Scandinavian warm living room with natural oak furniture, large bay windows, indoor plants, and soft morning sunlight.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
    viewCount: 1210,
    likesCount: 76,
    accessType: "free",
    preview: "Architectural digest quality interior rendering prompt with realistic fabric textures and warm sunlight shadows.",
    compatibleModels: ["Midjourney v6", "DALL-E 3"],
    tags: ["Interior", "Architecture", "Minimalist", "Warm"],
    isPublished: true,
    content: `GENERATE: Architectural Digest feature interior photograph of a warm minimalist Japandi living room.
FURNITURE: Low-profile white bouclé curved sofa, solid natural white oak coffee table with ceramics and art books, fiddle-leaf fig tree in textured clay pot.
LIGHTING: Golden morning sunlight streaming through floor-to-ceiling glass windows casting geometric architectural shadows, ultra clean lines.`,
    createdAt: new Date("2026-03-12"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Anime Character Art",
    slug: "anime-character-art",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "High-octane Japanese anime warrior illustration featuring detailed glowing sword effects, flowing hair, and dynamic action pose.",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=800&auto=format&fit=crop",
    viewCount: 3120,
    likesCount: 215,
    accessType: "paid",
    preview: "Studio Ufotable and Makoto Shinkai style high-energy anime artwork prompt with crisp linework and particle lighting.",
    compatibleModels: ["Midjourney v6 (Niji 6)", "Stable Diffusion XL"],
    tags: ["Anime", "Character", "Illustration", "Action"],
    isPublished: true,
    content: `STYLE: Modern high-budget anime keyframe illustration by Makoto Shinkai & Ufotable.
SUBJECT: Dynamic female swordsman in intricate dark armor with red accents, wielding an ethereal glowing katana with crackling electric sparks.
COMPOSITION: Extreme diagonal action pose, floating cherry blossom petals caught in wind vortex, dynamic motion blur on edges, vivid eyes with complex highlights.`,
    createdAt: new Date("2026-03-20"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Abstract Liquid Art",
    slug: "abstract-liquid-art",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "Swirling psychedelic fluid dynamics of metallic gold, deep indigo, and iridescent magenta colors blending in macro detail.",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    viewCount: 1640,
    likesCount: 89,
    accessType: "free",
    preview: "Macro fluid photography prompt for wallpaper-grade abstract fluid dynamics and glossy metallic sheen.",
    compatibleModels: ["Midjourney v6", "DALL-E 3", "Flux.1"],
    tags: ["Abstract", "Liquid", "Fluid", "Color"],
    isPublished: true,
    content: `GENERATE: Macro photography of marbled iridescent liquid acrylics and liquid gold leaf swirling together.
COLORS: Cosmic deep violet, midnight navy, vibrant coral, and molten 24k gold veins. High surface tension droplets, crystalline clarity, studio rim highlights.`,
    createdAt: new Date("2026-04-05"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Luxury Product Photography",
    slug: "luxury-product-photography",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "High-end commercial advertisement photograph of an automatic luxury chronograph watch resting on black volcanic stone.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    viewCount: 2310,
    likesCount: 128,
    accessType: "paid",
    preview: "Commercial product photography prompt optimized for crisp typography on watch face, micro-scratches, and luxury aesthetic.",
    compatibleModels: ["Midjourney v6", "Flux.1"],
    tags: ["Product", "Commercial", "Luxury", "Watch"],
    isPublished: true,
    content: `SUBJECT: Commercial luxury advertisement shot of an automatic chronograph watch with rose gold bezel and dark emerald dial.
SURFACE: Resting on a matte black textured basalt slate stone with fine condensation mist droplets.
LIGHTING: Precision dual strip-box soft lighting defining case bevels, zero glare on anti-reflective sapphire crystal, premium GQ magazine aesthetic.`,
    createdAt: new Date("2026-04-14"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Modern Architecture Villa",
    slug: "modern-architecture-villa",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "Cantilevered brutalist-luxury glass mansion integrated into cliffside with illuminated infinity pool at blue hour.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    viewCount: 1150,
    likesCount: 64,
    accessType: "free",
    preview: "Photorealistic architectural visualization prompt with precision concrete finishes, interior warm lighting, and water caustics.",
    compatibleModels: ["Midjourney v6", "Flux.1"],
    tags: ["Architecture", "Modern", "Luxury", "Villa"],
    isPublished: true,
    content: `GENERATE: Architectural rendering of an ultra-modern cliffside residence designed by Tadao Ando and Olson Kundig.
FEATURES: Board-formed concrete cantilevers, floor-to-ceiling glass curtains revealing minimalist interior, dark stone infinity pool reflecting the dusk twilight sky.`,
    createdAt: new Date("2026-04-22"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Cute Animal Photography",
    slug: "cute-animal-photography",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "Heartwarming close-up photograph of an adorable golden labradoodle puppy sitting in a sunny spring flower meadow.",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop",
    viewCount: 2750,
    likesCount: 178,
    accessType: "free",
    preview: "National Geographic quality pet photography prompt with natural eye catchlights, soft fur rendering, and creamy bokeh.",
    compatibleModels: ["Midjourney v6", "DALL-E 3"],
    tags: ["Photography", "Animals", "Cute", "Nature"],
    isPublished: true,
    content: `SUBJECT: Adorable golden doodle puppy with expressive shiny brown eyes, soft curly coat, playful head tilt.
ENVIRONMENT: Lush green meadow with wild chamomile flowers, golden hour backlighting creating a soft halo glow around puppy fur, 85mm f/1.4 lens bokeh.`,
    createdAt: new Date("2026-05-01"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Fantasy Character Elf Warrior",
    slug: "fantasy-character-elf-warrior",
    category: "Image Generation",
    price: 3.0,
    currency: "$",
    description: "Noble silver-haired elven ranger in filigree leather armor holding a carved yew bow in an ancient enchanted grove.",
    image: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=800&auto=format&fit=crop",
    viewCount: 2260,
    likesCount: 153,
    accessType: "paid",
    preview: "D&D and cinematic character concept art prompt with intricate armor engraving, fantasy lighting, and heroic composition.",
    compatibleModels: ["Midjourney v6", "Flux.1"],
    tags: ["Fantasy", "Character", "Elf", "Heroic"],
    isPublished: true,
    content: `CONCEPT ART: Full-body character portrait of an elven warrior with braided silver hair, piercing violet eyes, and leaf-shaped silver filigree armor.
SETTING: Ancient moss-covered redwood forest, soft bioluminescent motes drifting in the air, Lord of the Rings cinematic atmosphere.`,
    createdAt: new Date("2026-05-15"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Deep Space Nebula",
    slug: "deep-space-nebula",
    category: "Image Generation",
    price: 0,
    currency: "$",
    description: "James Webb telescope style deep field capture of glowing stellar nurseries, cosmic dust pillars, and distant galaxies.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop",
    viewCount: 1530,
    likesCount: 92,
    accessType: "free",
    preview: "NASA James Webb infrared astrophysics photography prompt with diffraction spikes on luminous newborn stars.",
    compatibleModels: ["Midjourney v6", "DALL-E 3"],
    tags: ["Sci-Fi", "Space", "Nebula", "Cosmos"],
    isPublished: true,
    content: `ASTROPHOTOGRAPHY: Deep-space infrared capture of the Pillars of Creation nebula.
DETAILS: Towering columns of interstellar gas and cosmic dust backlit by clusters of brilliant blue newborn stars with 8-point diffraction spikes. Scientific authenticity.`,
    createdAt: new Date("2026-06-01"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "React Component Builder",
    slug: "react-component-builder",
    category: "Development",
    price: 3.0,
    currency: "$",
    description: "Generate production-ready, accessible, and responsive React 19 + TypeScript components with Tailwind CSS in seconds.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    viewCount: 4210,
    likesCount: 382,
    accessType: "paid",
    preview: "Enterprise React prompt generating typed interfaces, ARIA attributes, keyboard navigation, and unit test specifications.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet", "DeepSeek Coder"],
    tags: ["Development", "React", "TypeScript", "Tailwind"],
    isPublished: true,
    content: `YOU ARE A PRINCIPAL FRONTEND ARCHITECT SPECIALIZING IN REACT 19, TYPESCRIPT, AND TAILWIND CSS.
TASK: When given a UI component description:
1. Define strict TypeScript interfaces for all props, slots, and event handlers.
2. Ensure 100% WCAG 2.1 AA compliance (proper ARIA roles, tabindex, keyboard shortcuts).
3. Use modern Tailwind CSS v4 styling with zero ad-hoc CSS.
4. Implement defense mechanisms against undefined props and SSR hydration mismatches.
5. Provide a working code example with zero omitted code.`,
    createdAt: new Date("2026-06-15"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Fullstack API Architect",
    slug: "fullstack-api-architect",
    category: "Development",
    price: 5.0,
    currency: "$",
    description: "Design clean RESTful and GraphQL API route contracts with Zod validation, error wrappers, and OpenAPI documentation.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    viewCount: 3890,
    likesCount: 295,
    accessType: "paid",
    preview: "Robust backend system prompt producing typed schemas, HTTP status consistency, and idempotent mutations.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Development", "API", "Node.js", "Architecture"],
    isPublished: true,
    content: `ACT AS AN ENTERPRISE API ARCHITECT.
DESIGN OBJECTIVE: Given an entity or domain workflow, output:
- Complete REST endpoint specifications with HTTP verbs and status codes (200, 201, 400, 401, 403, 404, 429).
- Zod schema definitions for request body, query params, and response envelopes.
- Idempotency key handling for mutating operations.
- Rate limiting strategy and database index recommendations.`,
    createdAt: new Date("2026-07-01"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Database Schema & Migration Designer",
    slug: "database-schema-migration-designer",
    category: "Development",
    price: 0,
    currency: "$",
    description: "Construct normalized relational or document database schemas with indexing strategies, foreign keys, and migration scripts.",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=800&auto=format&fit=crop",
    viewCount: 1980,
    likesCount: 140,
    accessType: "free",
    preview: "Database modeling prompt for PostgreSQL and MongoDB ensuring query efficiency and referential integrity.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Development", "Database", "MongoDB", "PostgreSQL"],
    isPublished: true,
    content: `ROLE: Senior Database Administrator and Data Modeler.
INPUT: A business domain specification.
OUTPUT:
1. Entity-Relationship definition with cardinality (1:1, 1:N, N:M).
2. Complete schema definition with compound indexes for common query patterns.
3. Up/Down migration scripts with zero-downtime transition strategy.`,
    createdAt: new Date("2026-07-20"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "SaaS Landing Page Copywriter",
    slug: "saas-landing-page-copywriter",
    category: "Marketing",
    price: 3.0,
    currency: "$",
    description: "Write high-converting SaaS landing page copy using proven copywriting frameworks (PAS, AIDA) that turn visitors into paying users.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    viewCount: 2650,
    likesCount: 210,
    accessType: "paid",
    preview: "Direct-response conversion copy prompt crafting magnetic hero headlines, social proof hooks, and irresistible CTAs.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Marketing", "Copywriting", "SaaS", "Conversion"],
    isPublished: true,
    content: `ACT AS A WORLD-CLASS DIRECT-RESPONSE COPYWRITER (ALEX CATTONI / EUGENE SCHWARTZ LEVEL).
FORMULA:
1. Hero Header: Hook + Clear Value Proposition + Subhead overcoming primary objection.
2. Pain Aggravation: 3 visceral symptoms current alternatives fail to solve.
3. The Mechanism: Why our solution works without the usual friction.
4. Risk Reversal & Frictionless Call to Action.`,
    createdAt: new Date("2026-08-05"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Cold Email Conversion Engine",
    slug: "cold-email-conversion-engine",
    category: "Business",
    price: 0,
    currency: "$",
    description: "Craft personalized, punchy B2B cold outreach emails that dodge spam filters and generate 30%+ open and response rates.",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
    viewCount: 3100,
    likesCount: 245,
    accessType: "free",
    preview: "High-ticket outbound email framework focused on low-friction questions and specific business relevance.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Business", "Sales", "Outreach", "Email"],
    isPublished: true,
    content: `OBJECTIVE: Write a 4-sentence B2B outbound email that generates qualified sales replies.
CONSTRAINTS:
- Maximum 90 words total.
- Line 1: Observation/Trigger specific to their recent company news.
- Line 2: The single metric or bottleneck we address with zero fluff.
- Line 3: A 1-sentence proof case study with concrete numbers.
- Line 4: Low friction CTA (e.g. "Open to exploring this, or bad timing?").`,
    createdAt: new Date("2026-08-18"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Technical SEO Audit Master",
    slug: "technical-seo-audit-master",
    category: "Marketing",
    price: 3.0,
    currency: "$",
    description: "Run comprehensive technical SEO site audits covering Core Web Vitals, crawl budget, canonicalization, and schema markup.",
    image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=800&auto=format&fit=crop",
    viewCount: 2190,
    likesCount: 165,
    accessType: "paid",
    preview: "Deep SEO analysis system prompt generating prioritized audit checklists, Schema.org JSON-LD snippets, and fixes.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Marketing", "SEO", "Audit", "Technical"],
    isPublished: true,
    content: `YOU ARE A TECHNICAL SEO CONSULTANT SPECIALIZING IN ENTERPRISE SITES AND CORE WEB VITALS.
INSTRUCTIONS: Given a URL or website architecture:
1. Audit robots.txt, sitemap XML hierarchy, and canonical headers.
2. Diagnose hydration and server-side rendering crawlability.
3. Generate valid Schema.org JSON-LD markup for Organization, WebSite, and BreadcrumbList.
4. Formulate an actionable priority matrix (P0 critical, P1 medium, P2 minor).`,
    createdAt: new Date("2026-09-01"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Executive Pitch Deck Strategist",
    slug: "executive-pitch-deck-strategist",
    category: "Business",
    price: 5.0,
    currency: "$",
    description: "Structure winning 10-slide venture capital pitch decks inspired by Y-Combinator and Sequoia Capital standards.",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
    viewCount: 1840,
    likesCount: 152,
    accessType: "paid",
    preview: "Investor-tested narrative deck architect delivering slide-by-slide headlines, traction metrics, and unit economics.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Business", "Pitch Deck", "Startups", "Venture Capital"],
    isPublished: true,
    content: `ACT AS A PARTNER AT A TIER-1 SILICON VALLEY VC FIRM.
STRUCTURE A 10-SLIDE SEED/SERIES A PITCH DECK:
Slide 1: One-sentence category-defining vision.
Slide 2: The billion-dollar acute problem.
Slide 3: Your proprietary secret / product demo.
Slide 4: Market size (Bottom-up TAM/SAM/SOM).
Slide 5: Business model & unit economics (CAC, LTV, churn).
Slide 6: Moat & defensibility.
Slide 7: Unfair traction & retention cohort data.
Slide 8: Team pedigree.
Slide 9: Financial projections (3 years).
Slide 10: The Ask & milestones to be unlocked.`,
    createdAt: new Date("2026-09-12"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Viral LinkedIn Hook & Post Generator",
    slug: "viral-linkedin-hook-post-generator",
    category: "Writing",
    price: 0,
    currency: "$",
    description: "Write authentic, high-engagement LinkedIn thought leadership posts with irresistible first-line hooks and clean spacing.",
    image: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=800&auto=format&fit=crop",
    viewCount: 3950,
    likesCount: 310,
    accessType: "free",
    preview: "High-retention LinkedIn storytelling prompt balancing professional insight, readability, and authentic personal lessons.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Writing", "LinkedIn", "Social Media", "Personal Brand"],
    isPublished: true,
    content: `ACT AS A TOP 1% LINKEDIN CREATOR AND EXECUTIVE GHOSTWRITER.
STRUCTURE:
- Hook (Line 1): Counter-intuitive lesson or bold vulnerability.
- Re-hook (Line 2): Why 90% of people get this wrong.
- Body (Lines 3-8): Bullet points with tactical insights and short 1-line sentences.
- Takeaway (Line 9): A single memorable aphorism.
- CTA: Open question driving thoughtful debate in comments.`,
    createdAt: new Date("2026-09-25"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Long-Form Technical Blog Drafter",
    slug: "long-form-technical-blog-drafter",
    category: "Writing",
    price: 3.0,
    currency: "$",
    description: "Write authoritative 2,000+ word technical deep dives with clear architectural diagrams, code snippets, and benchmarks.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    viewCount: 2470,
    likesCount: 194,
    accessType: "paid",
    preview: "Software engineering essayist prompt creating clear explanations of complex systems and trade-offs.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Writing", "Blogging", "Technical", "Engineering"],
    isPublished: true,
    content: `ACT AS A PRINCIPAL SYSTEMS ENGINEER AND TECHNICAL ESSAYIST (DAN LUU / MARTIN FOWLER STYLE).
GUIDELINES:
- Avoid buzzwords and superficial summaries.
- Explain the foundational computer science problem before presenting solutions.
- Include executable code examples illustrating common edge cases.
- Analyze trade-offs (memory vs CPU, latency vs throughput, consistency vs availability).`,
    createdAt: new Date("2026-10-05"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Executive Daily Schedule Optimizer",
    slug: "executive-daily-schedule-optimizer",
    category: "Productivity",
    price: 0,
    currency: "$",
    description: "Structure high-output deep work blocks, asynchronous communication windows, and energy management schedules.",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=800&auto=format&fit=crop",
    viewCount: 1890,
    likesCount: 135,
    accessType: "free",
    preview: "High-performance productivity prompt utilizing time-blocking, Maker vs Manager scheduling, and circadian rhythms.",
    compatibleModels: ["GPT-4o", "Claude 3.5 Sonnet"],
    tags: ["Productivity", "Time Management", "Deep Work", "Executive"],
    isPublished: true,
    content: `ACT AS AN ELITE EXECUTIVE PRODUCTIVITY COACH.
INPUT: A list of daily commitments, meetings, and high-impact deliverables.
OUTPUT:
1. Chronological Time-Block plan categorizing tasks by cognitive demand.
2. 90-minute uninterrupted Deep Work sanctuary block.
3. Consolidated asynchronous comms batches (Email/Slack).
4. Physical/Mental reset transitions to sustain peak cognitive stamina.`,
    createdAt: new Date("2026-10-12"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Meeting Summary & Action Extractor",
    slug: "meeting-summary-action-extractor",
    category: "Productivity",
    price: 0,
    currency: "$",
    description: "Transform messy meeting transcripts into crisp executive summaries, key decisions made, and assigned action items with deadlines.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
    viewCount: 3340,
    likesCount: 268,
    accessType: "free",
    preview: "Executive briefing synthesis prompt extracting tangible ownership, unblocking dependencies, and recording decisions.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Productivity", "Meetings", "Summary", "Operations"],
    isPublished: true,
    content: `YOU ARE AN EXECUTIVE CHIEF OF STAFF.
GIVEN: A raw meeting transcript or notes.
PRODUCE:
1. Executive TL;DR (3 bullet points max).
2. Key Decisions Agreed (Immutable records of who decided what).
3. Action Item Matrix:
   - [Owner] | [Deliverable Action Item] | [Target Deadline] | [Dependencies]
4. Unresolved Blockers requiring executive escalation.`,
    createdAt: new Date("2026-10-20"),
    updatedAt: new Date("2026-10-26"),
  },
  {
    title: "Code Review & Security Auditor",
    slug: "code-review-security-auditor",
    category: "Development",
    price: 3.0,
    currency: "$",
    description: "Identify OWASP Top 10 vulnerabilities, memory leaks, performance bottlenecks, and architectural code smells before deployment.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    viewCount: 2890,
    likesCount: 215,
    accessType: "paid",
    preview: "Rigorous static analysis and application security prompt detecting injection, auth bypasses, and unhandled promises.",
    compatibleModels: ["Claude 3.5 Sonnet", "GPT-4o"],
    tags: ["Development", "Security", "Code Review", "Audit"],
    isPublished: true,
    content: `ACT AS A SENIOR APPLICATION SECURITY AUDITOR.
AUDIT SCOPE:
1. Check for OWASP Top 10 risks (SQLi, NoSQL injection, SSRF, XSS, CSRF, broken access control).
2. Identify async race conditions, unhandled rejections, and memory leaks.
3. Review algorithmic complexity and recommend O(1) or O(log N) optimizations.
4. Output refactored diff with inline explanations.`,
    createdAt: new Date("2026-10-22"),
    updatedAt: new Date("2026-10-26"),
  },
];
