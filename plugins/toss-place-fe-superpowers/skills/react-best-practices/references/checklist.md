# React Best Practices Checklist

Source basis: Vercel Labs `agent-skills/skills/react-best-practices` (MIT), adapted compactly for Toss Place style frontend assignment workflows.

## 1. Eliminate Async Waterfalls

- Independent async calls should run in parallel.
- Branch checks should happen before expensive fetches when possible.
- Parent components should not block child data unnecessarily.
- Client `useEffect` fetch chains should not cascade when server fetch, query prefetch, or parallel queries would be simpler.
- Duplicate requests for the same resource should share query keys or server fetches.

## 2. Reduce Bundle Size

- Avoid marking pages or large layouts as `"use client"`.
- Move non-interactive UI to Server Components.
- Keep Client Component boundaries small.
- Dynamically import rare modals, charts, maps, editors, or admin-only panels.
- Avoid adding libraries for small native operations.
- Remove dead imports and unused dependencies.

## 3. Improve Server-Side Performance

- Parallelize independent server requests.
- Avoid repeated backend calls with identical inputs.
- Prefer server fetch for initial/cacheable data.
- Keep route shells in `app/` thin and put page composition in `views/`.
- Use streaming/Suspense only when it improves perceived loading and does not complicate the assignment unnecessarily.

## 4. Strengthen Next.js Cache Decisions

- Public, shared, rarely changing data: consider static rendering or `cache: "force-cache"`.
- Data that can be stale for a known interval: use `next: { revalidate }` or ISR.
- Cacheable data changed by mutations: use `next.tags` plus `revalidateTag`, `revalidatePath`, or Server Action `updateTag`.
- User-specific, permission-specific, payment/order-progress, checkout, or always-fresh data: use `cache: "no-store"`.
- Cache Components projects should explicitly evaluate `use cache`, `cacheLife`, and `cacheTag`.
- React Query hydration should reuse server-prefetched data in client widgets, not replace server cache decisions.
- React Query `staleTime` should not contradict the server cache freshness.

## 5. Improve Client-Side Data Fetching

- Query keys should be centralized and stable.
- Pure API functions should be reusable from Server Components and query hooks.
- Query option factories should be reusable by `prefetchQuery`, hydration, and hooks.
- Hooks should define `enabled`, `staleTime`, retry, select, placeholder data, and invalidation deliberately.
- Loading, error, empty, disabled, and pending states should be explicit.

## 6. Reduce Re-Renders

- Move state down when only a subsection needs it.
- Keep input state away from expensive list rendering.
- Split broad contexts by update frequency.
- Avoid unstable object/function props across deep trees.
- Prefer derived values over duplicated state.
- Use `React.memo`, `useMemo`, and `useCallback` only when boundaries and props make them meaningful.

## 7. Improve Rendering Performance

- Virtualize long lists or tables when they are realistically large.
- Avoid expensive synchronous work in render paths.
- Defer non-urgent rendering updates.
- Use transitions for interactions where immediate visual response matters.

## 8. Apply Low-Level JavaScript Optimizations Last

- Avoid repeated parse/format/transform work in hot paths.
- Consolidate repeated array traversals only when the code is a proven hotspot.
- Prefer clear domain code over clever micro-optimizations in assignment code.

## Prioritization Rule

If async waterfalls, oversized bundles, missing RSC boundaries, or incorrect cache strategy exist, fix those before memoization or low-level JavaScript tuning.
