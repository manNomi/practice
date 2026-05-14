---
name: simple-fsd-architect
description: Design a lightweight FSD-inspired frontend architecture using app, pages/views, widgets, entities, and shared without over-engineering.
---

# Simple FSD Architect

Use Simple FSD to make assignment code readable, not to create empty layers. Start page-local and promote code only when a real boundary appears.

## Default layers

`app/`

- Next.js route entries
- layout
- providers
- global styles
- query client setup

`pages/` or `views/`

- page-level composition
- route-level screen composition
- orchestration between widgets

`widgets/`

- meaningful page sections
- stateful UI blocks
- large domain-aware sections
- examples: `ProductListPanel`, `CartSummaryWidget`, `PaymentActionPanel`, `StoreFilterSection`

`entities/`

- domain types
- pure API functions
- React Query hooks
- query keys
- mappers
- business rules
- examples: `order`, `product`, `payment`, `store`, `customer`

`shared/`

- shared UI primitives
- utilities
- common hooks
- base API client
- formatters
- constants

## Rules

- Do not add folders just for architecture purity.
- Do not create `features/` by default.
- Prefer page-local code first.
- Promote code to widgets/entities/shared only when a real boundary appears.
- Keep the architecture readable for assignment reviewers.

## Output format

### 1. Proposed folder structure

Show the exact initial structure. Include only useful folders and files.

### 2. App layer responsibilities

State what belongs in `app/`.

### 3. Pages/views layer responsibilities

State what composes screens and connects widgets.

### 4. Widgets layer responsibilities

List widgets that represent meaningful product sections.

### 5. Entities layer responsibilities

Map each domain to types, API, query keys, mappers, and rules.

### 6. Shared layer responsibilities

List shared UI, utilities, API client, constants, and config.

### 7. What should stay page-local

Keep one-off composition, route-only state, and simple markup local.

### 8. What should not be abstracted yet

Call out abstractions that would be premature.

### 9. Migration path if the assignment grows

Explain when to introduce `features/`, more widgets, or deeper entity modules.
