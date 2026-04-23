@skill.md

# Project
Next.js 16.2.4 · React 19 · TypeScript 5 · Tailwind CSS 4 · App Router

# Conventions
- `params` is a `Promise` — always `await params` before destructuring
- Layouts and pages are Server Components by default; add `"use client"` only for interactivity
- API endpoints live at `app/api/*/route.ts` (Route Handlers), not `pages/api/`
- Tailwind is imported via `@import "tailwindcss"` + `@theme inline {}` — no legacy directives
- Import alias `@/*` resolves to the project root
