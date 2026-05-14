---
name: assignment-forensics
description: Analyze a frontend take-home assignment before implementation. Extract explicit requirements, hidden evaluation points, user flows, business rules, reliability risks, edge cases, MVP scope, and submission checklist.
---

# Assignment Forensics

Use this before writing any production code for a frontend assignment. This step is for understanding the assignment, not implementing it.

## Hard gate

Do not write code, scaffold a project, install dependencies, or create files during this step. If the assignment is unclear, ask targeted questions or state assumptions before planning implementation.

## What to inspect

- Original assignment text, rubric, API docs, design files, screenshots, and README.
- All page screenshots and Figma/design references when available.
- Required user flows, data fields, validation rules, and submission rules.
- Product context: offline store use, POS/kiosk/table order/payment/order/dashboard behavior.
- Evaluation signals: reliability, maintainability, edge cases, code organization, README clarity.
- Setup implications from design comparison: routes, page states, responsive requirements, styling system, assets, and verification screenshots.

## Output format

### 1. 과제 목표

Restate the assignment goal in one or two sentences. Include the product/user context.

### 2. 명시 요구사항

List explicit requirements from the assignment. Separate UI, data, behavior, styling, testing, and submission requirements when useful.

### 3. 숨은 평가 포인트

Infer likely reviewer expectations. Include reliability, state design, architecture simplicity, accessibility, loading/error/empty states, and README explanation.

### 4. 핵심 사용자 흐름

List the main flows from user intent to result. Include happy path and any blocked/pending states.

### 5. 비즈니스 규칙

Extract rules that affect correctness: validation, ordering, pricing, selection, payment/order state, permissions, filtering, sorting, cache freshness, or retry behavior.

### 6. 안정성 리스크

Identify risks that could break trust in an offline commerce product: duplicate submits, stale data, network failure, slow response, refresh during pending action, invalid API response, disabled state gaps, and inconsistent local state.

### 7. 엣지 케이스

List concrete edge cases the implementation should handle or explicitly document as out of scope.

### 8. 구현 우선순위

#### MVP

Minimum scope needed to satisfy the assignment and demonstrate correctness.

#### Polish

Improvements that strengthen reviewer confidence without expanding product scope.

#### Optional

Only include items that are genuinely optional. Do not let optional work block core reliability.

### 9. 구현 체크리스트

Create a practical checklist that can guide implementation. Include data, UI states, state transitions, API handling, tests, and README tasks.
Include a screenshot/Figma comparison checklist when visual references exist.

### 10. 제출 체크리스트

List final submission checks: install/dev/build/test commands, README decisions, known limitations, screenshots if needed, final diff cleanup, and verification evidence.
