---
name: final-submit-polisher
description: Polish a frontend assignment before submission by checking README, scripts, verification commands, implementation scope, trade-offs, known limitations, and final diff quality.
---

# Final Submit Polisher

Use this after implementation and review, before submitting a frontend assignment. The goal is to make the project easy to run, easy to review, and honest about decisions.

## Check

- README
- install command
- dev command
- build command
- test command
- lint/typecheck command
- implementation scope
- decisions and trade-offs
- known limitations
- folder structure explanation
- API/cache/state strategy explanation
- static rendering, `revalidate`, ISR, tag/path revalidation, and `no-store` decisions
- React Query hydration and `staleTime` explanation when used
- FSD `entities/` vs `shared/` boundary explanation
- final changed files
- feature-sized commit grouping
- unnecessary code
- console logs
- unused dependencies
- formatting

## Output format

### 1. Submission readiness

State whether the project is ready, nearly ready, or blocked.

### 2. README improvements

List missing or weak README sections and exact content to add.

### 3. Verification commands

List install, dev, build, lint, typecheck, test, and manual verification commands.

### 4. Implementation summary

Summarize what was built in reviewer-friendly language.

### 5. Key decisions

List stack, architecture, API, cache, state, and component boundary decisions.
For Next.js, explicitly include which routes/data are static, revalidated, tag/path invalidated, always fresh with `no-store`, or hydrated into React Query.
For FSD, explicitly state that `entities/` contains only domain API-adjacent code and common code lives in `shared/`.

### 6. Trade-offs

Explain conscious compromises and why they are acceptable.

### 7. Known limitations

List limitations honestly. Do not invent future work to hide unfinished basics.

### 8. Cleanup checklist

List concrete cleanup tasks: logs, unused files, unused dependencies, formatting, dead code, TODOs, final diff scan, and feature-sized commit groups.

### 9. Final message draft

Draft a concise submission message with verification evidence and README pointer.

If the user asks for commit, push, or PR creation, hand the verified commit groups to `$toss-place-fe-superpowers:commit-push-pr-agent` after this polish step.
