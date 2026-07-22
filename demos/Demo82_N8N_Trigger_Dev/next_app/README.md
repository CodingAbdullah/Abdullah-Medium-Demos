# Next.js + Trigger.dev

A basic Next.js App Router project wired up to run a background job with
[Trigger.dev](https://trigger.dev).

## Project Structure

```
next_app/
├── app/
│   ├── api/
│   │   └── trigger/
│   │       └── route.ts    # POST route that triggers the example task
│   ├── layout.tsx
│   └── page.tsx             # Button that calls /api/trigger
├── trigger/
│   └── example-task.ts      # Trigger.dev task definition
├── trigger.config.ts        # Trigger.dev project config
└── .env.example
```

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a free project at [trigger.dev](https://trigger.dev), copy its
   project ref into `trigger.config.ts`, and copy your secret key into
   `.env.local` (see `.env.example`).
3. Run the Trigger.dev dev server in one terminal:
   ```bash
   npm run trigger:dev
   ```
4. Run the Next.js dev server in another terminal:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) and click "Run
   background task" to trigger `example-task`.

## Deploying

- Next.js app: deploy as usual (e.g. Vercel).
- Trigger.dev tasks: `npm run trigger:deploy`.

## Learn More

- [Trigger.dev Documentation](https://trigger.dev/docs)
- [Next.js Documentation](https://nextjs.org/docs)
