---
name: api-layer-designer
description: Design an API layer that separates pure API call functions, React Query hooks, query keys, domain types, and mappers under the entities layer.
---

# API Layer Designer

Use this when the assignment has API calls, mock APIs, domain responses, React Query, or Server Component fetching.

## Preferred pattern

```text
entities/{domain}/{resource}/api/getResource.ts
entities/{domain}/{resource}/api/useGetResource.ts
entities/{domain}/{resource}/api/keys.ts
entities/{domain}/{resource}/model/types.ts
entities/{domain}/{resource}/lib/mapper.ts
```

Example:

```text
entities/bank/stock/api/getStock.ts
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
- wraps `getStock`
- defines `queryKey`
- defines `enabled` condition
- optionally defines `staleTime`, `retry`, `select`, `placeholderData`

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
entities/stock/api/useGetStock.ts
entities/stock/model/types.ts
```

Avoid adding mappers or key factories until the response shape, query count, or reuse justifies them.

## Output format

### 1. Domain API inventory

List each domain/resource, endpoint or mock source, request params, and consumer.

### 2. Recommended file structure

Choose nested or flatter structure and show exact files.

### 3. Pure API functions

Define function names, inputs, outputs, cache options, and error behavior.

### 4. React Query hooks

Define hook names, client-only location, query keys, enabled conditions, stale time, retry, mutation, and invalidation where needed.

### 5. Query keys

Define key factories and key shape.

### 6. Types and mappers

Define API response types, domain model types, and mapping responsibilities.

### 7. Server Component usage

Show which pure functions can be called on the server.

### 8. Client Component usage

Show which hooks are used from Client Components and why.

### 9. What not to abstract

List wrappers, clients, mappers, hooks, or generics that are not needed yet.

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

export const stockKeys = {
  all: ["stock"] as const,
  detail: (symbol: string) => [...stockKeys.all, symbol] as const,
};

export function mapStock(response: StockResponse): Stock {
  return {
    symbol: response.symbol,
    price: response.price,
    updatedAt: new Date(response.updatedAt),
  };
}

export async function getStock(symbol: string): Promise<Stock> {
  const response = await fetch(`/api/stocks/${symbol}`);

  if (!response.ok) {
    throw new Error("Failed to load stock");
  }

  return mapStock(await response.json());
}

"use client";

import { useQuery } from "@tanstack/react-query";

export function useGetStock(symbol: string) {
  return useQuery({
    queryKey: stockKeys.detail(symbol),
    queryFn: () => getStock(symbol),
    enabled: symbol.length > 0,
    staleTime: 30_000,
  });
}
```
