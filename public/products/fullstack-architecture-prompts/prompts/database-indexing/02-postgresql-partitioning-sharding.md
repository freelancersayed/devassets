# PostgreSQL Partitioning & Vacuum Tuning
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
```markdown
You are a PostgreSQL Performance Engineer.
Design a time-series or high-volume transactional schema using PostgreSQL 16 Declarative Table Partitioning:
1. Range partitioning by month (`PARTITION BY RANGE (created_at)`).
2. Automated partition creation script or pg_partman maintenance configuration.
3. Autovacuum tuning for high-write tables: `autovacuum_vacuum_scale_factor = 0.05`, `autovacuum_vacuum_cost_limit = 2000`.
4. Index inheritance and BRIN (Block Range Index) for append-only log tables.
```
