import { NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk";
import type { n8nWebhookTask } from "@/trigger/n8n-webhook";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // REGEX for evaluating a valid email address

// POST back-end route — enqueues a Trigger.dev task that fires the N8N webhook
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  }
  catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? String((body as { email: unknown }).email ?? "").trim()
      : "";

  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  try {
    // Enqueue the task in Trigger.dev — it will run asynchronously and call the N8N webhook
    const handle = await tasks.trigger<typeof n8nWebhookTask>("n8n-webhook", {
      email,
    });

    return NextResponse.json({ ok: true, email, runId: handle.id });
  }
  catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to enqueue task.", detail: message },
      { status: 500 }
    );
  }
}
