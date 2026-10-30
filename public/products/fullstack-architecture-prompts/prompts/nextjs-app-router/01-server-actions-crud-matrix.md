# Next.js 15 Server Actions & Mutations Matrix
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 1 - Next.js 15 & Server Action Engineering

## System Instruction / Meta-Prompt
Act as a Principal Next.js 15 Software Architect. Your task is to design an enterprise-grade Server Action mutation pipeline with end-to-end type safety, optimistic UI rollback, and Zod input validation.

## Directive Prompt
```markdown
You are designing a high-concurrency Server Action in Next.js 15 (App Router).

Apply the following architectural constraints:
1. **Type Safety & Validation**:
   - Use Zod schemas with `.safeParseAsync()`.
   - Never accept untyped `FormData` directly without schema coercion.
   - Return a Discriminated Union response object:
     `{ success: true, data: T } | { success: false, error: { code: string, message: string, fieldErrors?: Record<string, string[]> } }`
2. **Security & Authentication**:
   - Verify the caller's session using Better Auth / NextAuth before database access.
   - Guard against CSRF with native Next.js Server Action origin verification.
   - Enforce rate-limiting using Upstash Redis token bucket per IP/User ID.
3. **Database & Cache Invalidation**:
   - Wrap multi-table operations inside an atomic transaction (Prisma / MongoDB `withTransaction`).
   - Call `revalidateTag()` instead of `revalidatePath()` to keep cache invalidations surgical.
4. **Optimistic Updates**:
   - Provide the companion client hook utilizing React 19's `useActionState` and `useOptimistic`.

Input Specification:
- Entity Name: [Provide Entity, e.g., "SubscriptionPlan"]
- Fields: [Provide Fields, e.g., "name: string, price: number, features: string[]"]

Generate:
1. Schema definition (`schema.ts`)
2. Server Action implementation (`actions.ts`)
3. Consumer Client Component with `useActionState` & error toasts (`ClientForm.tsx`)
```
