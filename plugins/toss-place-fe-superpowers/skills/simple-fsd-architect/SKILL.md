---
name: simple-fsd-architect
description: Design a lightweight FSD-inspired frontend architecture using app, pages/views, widgets, entities, and shared without over-engineering.
---

# Simple FSD Architect

Use Simple FSD to make assignment code readable, not to create empty layers. In Next.js App Router projects, `app/` is routing only and the real page component lives in the FSD pages layer, implemented as `views/` by default.

## Default layers

`app/`

- Next.js folder routing only
- route shell files that delegate to `views/`
- layout
- providers
- global styles
- query client setup

`views/`

- page-level composition
- route-level screen composition
- orchestration between widgets
- page-level React Query hydration boundaries when useful

Preferred App Router shell:

```tsx
import { HomePage } from "@/views/home/HomePage";

export default function Page() {
  return <HomePage />;
}
```

Use `views/` as the default name for the FSD pages layer in Next.js App Router projects. Use `pages/` only when the project already chose that convention and it will not be confused with Next's Pages Router.

`widgets/`

- meaningful page sections
- stateful UI blocks
- large domain-aware sections
- examples: `ProductListPanel`, `CartSummaryWidget`, `PaymentActionPanel`, `StoreFilterSection`

`entities/`

- domain API modules only
- domain-specific pure API functions
- domain-specific React Query hooks
- domain-specific query option factories and query keys
- API response types and domain types directly tied to that API
- mappers directly tied to that API response
- examples: `order`, `product`, `payment`, `store`, `customer`

`shared/`

- shared UI primitives
- common utilities
- common hooks
- common API client and fetchers
- common query helpers
- common formatters
- constants and config

## Rules

- Do not add folders just for architecture purity.
- Do not create `features/` by default.
- Prefer page-local code first.
- Promote code to widgets/entities/shared only when a real boundary appears.
- Keep the architecture readable for assignment reviewers.
- Do not put real page composition, data orchestration, or widget wiring in `app/page.tsx`; keep it in `views/{route}/{RoutePage}.tsx`.
- Let `app/` own only route folders, metadata/layout when needed, and thin `Page` exports.
- Plan React Query hydration at the `views/` boundary when many child widgets need the same server-prefetched domain data.
- Never put common code in `entities/`.
- Move generic utilities to `shared/util`.
- Move common API clients and fetchers to `shared/api`.
- Move common query helpers to `shared/api` or `shared/lib` depending on the project convention.
- Move shared UI to `shared/ui`.
- Move common config and constants to `shared/config` or `shared/constants`.
- Treat page/view components importing API response types directly from API modules as a boundary smell. Prefer domain-facing types or view-local props.
- If the team uses numbered FSD layers, do not physically rename Next.js `src/app`; document it as logical `0_App` while keeping the real App Router path intact.

## Hydration-aware structure

When React Query is useful, prefer this flow:

1. Domain-specific pure API functions and query options live in `entities/`.
2. A server component in `views/` creates a query client and prefetches important queries.
3. `HydrationBoundary` wraps the view section that needs client-side hooks.
4. Client widgets call entity hooks where the data is needed.

This keeps the benefit of "data can be used where it is needed" without duplicating fetch logic across components.

## Output format

### 1. Proposed folder structure

Show the exact initial structure. Include only useful folders and files.
For Next.js App Router, show `app/` route shells and `views/` page components separately.

### 2. App layer responsibilities

State what belongs in `app/`: folder routing, layouts, providers, global setup, metadata, and thin route shell components only.

### 3. Pages/views layer responsibilities

State what composes screens and connects widgets. In App Router projects, default to `views/` and include the `app/page.tsx -> views/*Page` delegation pattern.

### 4. Widgets layer responsibilities

List widgets that represent meaningful product sections.

### 5. Entities layer responsibilities

Map each domain to API-specific types, pure API functions, query option factories, hooks, query keys, and API response mappers.
Explicitly reject common utilities, common fetchers, common mappers, shared query helpers, shared UI, and global constants from `entities/`.

### 6. Shared layer responsibilities

List shared UI, common utilities, API client/fetchers, common query helpers, formatters, constants, and config.

### 7. What should stay page-local

Keep one-off composition, route-only state, and simple markup local.

### 8. What should not be abstracted yet

Call out abstractions that would be premature.
Call out FSD boundary smells: API response type leakage into views, common code in `entities`, mixed route/page/widget/entity files, and physical `src/app` renaming.

### 9. Migration path if the assignment grows

Explain when to introduce `features/`, more widgets, or deeper entity modules.
