---
name: stack-setup-planner
description: Choose the simplest suitable frontend stack for an assignment, including Vite, Next.js, TypeScript, Tailwind, Emotion, React Query, Vitest, Jest, PNPM, and Yarn Berry.
---

# Stack Setup Planner

Choose the smallest stack that satisfies the assignment and helps reviewers see good frontend judgment. Do not add dependencies to signal seniority.

## Vite vs Next.js

Prefer Vite + React + TypeScript when:

- the assignment is a pure client-side app
- SSR is not required
- file-based routing is unnecessary
- fast setup and simple build are important
- the product resembles POS, kiosk, dashboard, or internal tool UI

Prefer Next.js when:

- the assignment explicitly asks for Next.js
- routing structure matters
- SSR, SSG, ISR, metadata, or server functions are required
- cacheable server-rendered data matters
- the provided template is already Next.js

## Tailwind vs Emotion

Prefer Tailwind when:

- speed of implementation matters
- visual system is simple
- styling requirements are not complex
- the assignment does not require CSS-in-JS

Prefer Emotion when:

- the assignment asks for CSS-in-JS
- Toss Place stack alignment matters
- component-level dynamic styling is central
- the provided template already uses Emotion

## React Query

Use React Query when:

- API fetching is meaningful
- client-side refetch, mutation, invalidation, optimistic update, caching, loading/error states matter
- server state is separate from UI state

Do not use React Query when:

- data is fully static
- data is local mock only
- Server Component fetch is enough
- it adds more complexity than value

## Testing

- Prefer Vitest for Vite projects.
- Prefer Jest if the project already uses Jest.
- Add tests where they improve confidence: domain logic, validation, mappers, and critical user flows.

## Output format

### 1. Recommended stack

Name the stack and package manager. Include framework, language, styling, data fetching, and testing.

### 2. Why this stack fits

Tie the choice to assignment requirements and Toss Place style constraints.

### 3. What not to add

List dependencies or frameworks that would add avoidable complexity.

### 4. Initial folder structure

Show the starting structure only. Avoid architecture-only empty folders.

### 5. Setup commands

Provide exact install/scaffold commands.

### 6. Required scripts

List expected `dev`, `build`, `lint`, `typecheck`, and `test` scripts when applicable.

### 7. Verification commands

List commands to prove the setup works.

### 8. Risks and trade-offs

State what this stack makes easier and what it does not solve.
