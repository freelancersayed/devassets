# Idempotent Webhook Receivers & Distributed Locks (Redlock)
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
```markdown
Build an enterprise webhook receiver (FastSpring, Stripe, GitHub) resilient against network retries and duplicate events:
1. Atomic distributed lock using Redis `SET resource_name my_random_value NX PX 30000` (Redlock algorithm).
2. Database uniqueness constraint check on `order_id` or `event_id`.
3. Replay attack prevention with timestamp drift verification (±300 seconds).
4. Asynchronous job queuing so the webhook returns HTTP 200 in under 150ms.
```
