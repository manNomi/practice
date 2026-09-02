---
name: api-layer-designer
description: Design a domain API layer that separates pure API call functions, React Query hooks, query keys, API-bound domain types, and mappers under the entities layer while keeping common code in shared.
---

# API Layer Designer

Use this when the assignment has API calls, mock APIs, domain responses, React Query, Server Component fetching, or React Query hydration.

## Preferred pattern

```text
entities/{domain}/{resource}/api/getResource.ts
entities/{domain}/{resource}/api/resourceOptions.ts
entities/{domain}/{resource}/api/useGetResource.ts
entities/{domain}/{resource}/api/keys.ts
entities/{domain}/{resource}/model/types.ts
entities/{domain}/{resource}/lib/mapper.ts
```

Example:

```text
entities/bank/stock/api/getStock.ts
entities/bank/stock/api/stockOptions.ts
entities/bank/stock/api/useGetStock.ts
entities/bank/stock/api/keys.ts
entities/bank/stock/model/types.ts
entities/bank/stock/lib/mapStock.ts
```

## Responsibilities

`getStock.ts`

- pure API call
- no React dependency
- usable in Server Components
- usable inside React Query hook

`useGetStock.ts`

- client-only React Query hook
- wraps domain query options
- defines `enabled` condition
- optionally defines `staleTime`, `retry`, `select`, `placeholderData`

`stockOptions.ts`

- query option factory
- reusable by `prefetchQuery`, `useQuery`, and hydration
- wraps pure API functions without React dependency
- should not include hook-only conditions like `enabled` when the same options are used by server prefetch

`keys.ts`

- query key factory
- avoids key duplication

`types.ts`

- domain model
- API response type if needed

`mapper.ts`

- converts API response to domain model
- keeps UI clean

## When this is too much

For small assignments, use a flatter structure:

```text
entities/stock/api/getStock.ts
entities/stock/api/stockOptions.ts
entities/stock/api/useGetStock.ts
entities/stock/model/types.ts
```

Avoid adding mappers or key factories until the response shape, query count, or reuse justifies them.

## Hydration-first query design

When React Query is useful, design for hydration first:

- Pure API functions fetch and map data.
- Query options reuse pure API functions.
- Server `views/*Page` components prefetch query options and wrap interactive sections in `HydrationBoundary`.
- Client widgets call hooks wherever the data is needed.
- The same query key must be used for prefetch and client hook consumption.

This maximizes local data access through hooks while keeping server prefetch, cache policy, and domain mapping centralized.

## Entities vs shared boundary

`entities/` is only for API-adjacent domain modules.

Allowed in `entities/`:

- domain-specific pure API functions
- domain-specific React Query hooks
- domain-specific query option factories and query keys
- API response types and domain types directly tied to the API
- mappers directly tied to that API response

Forbidden in `entities/`:

- common utilities
- common formatters
- common fetch clients
- common query wrappers
- cross-domain helpers
- reusable UI
- global constants or config

Move common code to:

- `shared/util` for generic functions
- `shared/api` for API clients, fetchers, and common query helpers
- `shared/ui` for reusable UI
- `shared/config` or `shared/constants` for global config and constants

## Next.js cache policy in API functions

For pure API functions that can run in Server Components, make the freshness policy explicit:

- Public and rarely changing data: use `cache: "force-cache"` or `next: { revalidate }`.
- Periodically changing data: use `next: { revalidate: seconds }` or route-level ISR.
- Cacheable data changed by mutations: add `next: { tags }` and plan `revalidateTag`, `revalidatePath`, or Server Action `updateTag`.
- User-specific, permission-specific, payment/order-progress, or always-fresh data: use `cache: "no-store"`.
- React Query `staleTime` should match or be shorter than the expected server cache freshness.
- React Query hydration should reuse server-prefetched data in client widgets, not replace the Next.js server cache decision.

If the project enables Next Cache Components, decide whether `use cache`, `cacheLife`, and `cacheTag` belong in the server data function before using fetch-cache options.

## Output format

### 1. Domain API inventory

List each domain/resource, endpoint or mock source, request params, and consumer.

### 2. Recommended file structure

Choose nested or flatter structure and show exact files.
Include query option files when React Query or hydration is used.
State which common files belong in `shared/` instead of `entities/`.

### 3. Pure API functions

Define function names, inputs, outputs, cache options, and error behavior.
For Next.js, state whether `fetch` uses `force-cache`, `next.revalidate`, tags, path/tag revalidation, Cache Components, or `no-store`.

### 4. React Query hooks

Define hook names, client-only location, query options, enabled conditions, stale time, retry, mutation, and invalidation where needed.

### 5. Query keys

Define key factories and key shape.

### 6. Types and mappers

Define API response types, domain model types, and mapping responsibilities.

### 7. Server Component usage

Show which pure functions or query options can be called on the server, what Next cache policy applies, and whether `prefetchQuery` plus `HydrationBoundary` is recommended.

### 8. Client Component usage

Show which hooks are used from Client Components and why.

### 9. What not to abstract

List wrappers, clients, mappers, hooks, or generics that are not needed yet.
Explicitly list any common utilities, fetchers, query helpers, constants, or UI that must not be placed in `entities/`.

### 10. Example code skeleton

```ts
export type StockResponse = {
  symbol: string;
  price: number;
  updatedAt: string;
};

export type Stock = {
  symbol: string;
  price: number;
  updatedAt: Date;
};

type GetStockOptions = {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
};

export const stockKeys = {
  all: ["stock"] as const,
  detail: (symbol: string) => [...stockKeys.all, symbol] as const,
};

export const stockOptions = {
  detail: (symbol: string) => ({
    queryKey: stockKeys.detail(symbol),
    queryFn: () =>
      getStock(symbol, {
        revalidate: 60,
        tags: ["stock", `stock:${symbol}`],
      }),
    staleTime: 60_000,
  }),
};

export function mapStock(response: StockResponse): Stock {
  return {
    symbol: response.symbol,
    price: response.price,
    updatedAt: new Date(response.updatedAt),
  };
}

export async function getStock(symbol: string, options: GetStockOptions = {}): Promise<Stock> {
  const isAlwaysFresh = options.cache === "no-store";
  const response = await fetch(`https://api.example.com/stocks/${symbol}`, {
    cache: isAlwaysFresh ? "no-store" : options.cache ?? "force-cache",
    next: isAlwaysFresh
      ? undefined
      : {
          revalidate: options.revalidate ?? 60,
          tags: options.tags ?? ["stock", `stock:${symbol}`],
        },
  });

  if (!response.ok) {
    throw new Error("Failed to load stock");
  }

  return mapStock(await response.json());
}

"use client";

import { useQuery } from "@tanstack/react-query";

export function useGetStock(symbol: string) {
  return useQuery({
    ...stockOptions.detail(symbol),
    enabled: symbol.length > 0,
  });
}
```
