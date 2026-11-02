# OWASP Top 10 Guardrails for Next.js 15
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Security Hardening & Zero-Trust Architecture

## Directive Prompt
```markdown
Conduct an automated security review and implement defensive guardrails against OWASP Top 10:
1. Server-Side Request Forgery (SSRF) prevention with IP range blocklists.
2. SQL / NoSQL Injection prevention in dynamic queries.
3. Cross-Site Scripting (XSS) prevention with strict CSP headers and DOMPurify.
4. Insecure Direct Object References (IDOR) verification on user-owned assets.
```
