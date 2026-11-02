# Edge Middleware Session & RBAC Guard
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## Directive Prompt
```markdown
Construct a high-performance Edge Middleware (`middleware.ts`) for Next.js 15 with sub-5ms execution time:
1. Validate JWT session tokens with Web Crypto API (`crypto.subtle`) without bloated node dependencies.
2. Route matching with regex exclusion for `_next/static`, `favicon.ico`, and public assets.
3. Enforce Role-Based Access Control (RBAC): `['admin', 'editor', 'member', 'guest']`.
4. Inject safe security headers (Strict-Transport-Security, X-Frame-Options, CSP, X-Content-Type-Options).
5. Append decoded user claims to downstream request headers (`x-user-id`, `x-user-role`).
```
