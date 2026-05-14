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
- FSD `entities/` vs `shared/` boundary
- TypeScript safety
- component responsibility
- UX states
- test quality
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
- Build a requirement conflict table when the prompt, README, API docs, or implementation imply different interpretations.

## Smell checklists

FSD boundary smell:

- A page or view component imports API response types directly from an API module.
- Generic errors, config, formatters, shared types, UI, or common mappers live in `entities/`.
- Route shell, page composition, widget logic, and entity logic are mixed in one file.
- Numbered FSD folders physically rename `src/app`; use logical `0_App` documentation instead.

Test quality smell:

- Tests only check static copy, headings, or shallow rendering.
- Tests lock in current broken output as expected behavior.
- Tests assert implementation details instead of user-visible state transitions.
- Page tests ignore loading, error, empty, disabled, retry, pending, and accessibility states.
- Pure logic such as mappers, grouping, formatters, validation, and partial failure loaders lacks regression coverage.

## Output format

### 1. Requirement conflict table

List requirement, possible conflict, chosen interpretation, risk, and README note.

### 2. Critical issues

List Critical issues with why they matter and how to fix them.

### 3. Important improvements

List Important improvements that should be handled before submission when time allows.

### 4. Nice-to-have polish

List Minor polish items.

### 5. RSC / caching review

Review Server Components, Client Components, static rendering, `fetch` cache, `next.revalidate`, ISR, tag/path revalidation, Cache Components when enabled, `no-store`, and over-clientification.
Check that `no-store` is limited to user-specific, permission-specific, payment/order-progress, or always-fresh data.
Check that React Query hydration complements the Next server cache strategy and that `staleTime` does not make stale data linger longer than intended.

### 6. State and re-render review

Review state ownership, derived state, expensive renders, input/list separation, unstable props, and memoization.

### 7. API / FSD boundary review

Review pure API functions, React Query hooks, query keys, types, mappers, error handling, and server/client reuse.
Confirm `entities/` contains only domain API-adjacent code. Flag common utilities, common fetchers, common query wrappers, generic mappers, shared UI, global constants, and API response type leakage into page/view components as Important.

### 8. Test quality review

Review low-value tests, bug-locking tests, missing regression coverage, pure logic coverage, state transition coverage, and accessibility state assertions.

### 9. Edge case review

Review loading, error, empty, disabled, pending, duplicate action, network failure, stale data, and invalid data behavior.

### 10. README / submission review

Review install/dev/build/test instructions, Design Rationale, API / Cache Strategy, React Query Trade-off, FSD Boundary, Error Handling Strategy, Test Strategy, limitations, and verification evidence.

### 11. Recommended patch plan

Provide an ordered patch plan that starts with Critical issues, then Important improvements, then polish.
Group recommended fixes into feature-sized commit candidates when useful.
