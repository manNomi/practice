---
name: react-best-practices
description: "Audit, refactor, and optimize React/Next.js code using Vercel's impact-ordered best practices. Use when reviewing performance issues, slow UI interactions, high bundle size, async waterfalls, excessive re-renders, or when asked for React best-practice guidance."
---

# React Best Practices

## Overview
Apply React and Next.js performance improvements in impact order, not by convenience. Prioritize fixes that reduce waiting time and shipped JavaScript before memoization-level tuning.

## Priority Order
Follow this order unless the user explicitly asks otherwise:

1. Eliminate async waterfalls (CRITICAL)
2. Reduce bundle size (CRITICAL)
3. Improve server-side performance
4. Improve client-side data fetching
5. Reduce unnecessary re-renders
6. Improve rendering performance
7. Apply advanced patterns
8. Apply low-level JavaScript optimizations

Do not start with micro-optimizations when waterfalls or bundle bloat are still present.

## Workflow

### 1) Establish baseline
Capture quick evidence before changing code:
- Slow route(s) and user-visible symptom
- Core Web Vitals or route latency if available
- Largest bundles/chunks if available
- Re-render hotspots if available

### 2) Remove waterfalls first
Find sequential async work that can run in parallel or be conditionally deferred.

Check for:
- `await` chains with no dependency between calls
- Data fetched before branch checks that might early-return
- Nested fetches triggered by prior fetch completion when parallelization is possible

Apply:
- `Promise.all` for independent calls
- Branch-first control flow to skip unnecessary fetches
- Server-side aggregation where appropriate

### 3) Shrink shipped JavaScript
Check for:
- Heavy client imports in always-loaded paths
- Client Components used where Server Components are sufficient
- Missing lazy loading/code splitting for low-frequency UI

Apply:
- Move logic/components to server when possible
- Dynamic import for optional/rarely used features
- Remove dead code and oversized dependencies

### 4) Improve data-fetching architecture
Check for:
- Cascading `useEffect` fetch patterns
- Duplicate client fetches for same resource
- Missing caching/revalidation strategy

Apply:
- Co-locate data requirements but avoid cascades
- Use stable query keys and caching strategy
- Prefer server fetch for initial render where beneficial

### 5) Optimize re-renders
Only after steps 1-4.

Check for:
- Unstable props/functions passed to memoized children
- Broad context updates causing tree-wide renders
- Expensive computation inside render path

Apply:
- Stabilize references only where measured benefit exists
- Split contexts by update frequency
- Memoize expensive derivations with clear dependency sets

### 6) Optimize rendering path
Check for:
- Large list rendering without virtualization
- Expensive synchronous render work on interaction

Apply:
- Virtualize long lists
- Defer non-urgent rendering updates

### 7) Finalize with advanced and JS-level tuning
Use only for validated hotspots:
- Fine-grained scheduling and transitions
- Streaming/suspense patterns where architecture supports them
- Loop/data-structure optimizations after higher-impact issues are handled

## Review Output Contract
When asked to review or refactor:
- List findings ordered by impact, highest first
- For each finding include user impact, evidence, and concrete fix
- Prefer patches that remove waiting time or shipped bytes first
- Mention what was deliberately not optimized yet and why

## Reference
For concrete checks and examples, use:
- [references/checklist.md](references/checklist.md)
