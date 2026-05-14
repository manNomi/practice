---
name: next-rsc-architect
description: Design a Next.js App Router architecture using Server Components by default, small Client Component boundaries, cacheable server fetching, ISR/revalidate, and React Query only where client-side server state is needed.
---

# Next RSC Architect

Use this when the assignment uses Next.js App Router or when Next.js is being considered.

## Core principle

- Server Component by default.
- Client Component only when needed.
- State as low as possible.
- Cache what can be cached.
- Do not turn an entire page into `"use client"` unless unavoidable.
- In App Router, `app/` route files are thin shells. Put real page components in `views/`.
- When client widgets benefit from server-prefetched server state, prefer React Query hydration over prop-drilling large data through the whole tree.

Preferred route shell:

```tsx
import { HomePage } from "@/views/home/HomePage";

export default function Page() {
  return <HomePage />;
}
```

## Decision checklist

1. Which data can be fetched on the server?
2. Which routes or sections can be static because they are public and rarely change?
3. Which data can use `cache: "force-cache"`?
4. Which data needs ISR or `next: { revalidate }`?
5. Which cached data needs `next.tags`, `revalidateTag`, `revalidatePath`, or Server Action `updateTag` after mutation?
6. Which data must be `no-store` because it is user-specific, permission-specific, payment/order-progress specific, or always fresh?
7. Does this project enable Next Cache Components, and if so should it use `use cache`, `cacheLife`, or `cacheTag`?
8. Which UI requires browser APIs, event handlers, effects, local state, or React Query?
9. Where should the Client Component boundary start?
10. What props need to cross from Server to Client?
11. Can the Client Component boundary be smaller?
12. Is React Query actually needed?
13. What can remain as pure Server Component UI?
14. Should server-prefetched data be hydrated into React Query for child widgets?
15. Which `views/` component owns the page-level `HydrationBoundary`?

## Cache decision routine

Prefer the cheapest correct cache strategy:

1. Static or `force-cache`: public, shared, and rarely changing data such as catalogs, static store information, marketing copy, configuration, and read-only lists.
2. `next: { revalidate }` or ISR: data that can be stale for a known interval, such as dashboards, product lists, notices, or pickup/order summaries that do not need second-by-second freshness.
3. Tag/path revalidation: data that is cacheable but must refresh after a mutation, such as product edits, order status changes, cart/payment side effects, or admin updates.
4. `no-store`: user-specific, permission-specific, payment/order progress, checkout, inventory-critical, or other data where stale values can cause incorrect action.
5. React Query stale time: align client cache freshness with the server cache. Do not use a long `staleTime` for data that server cache revalidates quickly or invalidates after mutation.
6. Cache Components: if `cacheComponents: true` is enabled, explicitly decide whether `use cache`, `cacheLife`, and `cacheTag` fit the project before using the previous fetch-cache model.

React Query hydration can reuse server-prefetched data in client widgets, but it should not hide or replace the Next.js server cache decision.

## React Query use cases

Use React Query for:

- interaction-driven refetch
- mutation
- optimistic update
- invalidation
- polling
- client-side filters that require server calls
- stale client-visible server state
- server-prefetched data that many client widgets should access through hooks after hydration

Do not use React Query for:

- static content
- cacheable initial page data
- data already fetched by Server Components without client-side updates
- local UI state

## Hydration strategy

Use hydration when:

- initial data can be fetched on the server
- interactive client widgets need the same data through hooks
- multiple components need access without prop drilling
- the data may later be refetched, invalidated, filtered, or mutated on the client

Preferred flow:

1. Define a pure API function in `entities/`.
2. Define query keys and query options in `entities/`.
3. In a server `views/*Page` component, create a query client and `prefetchQuery`.
4. Wrap client sections with `HydrationBoundary`.
5. In client widgets, call entity hooks that reuse the same query options.

Keep Next.js fetch cache decisions inside the pure API function or server caller. Keep React Query stale time aligned with the expected freshness of hydrated data.

## Concrete examples

Route shell plus view:

```tsx
import { ProductsPage } from "@/views/products/ProductsPage";

export default function Page() {
  return <ProductsPage />;
}
```

Hydrated page view:

```tsx
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { productsOptions } from "@/entities/product/api/productsOptions";
import { ProductListWidget } from "@/widgets/product-list/ProductListWidget";

export async function ProductsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(productsOptions.list());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListWidget />
    </HydrationBoundary>
  );
}
```

Small client boundary:

```tsx
"use client";

export function ProductSearchBox({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  return <input value={query} onChange={(event) => setQuery(event.target.value)} />;
}
```

## Output format

### 1. Rendering strategy

State which routes/sections are server-rendered, static, dynamic, or client-driven.

### 2. Server Component areas

List UI and data that should stay on the server.

### 3. Client Component areas

List the smallest interactive boundaries and why they require client execution.

### 4. Cache / ISR strategy

Specify `revalidate`, fetch cache, ISR, or `no-store` decisions.

### 5. Cache decision matrix

Create a matrix with columns: route/data, static or `force-cache`, `revalidate` or ISR, tag/path revalidation, `no-store`, React Query `staleTime`, and Cache Components decision.

### 6. React Query usage

Say exactly where React Query is useful, whether hydration is recommended, where query options live, and which client widgets consume hooks.

### 7. State placement

Map each state item to its owner.

### 8. Data flow

Describe server fetch, query prefetch, hydration, client hook consumption, invalidation, and refresh behavior.

### 9. File structure

Show only files that should exist for the assignment.
For Next.js App Router, include thin `app/` route shells and real page components under `views/`.

### 10. Risks

Identify stale data, serialization, over-clientification, and cache freshness risks.

### 11. Final recommendation

Give the final architecture decision in a short implementation-ready summary.
