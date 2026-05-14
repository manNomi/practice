---
name: react-best-practices
description: Review, refactor, or plan React and Next.js code using Vercel-style impact-ordered best practices. Use for performance reviews, async waterfalls, bundle size, RSC boundaries, cache strategy, client data fetching, re-render risks, or React/Next.js architecture quality.
---

# React Best Practices

Use this when reviewing or improving React/Next.js performance, architecture, or rendering quality in a frontend assignment.

This is a compact Toss Place assignment-oriented adaptation of Vercel Labs `agent-skills/skills/react-best-practices` (MIT). For the detailed checklist, read `references/checklist.md` when doing a real review.

## Priority order

Apply improvements in impact order:

1. Eliminate async waterfalls.
2. Reduce shipped JavaScript and bundle size.
3. Improve Server Component, server fetch, and cache strategy.
4. Improve client-side data fetching and React Query usage.
5. Reduce unnecessary re-renders.
6. Improve expensive rendering paths.
7. Apply advanced React patterns only for proven hotspots.
8. Apply low-level JavaScript optimizations last.

Do not start with `useMemo`, `useCallback`, or `React.memo` while async waterfalls, oversized client bundles, over-clientified pages, or missing cache decisions remain unresolved.

## Workflow

### 1. Establish evidence

Identify:

- slow route or interaction
- user-visible symptom
- expensive component tree, list, or interaction
- client bundle risk
- waterfall or duplicated request risk
- current RSC, cache, and React Query strategy

If exact metrics are unavailable, inspect code structure and mark findings as inferred.

### 2. Remove async waterfalls first

Check for:

- independent `await` calls running sequentially
- branch checks performed after expensive fetches
- parent fetches blocking child fetches unnecessarily
- cascading `useEffect` fetches
- duplicate requests for the same resource

Prefer:

- `Promise.all` for independent server work
- branch-first control flow
- server prefetch and hydration when client widgets need the data
- one query key per domain resource

### 3. Shrink shipped JavaScript

Check for:

- unnecessary `"use client"`
- heavy packages imported into always-loaded Client Components
- optional panels, modals, charts, maps, or editors bundled up front
- utility libraries used for small native operations

Prefer:

- Server Components by default
- smaller Client Component boundaries
- dynamic import for low-frequency UI
- removing unnecessary dependencies

### 4. Improve server/cache/data architecture

For Next.js, check:

- public and rarely changing pages can be static or `force-cache`
- periodically changing data uses `next: { revalidate }` or ISR
- mutation-refreshed data uses `next.tags`, `revalidateTag`, `revalidatePath`, or Server Action `updateTag`
- `no-store` is limited to user-specific, permission-specific, payment/order-progress, or always-fresh data
- React Query hydration complements Next server cache instead of replacing it
- React Query `staleTime` aligns with the server cache freshness
- Cache Components projects explicitly evaluate `use cache`, `cacheLife`, and `cacheTag`

### 5. Optimize re-renders after boundaries are correct

Check for:

- input state re-rendering large lists
- broad context updates causing tree-wide renders
- unstable objects/functions passed deeply
- expensive derived values recalculated during frequent renders
- `React.memo` used without stable props or a meaningful boundary

Prefer:

- moving state down
- splitting frequently changing state from expensive rendering
- deriving values instead of duplicating state
- memoizing only after component boundaries and props are stable

### 6. Optimize rendering path and low-level code last

Use only when a hotspot remains:

- virtualize large tables/lists
- defer non-urgent updates
- use transitions for non-critical rendering
- reduce repeated parse/transform work
- consolidate repeated array traversals in measured hotspots

## Output format

### 1. Highest-impact findings

List findings in priority order. Use severity: Critical, Important, Minor.

### 2. Evidence

Cite files, routes, components, request flows, bundle risks, or clear inferences.

### 3. Recommended fixes

Give an ordered patch plan that starts with waterfalls, bundle/RSC boundaries, cache/data strategy, then re-render work.

### 4. What not to optimize yet

List memoization, virtualization, or low-level JS work that should wait until higher-impact issues are handled.

### 5. Verification

List build, typecheck, lint, tests, browser/manual checks, bundle checks, and interaction checks.

### 6. Residual risk

Report remaining uncertainty. Do not claim performance is solved without evidence.
