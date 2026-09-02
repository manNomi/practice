---
name: product-assignment-strategist
description: Analyze and plan product-focused frontend take-home assignments before implementation, especially when an existing codebase, design system, mock API, assumptions, trade-offs, README decisions, or reviewer-friendly code are important.
---

# Product Assignment Strategist

Use this before implementation for product-focused frontend assignments. Treat Toss-related context as inference, not official fact. Never claim "Toss evaluates X" as certain. Say "this is likely to be evaluated" or "this is a reasonable assumption for a product-focused assignment."

## Hard gates

- Do not implement before analyzing requirements and the existing codebase.
- Do not replace existing architecture without evidence.
- Do not ignore provided design system components.
- Do not hide unclear requirements. Record them as assumptions.
- Do not optimize rare edge cases with heavy abstractions unless the product risk justifies it.
- Do not claim completion without verification.
- Treat README as part of the submitted product.

## Workflow

1. Read the assignment prompt, README, TODOs, API docs, screenshots, and design references.
2. Inspect the existing codebase before planning: routing, page structure, components, design system, API/mock layer, state management, tests, and scripts.
3. Infer the product domain and user flow.
4. Separate explicit requirements from likely reviewer expectations.
5. Draft assumptions and trade-offs.
6. Ask the user to confirm or revise assumptions before implementation.
7. Plan implementation using existing patterns first.
8. Cover loading, error, empty, disabled, pending, retry, duplicate submit, mobile, and accessibility states.
9. Define deterministic and manual verification.
10. Plan README sections for assumptions, decisions, trade-offs, exception handling, AI usage, and verification.

## Codebase adaptation rules

- Prefer existing routing, component, state, API, and test patterns.
- Use design system components first.
- Add abstractions only when repeated behavior or domain boundaries justify them.
- Keep reviewer-readable code over clever code.
- In Next.js, keep `app/` as routing shell and put real page composition in `views/`.
- Keep `entities/` limited to domain API-adjacent code. Put common utilities, fetchers, query helpers, UI, config, and constants in `shared/`.

## User feedback checkpoints

Ask for feedback before implementation on:

- assumptions that affect behavior
- trade-offs that change UX or complexity
- rare edge cases intentionally simplified
- whether README should document a limitation or implement a fix
- whether existing patterns should be followed even if a new pattern seems cleaner

## README rules

README should include:

- 구현한 내용
- 실행 방법
- 요구사항 충족 여부
- 제가 둔 가정
- 주요 의사결정
- 트레이드오프
- 예외 케이스 처리
- 테스트 방법
- AI 사용 여부와 검증 방식
- 시간이 더 있다면 개선할 점

Assumptions should explain product reasoning, not excuses.
Trade-offs should explain why a simpler implementation is acceptable.

## Output format

### 1. 과제 맥락과 주의할 가정

State that Toss-style context is treated as likely evaluation context, not official fact.

### 2. 요구사항 해석

Separate explicit requirements from unclear requirements.

### 3. 기존 코드베이스 조사 계획

List files, patterns, scripts, design system, API/mock, and test setup to inspect before coding.

### 4. 도메인 / 사용자 플로우 추론

Describe the user goal, happy path, blocked states, and completion/failure flow.

### 5. 평가될 가능성이 높은 요소

List likely evaluation signals: codebase adaptation, product judgment, assumptions, trade-offs, reliability, reviewer-readable code, and verification.

### 6. 제가 둘 가정 초안

Write concrete assumptions that can go into README.

### 7. 트레이드오프 초안

Write concrete trade-offs that can go into README.

### 8. 구현 전략

Plan the smallest implementation that respects existing patterns and handles important UX states.

### 9. 검증 전략

List build/lint/typecheck/test/manual checks and design comparison when relevant.

### 10. README 작성 계획

Map implementation decisions to README sections.

### 11. 사용자 피드백이 필요한 지점

Ask focused questions or present choices. Do not ask vague questions.

### 12. 제출 전 체크리스트

List requirement, codebase consistency, UX states, edge cases, verification, README, and final diff checks.
