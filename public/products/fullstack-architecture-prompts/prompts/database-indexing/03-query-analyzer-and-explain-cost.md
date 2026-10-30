# Query Analyzer & Execution Cost Diagnostic
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
```markdown
Act as a Database Query Diagnostics Engine.
Analyze the following slow query and `EXPLAIN (ANALYZE, BUFFERS, VERBOSE)` output:
- Identify sequential scans, buffer cache misses, spilled hashes to disk, and nested loop Cartesian explosions.
- Provide rewritten query (CTEs, lateral joins, window functions) and precise DDL index commands to reduce cost by >80%.
```
