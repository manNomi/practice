# React Best Practices Checklist

Source: Vercel blog "Introducing: React Best Practices" (January 14, 2026).

## 1) Eliminate Async Waterfalls (CRITICAL)
- Check for independent async calls run sequentially.
- Check for fetching data before early-return branches.
- Convert independent awaits to `Promise.all`.
- Move branch checks before expensive fetches when possible.

## 2) Bundle Size Optimization (CRITICAL)
- Identify heavy packages in initial bundles.
- Move non-essential features behind dynamic imports.
- Prefer Server Components over Client Components when interactivity is not needed.
- Remove dead imports and duplicated polyfills/helpers.

## 3) Server-Side Performance
- Avoid repeated server-side calls with identical inputs.
- Parallelize independent backend requests.
- Cache and revalidate appropriate responses.

## 4) Client-Side Data Fetching
- Remove cascading fetches triggered by dependent effects when avoidable.
- Deduplicate requests for the same resource.
- Prefer stable caching/query keys.
- Keep loading/error states predictable and non-blocking.

## 5) Re-render Optimization
- Detect props/callback identity churn in hot component trees.
- Split broad contexts that update too frequently.
- Memoize only when measured or clearly expensive.

## 6) Rendering Performance
- Virtualize large lists/tables.
- Avoid expensive synchronous work in render path.
- Keep interaction updates responsive.

## 7) Advanced Patterns
- Use transitions/deferred updates for non-urgent rendering.
- Apply streaming/suspense patterns where architecture supports them.

## 8) JavaScript Performance
- Consolidate repeated array traversals in hotspots.
- Avoid repeated parse/transform work on every render.
- Apply low-level optimizations last.

## Prioritization Rule
If critical category issues exist, fix those first and defer low-level optimization.
