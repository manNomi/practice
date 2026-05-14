---
name: toss-fe-code-review
description: Review frontend code like a Toss Place frontend reviewer, prioritizing correctness, reliability, maintainability, state boundaries, RSC usage, API layer design, and edge cases.
---

# Toss FE Code Review

Use this before submission or after implementing a meaningful slice. Prioritize risks over praise. Focus on what could fail in a Toss Place style frontend assignment.

## Review categories

- requirement completeness
- correctness
- reliability
- state ownership
- re-render risk
- Server/Client Component boundary
- caching strategy
- React Query usage
- API layer separation
- TypeScript safety
- component responsibility
- UX states
- accessibility
- unnecessary dependencies
- README explanation

## Severity

- Critical: must fix before submission because it can break core requirements, payment/order-like reliability, or build/runtime correctness.
- Important: should fix because it weakens maintainability, architecture, state correctness, or reviewer confidence.
- Minor: polish that improves clarity but does not block submission.

## Review rules

- Do not lead with general praise.
- Cite concrete files, components, flows, or code patterns when possible.
- Separate requirement gaps from implementation quality.
- Check README and verification, not only code.
- Recommend a patch plan that fixes the highest-risk items first.

## Output format

### 1. Critical issues

List Critical issues with why they matter and how to fix them.

### 2. Important improvements

List Important improvements that should be handled before submission when time allows.

### 3. Nice-to-have polish

List Minor polish items.

### 4. RSC / caching review

Review Server Components, Client Components, `fetch` cache, `revalidate`, ISR, `no-store`, and over-clientification.

### 5. State and re-render review

Review state ownership, derived state, expensive renders, input/list separation, unstable props, and memoization.

### 6. API layer review

Review pure API functions, React Query hooks, query keys, types, mappers, error handling, and server/client reuse.

### 7. Edge case review

Review loading, error, empty, disabled, pending, duplicate action, network failure, stale data, and invalid data behavior.

### 8. README / submission review

Review install/dev/build/test instructions, decisions, trade-offs, limitations, and verification evidence.

### 9. Recommended patch plan

Provide an ordered patch plan that starts with Critical issues, then Important improvements, then polish.
