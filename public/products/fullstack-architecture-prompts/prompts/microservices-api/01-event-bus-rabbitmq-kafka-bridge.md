# Event-Driven Microservices Bridge (RabbitMQ / Kafka / Redis)
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 4 - Microservices Event Bus & Redis Caching Directives

## Directive Prompt
```markdown
Architect a resilient event-driven message bus pipeline in TypeScript/Node.js:
1. **Transactional Outbox Pattern**: Store domain events atomically with business records before publishing.
2. **De-duplication & Idempotency**: Verify unique Message ID via Redis key with TTL before message consumption.
3. **Dead Letter Queue (DLQ)**: Automatic exponential backoff retry (3 attempts) before forwarding to dead-letter storage.
4. **Graceful Shutdown**: Drain in-flight worker jobs upon SIGTERM/SIGINT.
```
