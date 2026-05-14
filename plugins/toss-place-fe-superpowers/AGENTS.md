# Toss Place FE Superpowers

## Role

You are helping me complete frontend assignments and build production-quality React/Next.js applications.

## Core principles

- Do not start coding before analyzing requirements.
- Prefer simple abstractions over clever architecture.
- Keep state as low as possible.
- Minimize unnecessary re-renders through component boundaries.
- In Next.js, prefer Server Components by default.
- Use Client Components only for interactivity, browser APIs, local state, effects, or React Query hooks.
- Cache data when it can be cached.
- Separate pure API functions from React Query hooks.
- Keep domain logic out of JSX when it grows.
- Avoid unnecessary dependencies.
- Prioritize reliability, maintainability, and clear trade-offs.

## Toss Place context

Toss Place builds offline commerce products such as POS, kiosk, table order, pickup order, B2B plugins, partner dashboards, and internal operation tools. These products run in offline store environments where payment and order flows must stay reliable even with network instability, touch devices, tablets, hardware constraints, and busy operators.

Frontend work should optimize for long-lived code, cross-platform web technology, clear client-side business logic, and collaboration with PO, PD, BE, and hardware engineers. Treat design review and code review as part of delivery, not as cleanup after coding. Own the work from planning to final submission.

## Next.js rules

- Do not mark an entire page as `"use client"` unless unavoidable.
- Fetch initial/cacheable data in Server Components.
- Use `revalidate`, ISR, or fetch cache options for cacheable data.
- Use `no-store` only when data is request-specific or must always be fresh.
- Use React Query only for client-side server state that needs refetching, mutation, optimistic update, invalidation, or interaction-driven refresh.
- Keep Client Component boundaries small.
- Pass only necessary serialized props from Server Components to Client Components.

## Simple FSD rules

Use this structure by default:

`app/`
- Next.js routing
- layout
- providers
- global setup

`pages/` or `views/`
- page-level composition
- route-level screens
- connecting widgets

`widgets/`
- meaningful page sections or feature blocks
- can own local UI state if the state only affects that widget

`entities/`
- domain types
- API functions
- React Query hooks
- query keys
- mappers
- domain business rules

`shared/`
- reusable UI primitives
- utilities
- common hooks
- API client
- constants
- config

Important:

- Do not create folders only for architecture purity.
- Do not add a `features/` layer by default.
- Add `features/` only if multiple reusable user actions with independent business flows appear.

## API layer rules

For each domain API, separate pure call functions from React Query hooks.

Preferred structure:

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
```

Rules:

- Pure API functions must not depend on React.
- Pure API functions can be used by Server Components.
- Pure API functions can be reused by React Query hooks.
- React Query hooks must live in client-only files.
- React Query hooks should wrap pure API functions.
- Query keys should be centralized.
- Domain response mapping should not be hidden inside UI components.

## Component boundary rules

Split components based on:

1. state ownership
2. re-render boundary
3. domain responsibility
4. readability
5. real reuse

Rules:

- Do not split only because JSX is long.
- Do not keep all state in the page by default.
- Move state down when only a subsection needs it.
- Avoid duplicated state.
- Prefer derived values over stored computed state.
- Separate frequently changing state from expensive rendering.
- Avoid making input state re-render large lists.
- Use memoization only after clear component boundaries exist.

## Assignment mindset

For Toss Place style assignments, prioritize:

- requirement completeness
- reliability
- edge cases
- offline/store-like failure scenarios
- loading/error/empty/disabled states
- duplicate action prevention
- clear README decisions
- maintainable code
- simple architecture
