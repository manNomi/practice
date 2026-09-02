---
name: planning-feedback-loop
description: Create, refine, and validate an executable plan before implementation when the user explicitly asks for planning, a planning feedback loop, design review, architecture planning, refactoring plans, migration planning, plugin design, AI workflow design, or pre-execution validation.
---

# Planning Feedback Loop

Use this when the user explicitly asks for planning, plan feedback, design review, architecture planning, migration planning, refactoring plans, plugin design, AI workflow design, or validation before execution.

This skill is for planning first. It does not implement the plan unless the user later asks to proceed.

## Hard gate

- Do not jump directly into implementation for non-trivial work.
- Produce a plan and give the user a chance to correct the direction before execution.
- For tiny tasks such as typo fixes or term explanations, use the shortened loop.
- Do not ask vague questions like "어떻게 할까요?"
- Propose a concrete default direction, state assumptions, and ask for focused feedback.
- A plan is not complete unless it includes goal, scope, execution order, assumptions, risks, trade-offs, feedback points, and validation.
- For UI assignments, ask for all page screenshots and design/Figma references during planning when available.
- Include a design comparison routine before implementation: page inventory, screenshot inventory, Figma/design matching, and setup implications.
- If the plan changes during implementation, pause and update the plan before continuing.
- If the user says "그냥 진행해", proceed from the best current plan.

## When to use Short Planning Mode

Use Short Planning Mode for medium-sized tasks where the intent is mostly clear:

- focused feature work
- small refactors
- README or documentation changes
- moderate UI changes
- single workflow improvements

## Short Planning Mode format

```markdown
## 제가 이해한 목표

- 목표:
- 만들고 싶은 결과물:
- 중요한 제약:
- 현재 제가 둔 가정:

## 초안 계획

1.
2.
3.

## 피드백 받고 싶은 부분

-
-

## 리스크와 검증 방법

- 리스크:
- 검증:

이 방향으로 진행하면 될까요?
```

## When to use Deep Planning Mode

Use Deep Planning Mode for large, ambiguous, or high-impact work:

- new project setup
- architecture redesign
- plugin design
- AI agent workflow design
- migration
- production-level refactoring
- long-term maintainability decisions
- multi-file frontend/backend/full-stack changes

## Deep Planning Mode format

```markdown
## 1. 목표 정의

## 2. 현재 상황 이해

## 3. 핵심 설계 결정

## 4. 단계별 실행 계획

## 5. 예상 구조

## 6. 리스크와 대안

## 7. 검증 방법

## 8. 피드백 요청
```

## Planning loop

### Step 1. Restate the goal

Start by making your understanding explicit.

```text
제가 이해한 목표는 다음과 같습니다.
- 목표:
- 만들고 싶은 결과물:
- 중요한 제약:
- 현재 제가 둔 가정:
```

If something is unclear, do not stop with a vague question. Make a reasonable assumption and state how the plan would change if that assumption is wrong.

Example:

```text
우선 Next.js App Router 기반 프로젝트라고 가정하고 계획을 세우겠습니다.
다르면 렌더링/캐싱 전략만 Vite 기준으로 바꾸면 됩니다.
```

### Step 2. Create a draft plan

The draft plan must include:

- overall direction
- step-by-step process
- major decisions
- expected output
- validation method
- possible risks
- points where user feedback is needed

Use this shape:

```markdown
초안 계획입니다.

1. 목표 정리
2. 현재 구조 또는 요구사항 확인
3. 핵심 설계 방향 결정
4. 단계별 실행 계획 작성
5. 검증 방법 정의
6. 리스크와 대안 정리

피드백이 필요한 부분:
-
-
```

### Step 3. Ask for feedback

Stop after the draft plan. Do not implement yet.

Ask with clear focus points or choices:

```text
현재는 유지보수성을 우선해서 파일 구조를 분리하는 방향으로 잡았습니다.
속도를 우선한다면 더 단순한 구조로 바꿀 수 있습니다.
설계 방향, 범위, 검증 방식 중 수정하고 싶은 부분이 있으면 알려주세요.
```

### Step 4. Revise the plan

When the user gives feedback, show what changed.

```markdown
피드백을 반영해 계획을 수정했습니다.

변경된 점:
- 기존:
- 수정:
- 이유:

수정된 계획:
1.
2.
3.
```

If the feedback creates a trade-off, state it briefly:

```text
이 방향은 구현 속도는 빠르지만 이후 확장성은 조금 떨어질 수 있습니다.
현재 단계에서는 간단한 구조로 시작하되, 확장 포인트만 열어두겠습니다.
```

### Step 5. Review the plan

Before finalizing, review the plan from multiple angles:

- Is the goal clear?
- Is the scope too broad?
- Are there hidden assumptions?
- Are dependencies missing?
- Is the order executable?
- Is there a validation method?
- Are risks visible?
- Does the plan match the user's preference?

Use this format:

```markdown
계획 검토 결과입니다.
- 목표 명확성:
- 범위:
- 리스크:
- 검증 방법:
- 보완한 부분:
```

### Step 6. Finalize the plan

Finalize compactly only after the plan has been reviewed.

```markdown
최종 계획입니다.

1.
2.
3.
4.

검증 방법:
-

주의할 점:
-
```

## Software development planning checklist

For frontend, backend, or full-stack plans, include:

- folder structure
- API boundaries
- `entities/` vs `shared/` boundaries
- data flow
- state management
- rendering strategy
- caching strategy
- test strategy
- error handling
- maintainability
- page screenshot and Figma/design comparison plan

For React/Next.js plans, check:

- Can this be handled with Server Components?
- Is the reason for each Client Component explicit?
- Can state move lower in the tree?
- Can public or rarely changing pages be static or cacheable?
- Can ISR, `fetch(..., { cache: "force-cache" })`, `next: { revalidate }`, or server-side fetching be used?
- Does mutation require `next.tags`, `revalidateTag`, `revalidatePath`, or Server Action `updateTag`?
- Is `no-store` limited to user-specific, permission-specific, payment/order-progress, or always-fresh data?
- If the project uses Next Cache Components, should `use cache`, `cacheLife`, or `cacheTag` be part of the plan?
- Can React Query hydration let client widgets call hooks where data is needed?
- Is React Query hydration aligned with the Next server cache strategy instead of replacing it?
- Is `app/` only a folder-routing shell that imports the real page from `views/`?
- Can pure API functions and query hooks be separated?
- Are `entities/` limited to domain API functions, query options/hooks, API-bound types, and API response mappers?
- Are common utilities, common fetchers, common query helpers, formatters, UI, and constants moved to `shared/`?
- Are component responsibilities clear?
- Is there unnecessary re-render risk?

For the preferred Simple FSD structure, plan this default:

```tsx
import { HomePage } from "@/views/home/HomePage";

export default function Page() {
  return <HomePage />;
}
```

`app/` owns folder routing only. Real page composition belongs in `views/` by default.

For API plans, check:

- Are pure call functions separated from query/mutation hooks?
- Are query option factories reusable by `prefetchQuery`, hydration, and hooks?
- Can the structure fit `entities/{domain}/api` or a simpler equivalent?
- Is every file in `entities/` tied to one domain API?
- Are common helpers planned under `shared/util`, `shared/api`, `shared/ui`, `shared/config`, or `shared/constants`?
- Are error types and response types clear enough?
- Are server state and client state kept separate?

For git delivery planning, check:

- What are the feature-sized commit groups?
- Which verification commands must pass before each commit group?
- Is README/final polish separate from implementation commits when possible?
- Should a git delivery subagent handle commit, push, and PR after verification?

## Design setup routine

For frontend assignments with visual requirements, add this planning step:

1. Ask for all page screenshots, design exports, or Figma links before implementation.
2. Build a page inventory: route, viewport, primary states, empty/error/loading states.
3. Compare each page against the design: layout, spacing, typography, colors, interactions, responsive behavior.
4. Turn differences into setup decisions: styling system, tokens, shared UI primitives, layout constraints, image assets, and manual QA screenshots.
5. Include screenshot/design comparison in the validation plan.

## Quality checklist

A plan is ready only when all are true:

- The goal is clear.
- The scope is explicit.
- The execution order is defined.
- Assumptions are stated.
- Risks are visible.
- Trade-offs are explained.
- User feedback has been requested.
- Validation method is defined.
- The final plan can be executed step by step.

If any item is missing, continue the planning loop.
