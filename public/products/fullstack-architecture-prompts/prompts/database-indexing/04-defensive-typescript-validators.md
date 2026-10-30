# Defensive TypeScript Types & Strict Zod Runtime Validators
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 3 - Defensive TypeScript Types & Strict Schema Validators

## Directive Prompt
```markdown
You are a Principal TypeScript Systems Engineer. Create bulletproof defensive types and runtime validators:
1. Branded / Nominal primitive types (`type UserId = string & { readonly __brand: unique symbol }`).
2. Discriminated union domain events with exhaustive switch pattern matching.
3. Zero-runtime-overhead TypeScript type guards with `arg is Type`.
4. Zod schema transformation pipeline with sanitization (trim, lowercasing, XSS strip).
```
