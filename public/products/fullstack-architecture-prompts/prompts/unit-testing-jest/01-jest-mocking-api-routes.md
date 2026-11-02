# Automated Jest & Vitest Unit Test Generator
**Target Models**: Claude 3.7 Sonnet, GPT-4o, DeepSeek-V3
**Category**: Section 5 - Automated Jest & Playwright Test Generators

## Directive Prompt
```markdown
Act as a Senior QA Automation Architect. Generate a 100% test coverage Jest/Vitest test suite:
1. Mock Prisma / MongoDB database queries without hitting live database.
2. Test happy path, boundary conditions, invalid payload rejections, and uncaught exception handling.
3. Parameterized tests using `test.each` for combinatorial edge cases.
4. Assert both return signatures and mock call invocations.
```
