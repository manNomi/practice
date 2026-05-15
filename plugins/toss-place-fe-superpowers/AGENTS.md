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
- Prefer React Query hydration when it makes server-prefetched data reusable from client widgets.
- Keep domain logic out of JSX when it grows.
- Avoid unnecessary dependencies.
- Prioritize reliability, maintainability, and clear trade-offs.
- Commit in verified feature-sized slices when git delivery is requested.

## Toss Place context

Toss Place builds offline commerce products such as POS, kiosk, table order, pickup order, B2B plugins, partner dashboards, and internal operation tools. These products run in offline store environments where payment and order flows must stay reliable even with network instability, touch devices, tablets, hardware constraints, and busy operators.

Frontend work should optimize for long-lived code, cross-platform web technology, clear client-side business logic, and collaboration with PO, PD, BE, and hardware engineers. Treat design review and code review as part of delivery, not as cleanup after coding. Own the work from planning to final submission.

## Next.js rules

- Do not mark an entire page as `"use client"` unless unavoidable.
- Fetch initial/cacheable data in Server Components.
- In App Router, keep `app/` route files as routing shells. Real page components should live in the FSD pages layer, implemented as `views/` by default.
- For public pages or data that changes infrequently, prefer static rendering, Server Components, and cacheable fetches before client fetching.
- Use `fetch(..., { cache: "force-cache" })`, `next: { revalidate }`, ISR, or route-level `revalidate` for shared cacheable data.
- Use `next.tags` with `revalidateTag`, `revalidatePath`, or Server Action `updateTag` when mutation should refresh cached data.
- If the project explicitly uses Next Cache Components, decide whether `use cache`, `cacheLife`, and `cacheTag` are appropriate before falling back to older fetch-cache patterns.
- Use `no-store` only when data is request-specific, permission-specific, payment/order-progress specific, or must always be fresh.
- Use React Query only for client-side server state that needs refetching, mutation, optimistic update, invalidation, or interaction-driven refresh.
- React Query hydration is not a replacement for Next server cache. Use it when server-prefetched data should be reusable from client widgets through hooks, and align `staleTime` with the server cache freshness.
- Keep Client Component boundaries small.
- Pass only necessary serialized props from Server Components to Client Components.

Preferred route shell:

```tsx
import { HomePage } from "@/views/home/HomePage";

export default function Page() {
  return <HomePage />;
}
```

## Simple FSD rules

Use this structure by default:

`app/`
- Next.js folder routing only
- route shell files that import views
- layout
- providers
- global setup

`views/`
- page-level composition
- route-level screens
- connecting widgets
- React Query hydration boundaries for page-level prefetched data when useful

Use `views/` by default for the FSD pages layer in Next.js App Router projects. Use `pages/` only if the project already chose that name and it does not conflict with Next's Pages Router.

`widgets/`
- meaningful page sections or feature blocks
- can own local UI state if the state only affects that widget

`entities/`
- domain API modules only
- domain-specific pure API functions
- domain-specific React Query hooks
- domain-specific query option factories and query keys
- API response types and domain types directly tied to that API
- mappers directly tied to that API response

`shared/`
- reusable UI primitives
- common utilities
- common hooks
- common API client and fetchers
- common query helpers
- common formatters
- constants and config

Important:

- Do not create folders only for architecture purity.
- Do not add a `features/` layer by default.
- Add `features/` only if multiple reusable user actions with independent business flows appear.
- Do not put real page composition in `app/page.tsx`; delegate to `views/{route}/{RoutePage}.tsx`.
- Never put common code in `entities/`.
- Move generic utilities to `shared/util`.
- Move common API clients and fetchers to `shared/api`.
- Move common UI to `shared/ui`.
- Move common config and constants to `shared/config` or `shared/constants`.

## API layer rules

For each domain API, separate pure call functions from React Query hooks.

Preferred structure:

```text
entities/{domain}/{resource}/api/getResource.ts
entities/{domain}/{resource}/api/useGetResource.ts
entities/{domain}/{resource}/api/options.ts
entities/{domain}/{resource}/api/keys.ts
entities/{domain}/{resource}/model/types.ts
entities/{domain}/{resource}/lib/mapper.ts
```

Example:

```text
entities/bank/stock/api/getStock.ts
entities/bank/stock/api/useGetStock.ts
entities/bank/stock/api/stockOptions.ts
entities/bank/stock/api/keys.ts
entities/bank/stock/model/types.ts
```

Rules:

- Pure API functions must not depend on React.
- Pure API functions can be used by Server Components.
- Pure API functions can be reused by React Query hooks.
- React Query hooks must live in client-only files.
- React Query hooks should wrap domain query options or pure API functions.
- Query options should be reusable by `prefetchQuery`, `useQuery`, and hydration.
- Query keys should be centralized.
- Domain response mapping should not be hidden inside UI components.
- Common fetch clients, query wrappers, formatters, and generic mappers must live in `shared/`, not `entities/`.

## Git delivery rules

- Commit only after the relevant feature slice has been reviewed and verified.
- Prefer feature-sized commits: API layer, UI interaction, reliability states, README/final polish, or tests.
- Do not make one commit per file.
- Do not mix unrelated feature slices in one commit.
- In parallel workflows, workers do not commit. The main thread integrates and verifies, then a git delivery subagent may commit approved groups.
- Push and PR creation happen after verification and review-fix loops, not after every worker finishes.
- Use `$toss-place-fe-superpowers:commit-push-pr-agent` when the user explicitly asks for commit, push, PR creation, or a dedicated git delivery subagent.

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
- screenshot and Figma/design comparison before implementation
- reliability
- edge cases
- offline/store-like failure scenarios
- loading/error/empty/disabled states
- duplicate action prevention
- clear README decisions
- maintainable code
- simple architecture
