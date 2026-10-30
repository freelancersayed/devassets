# Parallel & Intercepting Routes Modal Architecture
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
```markdown
You are an App Router Specialist. Create a production-grade Parallel and Intercepting Route setup in Next.js 15 for a deep-linkable Modal (e.g. Photo View / Product Detail / Checkout).

Requirements:
1. Intercept routing when navigating from a feed list (`@modal/(.)photos/[id]/page.tsx`) displaying an animated dialog modal.
2. Hard reload or direct URL visit (`/photos/[id]/page.tsx`) must render the full standalone page layout.
3. Clean `default.tsx` fallback implementations to prevent 404 errors during client transitions.
4. History pop-state handlers allowing Back button to dismiss modal without leaving the feed.
```
