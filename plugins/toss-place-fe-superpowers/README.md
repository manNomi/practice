# Toss Place FE Superpowers

## What this is

A Codex skill pack for frontend take-home assignments, inspired by Superpowers, customized for Toss Place style frontend work. It can be used skill-by-skill or as a Codex subagent orchestration workflow.

## Why this exists

This plugin prevents jumping directly into code and instead enforces:

- requirement analysis
- product-focused assignment strategy
- assumptions and trade-off planning
- stack selection
- Next.js RSC/caching decisions
- Simple FSD architecture
- API layer separation
- re-render-aware component boundaries
- React/Next.js performance best-practice review
- test quality review
- reliability review
- review-fix loops
- README rationale writing
- planning feedback loops
- feature-sized commits
- optional parallel subagent orchestration
- optional git delivery subagent for commit/push/PR
- final submission polish

## When to use

Use this plugin when:

- starting a frontend assignment
- deciding between Vite and Next.js
- designing Next.js RSC architecture
- deciding static rendering, ISR, revalidation, and `no-store` boundaries
- designing API and React Query layers
- splitting components
- reviewing React/Next.js performance risks
- reviewing whether tests protect meaningful behavior instead of static copy
- reviewing code before submission
- writing README design rationale, test strategy, and verification evidence
- planning a non-trivial implementation before coding
- running an end-to-end assignment workflow with explicitly requested parallel agents
- repeating review, fix, and verification loops after implementation
- committing verified work in feature-sized slices
- pushing a branch or opening a PR after verification

## Skill workflow

### Manual skill workflow

Use this when you want to control each step yourself:

1. `$toss-place-fe-superpowers:planning-feedback-loop`
2. `$toss-place-fe-superpowers:product-assignment-strategist`
3. `$toss-place-fe-superpowers:assignment-forensics`
4. `$toss-place-fe-superpowers:stack-setup-planner`
5. `$toss-place-fe-superpowers:next-rsc-architect`
6. `$toss-place-fe-superpowers:simple-fsd-architect`
7. `$toss-place-fe-superpowers:api-layer-designer`
8. `$toss-place-fe-superpowers:component-boundary-planner`
9. `$toss-place-fe-superpowers:reliability-first-planner`
10. `$toss-place-fe-superpowers:react-best-practices`
11. `$toss-place-fe-superpowers:toss-fe-code-review`
12. `$toss-place-fe-superpowers:test-quality-reviewer`
13. `$toss-place-fe-superpowers:offline-edge-case-checker`
14. `$toss-place-fe-superpowers:readme-rationale-writer`
15. `$toss-place-fe-superpowers:final-submit-polisher`
16. `$toss-place-fe-superpowers:commit-push-pr-agent`

When this plugin is installed through a Codex marketplace, use the namespaced skill names above.

### Planning-first workflow

Use this before implementation when the task is non-trivial and you want to refine the direction with feedback:

1. `$toss-place-fe-superpowers:planning-feedback-loop`
2. Confirm or revise the plan.
3. Continue with the manual workflow or the end-to-end orchestrator workflow.

The planning feedback loop restates the goal, drafts a plan, asks for focused feedback, revises the plan, reviews risk and validation, and only then finalizes an executable plan.

### Product-focused assignment workflow

Use this when the assignment may evaluate existing codebase adaptation, product judgment, assumptions, trade-offs, reviewer-readable code, README quality, or AI usage verification:

1. `$toss-place-fe-superpowers:planning-feedback-loop`
2. `$toss-place-fe-superpowers:product-assignment-strategist`
3. `$toss-place-fe-superpowers:assignment-forensics`

The product assignment strategist treats Toss-style context as likely evaluation context, not official fact. It forces assumptions, trade-offs, existing codebase inspection, and README strategy before implementation.

### End-to-end orchestrator workflow

Use this when you explicitly want Codex to coordinate multiple agents, parallel work slices, review-fix loops, verification, and final polish:

1. `$toss-place-fe-superpowers:parallel-assignment-runner`
2. `$toss-place-fe-superpowers:review-fix-loop`
3. `$toss-place-fe-superpowers:final-submit-polisher`
4. `$toss-place-fe-superpowers:commit-push-pr-agent` when commit, push, or PR delivery is explicitly requested

The parallel runner uses Codex subagents only when you explicitly ask for parallel agents, multiple agents, an agent team, delegated work, or a review loop. It keeps the main thread responsible for critical-path decisions, integration, verification, and final reporting.

## Example prompts

### `$toss-place-fe-superpowers:planning-feedback-loop`

```text
$toss-place-fe-superpowers:planning-feedback-loop
이 프론트엔드 과제 구현 전에 목표, 범위, 설계 방향, 리스크, 검증 방법을 피드백 루프로 정리해줘.
```

```text
$toss-place-fe-superpowers:planning-feedback-loop
Before implementation, help me refine the goal, scope, architecture direction, risks, and validation plan through a feedback loop.
```

### `$toss-place-fe-superpowers:parallel-assignment-runner`

```text
Use parallel-assignment-runner to complete this frontend assignment with parallel agents, review-fix loops, verification, and final submission polish.
```

```text
parallel-assignment-runner로 이 프론트엔드 과제를 병렬 에이전트, 리뷰-수정 루프, 검증, 최종 제출 polish까지 진행해줘.
```

### `$toss-place-fe-superpowers:review-fix-loop`

```text
$toss-place-fe-superpowers:review-fix-loop
Review the current implementation, fix Critical and requirement/correctness/reliability Important findings, and re-run verification up to 3 times.
```

### `$toss-place-fe-superpowers:product-assignment-strategist`

```text
$toss-place-fe-superpowers:product-assignment-strategist
이 제품 중심 프론트엔드 과제를 기존 코드베이스 적응, 가정, 트레이드오프, README 제출 전략까지 포함해서 분석해줘.
```

### `$toss-place-fe-superpowers:commit-push-pr-agent`

```text
Use commit-push-pr-agent to create feature-sized commits, push the branch, and open a PR after verification.
```

```text
검증이 끝난 변경분을 기능 단위로 커밋하고 push/PR까지 전담 subagent로 처리해줘.
```

### `$toss-place-fe-superpowers:assignment-forensics`

```text
$toss-place-fe-superpowers:assignment-forensics
Analyze this take-home assignment. Extract the MVP, hidden evaluation points, Toss Place reliability risks, and submission checklist.
```

### `$toss-place-fe-superpowers:stack-setup-planner`

```text
$toss-place-fe-superpowers:stack-setup-planner
Decide whether this assignment should use Vite or Next.js, Tailwind or Emotion, React Query or plain fetch, and which test setup is enough.
```

### `$toss-place-fe-superpowers:next-rsc-architect`

```text
$toss-place-fe-superpowers:next-rsc-architect
For this Next.js App Router assignment, decide what stays server-side, what needs client boundaries, and how caching should work.
```

```text
$toss-place-fe-superpowers:next-rsc-architect
Plan cache-efficient Next.js architecture using static rendering, ISR, tag/path revalidation, no-store only where necessary, and React Query hydration where useful.
```

### `$toss-place-fe-superpowers:simple-fsd-architect`

```text
$toss-place-fe-superpowers:simple-fsd-architect
Design a lightweight folder structure for this assignment without creating architecture-only folders.
```

### `$toss-place-fe-superpowers:api-layer-designer`

```text
$toss-place-fe-superpowers:api-layer-designer
Separate pure API functions, React Query hooks, query keys, types, and mappers for this assignment.
```

### `$toss-place-fe-superpowers:component-boundary-planner`

```text
$toss-place-fe-superpowers:component-boundary-planner
Split components by state ownership, Server/Client boundaries, and re-render risk.
```

### `$toss-place-fe-superpowers:react-best-practices`

```text
$toss-place-fe-superpowers:react-best-practices
Review this Next.js assignment with react-best-practices and prioritize waterfalls, bundle size, RSC boundaries, cache strategy, and re-render risks.
```

### `$toss-place-fe-superpowers:test-quality-reviewer`

```text
$toss-place-fe-superpowers:test-quality-reviewer
Review these tests for low-value copy checks, bug-locking expectations, missing regression coverage, pure logic coverage, and accessibility states.
```

### `$toss-place-fe-superpowers:readme-rationale-writer`

```text
$toss-place-fe-superpowers:readme-rationale-writer
Draft README rationale sections for Design Rationale, API / Cache Strategy, React Query Trade-off, FSD Boundary, Error Handling Strategy, Test Strategy, Known Limitations, and Verification Evidence.
```

### `$toss-place-fe-superpowers:reliability-first-planner`

```text
$toss-place-fe-superpowers:reliability-first-planner
Create an implementation plan that covers loading, error, empty, disabled, pending, retry, and duplicate action prevention.
```

### `$toss-place-fe-superpowers:toss-fe-code-review`

```text
$toss-place-fe-superpowers:toss-fe-code-review
Review this diff and prioritize requirement gaps, reliability risks, state boundaries, API layer issues, and README weaknesses.
```

### `$toss-place-fe-superpowers:offline-edge-case-checker`

```text
$toss-place-fe-superpowers:offline-edge-case-checker
Test this assignment against POS, kiosk, table order, payment/order, slow network, duplicate submit, and stale data scenarios.
```

### `$toss-place-fe-superpowers:final-submit-polisher`

```text
$toss-place-fe-superpowers:final-submit-polisher
Check README, scripts, verification commands, trade-offs, limitations, final diff quality, and final message before submission.
```

## Design principles

- Server Component by default.
- Client Component only when necessary.
- Keep `app/` as folder routing and delegate real page composition to `views/`.
- Keep state as low as possible.
- Cache what can be cached.
- Prefer static rendering, `force-cache`, `revalidate`, ISR, and tag/path revalidation for public or periodically changing data.
- Reserve `no-store` for user-specific, permission-specific, payment/order-progress, or always-fresh data.
- Prefer React Query hydration when server-prefetched data should be consumed by client widgets through hooks.
- Align React Query `staleTime` with the Next.js server cache strategy.
- Review React performance in impact order: waterfalls, bundle size, RSC/cache/data fetching, then re-renders.
- Review tests by behavior value: regression, state transition, pure logic, accessibility, and failure modes before static copy.
- Separate pure API functions from React Query hooks.
- Keep query option factories reusable across `prefetchQuery`, hydration, and hooks.
- Use Simple FSD without over-engineering.
- Keep `entities/` limited to domain API functions, query options/hooks, API-bound types, and API response mappers.
- Put common utilities, fetchers, query helpers, UI, config, and constants in `shared/`.
- Split component boundaries based on state ownership and re-rendering.
- Plan non-trivial work before implementation and ask for focused feedback.
- Treat Toss-style assignment context as inference, not official fact.
- Record unclear requirements as assumptions and ask for feedback before implementation.
- Document assumptions, trade-offs, exception handling, AI usage, and verification in README.
- Include Design Rationale, API / Cache Strategy, React Query Trade-off, FSD Boundary, Error Handling Strategy, Test Strategy, Known Limitations, and Verification Evidence in README when relevant.
- Ask for all page screenshots and Figma/design references before large UI implementation.
- Use Codex subagents only when parallel/delegated work is explicitly requested.
- Give each worker a disjoint write scope.
- Run review-fix loops until stop conditions are met or risks are reported.
- Commit verified work in feature-sized slices when git delivery is requested.
- Use a git delivery subagent for commit, push, and PR only after verification.
- Prioritize reliability, maintainability, and clear trade-offs.
- Prefer small, reviewer-readable architecture over impressive abstractions.

## Limitations

- This does not guarantee passing an assignment.
- This is a workflow guide, not a replacement for engineering judgment.
- Adapt every recommendation to the actual assignment requirements.
- The plugin is Codex-first and does not include hooks, MCP servers, assets, or non-Codex platform support.
- This is not a new agent runtime; it is a Codex subagent orchestration workflow.
- The git delivery agent is a skill workflow, not a new git runtime.
- Parallel work can increase token and time cost.
- If worker write scopes overlap, the main thread must stop and coordinate before continuing.
- Feature-sized commits depend on a clean diff and clear slice boundaries.
