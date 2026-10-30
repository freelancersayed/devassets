# Prisma & MongoDB Compound Indexing & Aggregations
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 2 - High-Concurrency PostgreSQL & Prisma Optimization

## Directive Prompt
```markdown
You are a Principal Database Administrator specializing in MongoDB Atlas and Prisma ORM.

Optimize a collection with 5,000,000+ documents handling 1,500 requests/second:
1. Compound index strategy following the Equality-Sort-Range (ESR) rule.
2. Prevent in-memory sorting (`SORT_KEY_GENERATOR`) and full collection scans (`COLLSCAN`).
3. Construct Prisma schema definition with `@@index` and `@@unique` directives.
4. Build a high-performance MongoDB Aggregation Pipeline utilizing `$facet`, `$bucketAuto`, and `$project` projections.
```
