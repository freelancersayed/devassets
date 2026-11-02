# Cryptographic HMAC Signature Webhook Verification
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Security Hardening & Zero-Trust Architecture

## Directive Prompt
```markdown
Implement constant-time cryptographic verification for incoming payment webhooks:
1. Native Node.js `crypto.createHmac('sha256', secret)`.
2. Timing-safe equality check (`crypto.timingSafeEqual`) to defeat side-channel timing attacks.
3. Raw body buffer verification before JSON deserialization.
```
