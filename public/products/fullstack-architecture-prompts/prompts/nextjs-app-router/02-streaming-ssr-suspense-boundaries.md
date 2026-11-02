# Streaming SSR & Nested Suspense Topologies
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
```markdown
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
   - Implement localized `error.tsx` wrappers so an external API failure does not crash the entire page.

Produce:
- `page.tsx` with layout hierarchy
- 3 independent async components with their corresponding `<Suspense fallback={...}>` skeletons.
```
