---
name: parallel-assignment-runner
description: Orchestrate a frontend take-home assignment with Codex subagents only when the user explicitly asks for parallel agents, an agent team, multiple agents, delegated parallel work, review loops, or an end-to-end assignment execution workflow.
---

# Parallel Assignment Runner

Use this only when the user explicitly asks for parallel agents, multiple agents, an agent team, delegated work, review loops, or end-to-end assignment execution. For normal assignment help, use the focused skills one by one instead.

This skill does not create a new runtime. It is a Codex subagent orchestration workflow for frontend assignments.

## Hard gates

- Do not spawn subagents unless the user explicitly requested parallel or delegated agent work.
- The main thread owns assignment understanding, critical-path decisions, integration, final verification, and final reporting.
- Do not delegate the immediate blocker if the main thread needs the answer before doing the next step.
- Delegate only independent slices that can run in parallel.
- Every worker must have a disjoint write scope.
- Never assign the same file to multiple workers at the same time.
- Tell every worker: "You are not alone in the codebase. Do not revert edits made by others. Adjust your work to accommodate other changes."
- Worker output is not final. The main thread must inspect, integrate, and verify it.
- Reviewer agents must be read-only unless the user explicitly asks otherwise.
- Never claim the result is perfect. Report residual risk honestly.

## Related skills

Use these skills as checkpoints inside the orchestration:

- `$toss-place-fe-superpowers:assignment-forensics` (`$assignment-forensics`)
- `$toss-place-fe-superpowers:stack-setup-planner` (`$stack-setup-planner`)
- `$toss-place-fe-superpowers:next-rsc-architect` (`$next-rsc-architect`)
- `$toss-place-fe-superpowers:simple-fsd-architect` (`$simple-fsd-architect`)
- `$toss-place-fe-superpowers:api-layer-designer` (`$api-layer-designer`)
- `$toss-place-fe-superpowers:component-boundary-planner` (`$component-boundary-planner`)
- `$toss-place-fe-superpowers:reliability-first-planner` (`$reliability-first-planner`)
- `$toss-place-fe-superpowers:toss-fe-code-review` (`$toss-fe-code-review`)
- `$toss-place-fe-superpowers:offline-edge-case-checker` (`$offline-edge-case-checker`)
- `$toss-place-fe-superpowers:final-submit-polisher` (`$final-submit-polisher`)
- `$toss-place-fe-superpowers:review-fix-loop` (`$review-fix-loop`)
- `$toss-place-fe-superpowers:commit-push-pr-agent` (`$commit-push-pr-agent`)

## Workflow

1. Understand the assignment and existing code before editing.
2. Summarize MVP, hidden evaluation points, and reliability risks.
3. Choose stack, architecture, API, state, and component boundary strategy.
4. Decompose work into independent slices.
5. Define each worker's responsibility and allowed write scope.
6. Run workers in parallel only for independent slices.
7. Integrate worker results in the main thread.
8. Run deterministic verification commands.
9. Run a read-only reviewer agent.
10. Fix Critical findings and requirement/correctness/reliability Important findings.
11. Re-run verification and repeat the review-fix loop up to 3 times.
12. Polish final submission and report residual risk.
13. When the user requests git delivery, hand verified feature-sized commit groups to `$toss-place-fe-superpowers:commit-push-pr-agent`.

## Slice design

Prefer slices like:

- API/domain layer: pure API functions, query keys, mappers, types.
- Server/data architecture: Server Components, caching, ISR/revalidate, request freshness.
- Client interaction: small Client Component boundaries, forms, local state, pending/disabled states.
- UI states: loading, error, empty, invalid, long text, responsive layout.
- README/submission: setup commands, decisions, trade-offs, verification evidence.

Avoid slices that overlap on the same page component, shared provider, package config, or README unless the main thread owns that file and integrates worker findings manually.

## Feature-sized commit discipline

- Workers do not commit.
- The main thread integrates worker output, verifies, and groups changes by feature slice.
- Commit groups should be coherent slices such as API layer, UI interaction, reliability states, tests, or README/final polish.
- Do not commit one file at a time.
- Do not mix unrelated implementation slices in one commit.
- Prefer README/final polish as a separate final commit when it is not documenting one specific feature slice.
- Push and PR creation happen after verification and review-fix loops, not after every worker finishes.

## Worker prompt template

Use one worker per independent slice. Fill in the scope before spawning.

```text
You are Worker <N> for a Toss Place style frontend take-home assignment.

You are not alone in the codebase. Other workers may be editing other files. Do not revert edits made by others. Adjust your implementation to accommodate changes made by others.

Goal:
<specific slice goal>

Assignment context:
<brief requirements, MVP, hidden evaluation points, reliability risks>

Allowed write scope:
- <file or directory>
- <file or directory>

Do not edit outside this scope. If the scope is insufficient, stop and report what is needed instead of editing unrelated files.

Engineering rules:
- Keep state as low as possible.
- Keep Client Component boundaries small.
- Separate pure API functions from React Query hooks.
- Keep `entities/` limited to domain API functions, query options/hooks, API-bound types, and API response mappers.
- Put common utilities, fetchers, query helpers, UI, config, and constants in `shared/`.
- Avoid unnecessary dependencies.
- Cover loading, error, empty, disabled, and pending states when relevant.
- Do not hide domain mapping or business rules inside JSX.
- Do not commit or push. The main thread will integrate, verify, and delegate git delivery separately.

Verification:
<commands this worker can run, or say "do not run full verification; main thread will verify">

Final response:
- Files changed
- What was implemented
- Verification run and result
- Risks, assumptions, and anything the main thread must integrate
```

## Reviewer prompt template

Use after integration and deterministic verification. The reviewer must not edit files.

```text
You are a read-only reviewer for a Toss Place style frontend take-home assignment.

Do not edit files. Review the current implementation, diff, README, and verification evidence.

Prioritize findings over praise. Use this severity model:
- Critical: must fix before submission because it can break core requirements, reliability, build, runtime, or major user flow correctness.
- Important: should fix before submission if related to requirement completeness, correctness, reliability, state ownership, RSC/caching, API separation, or build/runtime behavior.
- Minor: polish or clarity improvements that can be reported if time is limited.

Review categories:
- requirement completeness
- correctness
- reliability and duplicate action prevention
- state ownership and re-render risk
- Server/Client Component boundary
- cache/revalidate/no-store strategy
- React Query usage
- API layer separation
- TypeScript safety
- loading/error/empty/disabled/pending states
- offline/store-like edge cases
- README setup and verification accuracy

Output:
### Critical
### Important
### Minor
### Verification gaps
### Recommended fix order
```

## Integration checklist

- Inspect every worker's changed files and final notes.
- Confirm workers stayed inside their write scopes.
- Resolve overlapping assumptions in the main thread.
- Re-read package scripts before running verification.
- Run deterministic verification from a clean integrated state.
- Group verified changes into feature-sized commit candidates.
- Keep a list of residual risks and known limitations.

## Verification

Use commands that exist in the project. Infer the package manager from lockfiles.

Prefer, when available:

- install: `pnpm install`, `yarn install`, or `npm install`
- lint: `pnpm lint`, `yarn lint`, or `npm run lint`
- typecheck: `pnpm typecheck`, `yarn typecheck`, or `npm run typecheck`
- test: `pnpm test`, `yarn test`, or `npm test`
- build: `pnpm build`, `yarn build`, or `npm run build`

Do not invent scripts. If a script is missing, report that it is missing and choose the closest available deterministic check.

## Review-fix loop

- Maximum loop count: 3.
- In each loop, run verification, review findings, patch the highest-risk issues, and re-run verification.
- Critical findings must be fixed.
- Important findings must be fixed when they affect requirements, correctness, reliability, build, runtime, data flow, or submission instructions.
- Minor findings may be fixed if low risk, otherwise report them.
- Stop early when the stop condition is met.

## Stop condition

Stop only when all are true:

- Build passes, when a build command exists.
- Test, typecheck, and lint pass, when those commands exist.
- No Critical findings remain.
- No Important findings remain for requirements, correctness, reliability, build, runtime, or README run instructions.
- README install/dev/build/test instructions are accurate.
- Remaining Minor findings are listed in the final report.
- Residual risks are stated without exaggerating confidence.
- Feature-sized commit groups are identified when git delivery is requested.

## Output format

### 1. Assignment understanding

Summarize the goal, MVP, hidden evaluation points, and reliability risks.

### 2. Orchestration plan

State what the main thread owns, what can be delegated, and why delegation is safe.

### 3. Worker slices

List each worker, responsibility, allowed write scope, blocked files, and expected output.

### 4. Main-thread work

List integration tasks, critical-path work, and decisions that must not be delegated.

### 5. Verification plan

List exact commands to run and what each command proves.

### 6. Review-fix loop

Track each loop number, reviewer findings, fixes applied, and verification result.

### 7. Stop condition

State whether the stop condition is met. If not, state what remains.

### 8. Final report

Summarize changed files, feature-sized commit groups, verification evidence, unresolved Minor findings, known limitations, and residual risk.
