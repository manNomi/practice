---
name: review-fix-loop
description: Run an implementation review, fix, and verification loop for a frontend assignment after code has been written, with findings-first review, up to 3 iterations by default, and clear stop or escalation conditions.
---

# Review Fix Loop

Use this after implementation, after a meaningful feature slice, or after integrating parallel worker output. This skill works without parallel agents. If the user explicitly asked for a reviewer agent or an orchestrated multi-agent run, the reviewer may be read-only; otherwise the main thread can perform the review directly.

## Defaults

- Maximum iterations: 3.
- Review format: findings first.
- Verification must be re-run on every loop.
- Do not call the project ready unless the stop condition is met.
- Do not hide residual risk. Report it.
- After the loop passes, identify feature-sized commit candidates when git delivery is requested.

## Severity

- Critical: must fix before submission. Includes broken requirements, build/runtime failures, core flow bugs, data corruption, duplicate payment/order-like actions, or severe reliability issues.
- Important: fix when related to requirement completeness, correctness, reliability, state ownership, RSC/caching, API boundaries, build/runtime behavior, README run instructions, or reviewer trust.
- Minor: polish, naming, clarity, small README improvements, or low-risk UX refinement.

## Loop workflow

1. Identify available verification commands from package scripts and lockfiles.
2. Run the current verification commands before reviewing, when feasible.
3. Review findings first: Critical, Important, Minor.
4. Create a fix plan for Critical and qualifying Important findings.
5. Apply fixes with the smallest safe patch.
6. Re-run verification commands.
7. Decide whether to stop, continue, or escalate to the user.
8. Repeat up to 3 times.

## What to review

- requirement completeness
- correctness of user flows and business rules
- loading, error, empty, disabled, pending, retry states
- duplicate action prevention
- network failure, stale data, refresh/revisit behavior
- state ownership and derived state
- re-render risks and component boundaries
- Server/Client Component boundaries
- cache, ISR, `revalidate`, `no-store`, and React Query usage
- pure API functions, query hooks, query keys, types, and mappers
- `entities/` only contains domain API-adjacent code, with common code in `shared/`
- TypeScript safety
- accessibility and keyboard/touch behavior
- README setup, decisions, trade-offs, and verification evidence

## Verification rules

- Use scripts that actually exist.
- Infer package manager from lockfiles.
- Prefer build, test, typecheck, and lint when available.
- If a command fails, capture the failure category and fix the highest-risk cause first.
- If no deterministic command exists for a concern, list manual verification steps.

## Fix rules

- Critical findings are mandatory fixes.
- Important findings are mandatory when they affect requirements, correctness, reliability, build/runtime behavior, or README run instructions.
- Minor findings can be fixed only when low-risk and cheap; otherwise report them.
- Do not broaden scope to add new product features.
- Do not rewrite architecture unless the current design blocks correctness or verification.
- Do not add dependencies unless the assignment already requires them or the user approves.
- Do not commit, push, or open a PR from this loop unless the user explicitly asks for git delivery.
- If git delivery is requested, hand verified feature-sized groups to `$toss-place-fe-superpowers:commit-push-pr-agent`.

## Stop condition

Stop when all are true:

- Verification commands pass, or unavailable commands are explicitly reported.
- No Critical findings remain.
- No Important findings remain for requirements, correctness, reliability, build/runtime, or README run instructions.
- Remaining Minor findings are documented.
- Residual risks and known limitations are stated honestly.

## Escalation conditions

Stop and ask the user or report blocked status when:

- The same issue repeats after a fix attempt.
- Requirements are ambiguous and multiple valid product behaviors exist.
- A required fix would exceed assignment scope.
- Build/test tooling or environment is broken independently of the implementation.
- Fixing the issue requires credentials, missing API docs, unavailable design files, or product decisions.

## Output format

### 1. Current verification state

List commands run, pass/fail status, and the main failure category.

### 2. Review findings

Use findings-first order.

#### Critical

#### Important

#### Minor

### 3. Fix plan

List the smallest safe fixes in priority order.

### 4. Applied fixes

List what changed in this loop and why.

### 5. Re-verification

List commands re-run and results.

### 6. Remaining findings

List unresolved Critical, Important, and Minor findings.

### 7. Stop / continue decision

State whether to stop, continue to the next loop, escalate, or hand off to git delivery. Include loop count.

### 8. Residual risk

State known limitations, manual checks still needed, feature-sized commit candidates when relevant, and any Minor findings intentionally left for final reporting.
