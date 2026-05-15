---
name: reliability-first-planner
description: Create a reliability-first implementation plan for a frontend assignment, focusing on correctness, failure states, duplicate action prevention, stable state transitions, and maintainable UI logic.
---

# Reliability First Planner

Use this before implementation when the assignment has user actions, API calls, order/payment-like flows, forms, or critical UI states.

## Focus areas

- loading state
- error state
- empty state
- disabled state
- pending state
- retry flow
- duplicate click prevention
- network failure handling
- rollback or recovery
- validation
- stable state transitions
- manual verification scenarios

## Reliability rules

- Every critical action needs pending and disabled behavior.
- Every API-dependent view needs loading, error, empty, and success states.
- Duplicate submit prevention must be visible in UI and enforced in logic.
- State transitions should be explicit enough to test manually.
- Keep domain rules outside JSX when they grow.
- Prefer simple recovery paths over complex optimistic behavior unless required.

## Output format

### 1. Reliability goals

Define what must not break for users and reviewers.

### 2. Critical user flows

List flows that deserve the most careful implementation.

### 3. Failure scenarios

List network, API, validation, empty, stale, duplicate, and partial failure scenarios.

### 4. State transition plan

Describe allowed transitions for key UI/domain states.

### 5. Duplicate action prevention

Specify button disabled rules, pending guards, idempotency assumptions, and user feedback.

### 6. Error recovery

Define retry, reset, rollback, refresh, and fallback behavior.

### 7. Validation strategy

List client validation, server/API validation handling, and invalid data handling.

### 8. Manual QA checklist

Create concrete manual scenarios with expected results.

### 9. Implementation order

Order work so risky flows and state handling are built before visual polish.

### 10. README notes

List reliability decisions and limitations to explain in the final README.
