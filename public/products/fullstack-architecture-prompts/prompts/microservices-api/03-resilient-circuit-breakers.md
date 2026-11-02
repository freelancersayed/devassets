# Resilient Circuit Breakers & Fallback Strategies
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
```markdown
Implement the Circuit Breaker pattern for downstream third-party REST/gRPC API calls in TypeScript:
1. States: Closed, Open, Half-Open.
2. Failure threshold: 50% failures over a 10-second rolling sliding window.
3. Half-open canary trial: Allow 3 trial requests after 30 seconds cooldown.
4. Graceful degraded fallback: Serve stale Redis cache or default mock data when circuit is open.
```
