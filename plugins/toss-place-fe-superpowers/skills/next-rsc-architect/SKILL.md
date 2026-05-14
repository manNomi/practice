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

## Decision checklist

1. Which data can be fetched on the server?
2. Which data can be cached?
3. Which data needs ISR or `revalidate`?
4. Which data must be `no-store`?
5. Which UI requires browser APIs, event handlers, effects, local state, or React Query?
6. Where should the Client Component boundary start?
7. What props need to cross from Server to Client?
8. Can the Client Component boundary be smaller?
9. Is React Query actually needed?
10. What can remain as pure Server Component UI?

## React Query use cases

Use React Query for:

- interaction-driven refetch
- mutation
- optimistic update
- invalidation
- polling
- client-side filters that require server calls
- stale client-visible server state

Do not use React Query for:

- static content
- cacheable initial page data
- data already fetched by Server Components without client-side updates
- local UI state

## Concrete examples

Server-first page:

```tsx
export default async function ProductsPage() {
  const products = await getProducts({ next: { revalidate: 60 } });

  return <ProductList products={products} />;
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

### 5. React Query usage

Say exactly where React Query is useful, or state that it should not be added.

### 6. State placement

Map each state item to its owner.

### 7. Data flow

Describe server fetch, prop passing, client updates, invalidation, and refresh behavior.

### 8. File structure

Show only files that should exist for the assignment.

### 9. Risks

Identify stale data, serialization, over-clientification, and cache freshness risks.

### 10. Final recommendation

Give the final architecture decision in a short implementation-ready summary.
