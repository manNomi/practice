# Toss Place FE Superpowers

## What this is

A Codex skill pack for frontend take-home assignments, inspired by Superpowers, customized for Toss Place style frontend work.

## Why this exists

This plugin prevents jumping directly into code and instead enforces:

- requirement analysis
- stack selection
- Next.js RSC/caching decisions
- Simple FSD architecture
- API layer separation
- re-render-aware component boundaries
- reliability review
- final submission polish

## When to use

Use this plugin when:

- starting a frontend assignment
- deciding between Vite and Next.js
- designing Next.js RSC architecture
- designing API and React Query layers
- splitting components
- reviewing code before submission

## Skill workflow

Recommended order:

1. `$assignment-forensics`
2. `$stack-setup-planner`
3. `$next-rsc-architect`
4. `$simple-fsd-architect`
5. `$api-layer-designer`
6. `$component-boundary-planner`
7. `$reliability-first-planner`
8. `$toss-fe-code-review`
9. `$offline-edge-case-checker`
10. `$final-submit-polisher`

## Example prompts

### `$assignment-forensics`

```text
Use assignment-forensics on this take-home assignment. Extract the MVP, hidden evaluation points, Toss Place reliability risks, and submission checklist.
```

### `$stack-setup-planner`

```text
Use stack-setup-planner to decide whether this assignment should use Vite or Next.js, Tailwind or Emotion, React Query or plain fetch, and which test setup is enough.
```

### `$next-rsc-architect`

```text
Use next-rsc-architect for this Next.js App Router assignment. Decide what stays server-side, what needs client boundaries, and how caching should work.
```

### `$simple-fsd-architect`

```text
Use simple-fsd-architect to design a lightweight folder structure for this assignment without creating architecture-only folders.
```

### `$api-layer-designer`

```text
Use api-layer-designer to separate pure API functions, React Query hooks, query keys, types, and mappers for this assignment.
```

### `$component-boundary-planner`

```text
Use component-boundary-planner to split components by state ownership, Server/Client boundaries, and re-render risk.
```

### `$reliability-first-planner`

```text
Use reliability-first-planner to create an implementation plan that covers loading, error, empty, disabled, pending, retry, and duplicate action prevention.
```

### `$toss-fe-code-review`

```text
Use toss-fe-code-review on this diff and prioritize requirement gaps, reliability risks, state boundaries, API layer issues, and README weaknesses.
```

### `$offline-edge-case-checker`

```text
Use offline-edge-case-checker to test this assignment against POS, kiosk, table order, payment/order, slow network, duplicate submit, and stale data scenarios.
```

### `$final-submit-polisher`

```text
Use final-submit-polisher before submission. Check README, scripts, verification commands, trade-offs, limitations, final diff quality, and final message.
```

## Design principles

- Server Component by default.
- Client Component only when necessary.
- Keep state as low as possible.
- Cache what can be cached.
- Separate pure API functions from React Query hooks.
- Use Simple FSD without over-engineering.
- Split component boundaries based on state ownership and re-rendering.
- Prioritize reliability, maintainability, and clear trade-offs.
- Prefer small, reviewer-readable architecture over impressive abstractions.

## Limitations

- This does not guarantee passing an assignment.
- This is a workflow guide, not a replacement for engineering judgment.
- Adapt every recommendation to the actual assignment requirements.
- The plugin is Codex-first and does not include hooks, MCP servers, assets, or non-Codex platform support.
