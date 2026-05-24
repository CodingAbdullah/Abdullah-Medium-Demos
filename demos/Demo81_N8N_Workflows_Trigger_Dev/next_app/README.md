# Market Updates — N8N Webhook Trigger (via Trigger.dev)

A minimal Next.js (App Router) app that exposes a single-page email subscription form. When a user submits a valid email, the app enqueues a [Trigger.dev](https://trigger.dev) task that asynchronously POSTs the email to a configured N8N webhook, which triggers the corresponding N8N workflow (e.g., to send market update notifications).

## How it works

- `app/page.tsx` — client component rendering the subscription form. Validates the email on the client before submitting.
- `app/api/trigger/route.ts` — route handler that re-validates the email server-side, then calls `tasks.trigger()` to enqueue the Trigger.dev task. Returns immediately with a run id.
- `trigger/n8n-webhook.ts` — the Trigger.dev task. Reads `N8N_WEBHOOK_URL` and POSTs `{ email }` to it. Retries on failure per `trigger.config.ts`.
- `trigger.config.ts` — Trigger.dev project config (project ref, task dirs, retry policy, max duration).

The user-facing request returns as soon as the task is enqueued, so failures from N8N are visible in the Trigger.dev dashboard (with retries), not in the form response.

## Getting Started

1. Copy the env template and fill in the values:

   ```bash
   cp .env.local.example .env.local
   ```

   You need:
   - `N8N_WEBHOOK_URL` — the URL of your N8N Webhook node
   - `TRIGGER_SECRET_KEY` — from the Trigger.dev dashboard → API Keys
   - `TRIGGER_PROJECT_REF` — from the Trigger.dev dashboard → project settings

2. Run the Next.js dev server **and** the Trigger.dev dev worker in two terminals:

   ```bash
   # Terminal 1
   npm run dev

   # Terminal 2
   npx trigger.dev@latest dev
   ```

3. Open [http://localhost:3000](http://localhost:3000), enter an email, and submit. The route enqueues the task, the Trigger.dev worker executes it, and the N8N webhook fires with `{ "email": "..." }`.

## N8N setup

In your N8N workflow, add a **Webhook** node:

- Method: `POST`
- Body: JSON of the form `{ "email": "user@example.com" }`

Use the email value downstream (e.g., to send a market update notification email).
