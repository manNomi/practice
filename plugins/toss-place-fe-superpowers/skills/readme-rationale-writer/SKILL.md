---
name: readme-rationale-writer
description: Write or review a frontend assignment README so it explains design rationale, API and cache strategy, React Query trade-offs, FSD boundaries, error handling, test strategy, known limitations, verification evidence, and AI usage validation.
---

# README Rationale Writer

Use this after implementation decisions are known, before final submission, or when the README explains what was built but not why it was built that way.

## Core principle

For product-focused assignments, the README is part of the submission. It should help a reviewer understand judgment, trade-offs, verification, and residual risk.

## Required sections

Include these sections unless the existing assignment template explicitly forbids them:

- `Design Rationale`
- `API / Cache Strategy`
- `React Query Trade-off`
- `FSD Boundary`
- `Error Handling Strategy`
- `Test Strategy`
- `Known Limitations`
- `Verification Evidence`

Also include assignment basics when missing:

- implemented scope
- run commands
- requirement coverage
- assumptions
- AI usage and human verification method

## Writing rules

- Explain why, not only what.
- If React Query is not used despite being available, say why. React Query non-use is acceptable; unexplained non-use is a review risk.
- Tie cache decisions to data freshness: RSC, static rendering, `force-cache`, `revalidate`, ISR, tag/path invalidation, or `no-store`.
- Explain FSD boundaries: `app` as route shell, `views` as page composition, `entities` as domain API-adjacent code, `shared` for common code.
- Explain error handling by user action: retry, fallback, disabled state, partial failure, or documented limitation.
- Include verification evidence with exact commands and results.
- Do not hide limitations. State why the chosen trade-off is acceptable for the assignment scope.

## Output format

### 1. README gap analysis

List missing or weak rationale sections.

### 2. Design Rationale

Draft the reasoning behind architecture, component boundaries, and existing codebase adaptation.

### 3. API / Cache Strategy

Draft the data fetching, cache freshness, RSC/ISR, and `no-store` explanation.

### 4. React Query Trade-off

Explain where React Query is used or why it is intentionally not used.

### 5. FSD Boundary

Explain `app`, `views`, `widgets`, `entities`, and `shared` responsibilities for this submission.

### 6. Error Handling Strategy

Explain loading, error, empty, retry, disabled, pending, duplicate action, and partial failure behavior.

### 7. Test Strategy

Explain which tests protect requirements, pure logic, state transitions, and accessibility.

### 8. Known Limitations

List honest limitations and why they are acceptable.

### 9. Verification Evidence

List commands, results, manual checks, screenshots/design comparison, and AI usage verification.
