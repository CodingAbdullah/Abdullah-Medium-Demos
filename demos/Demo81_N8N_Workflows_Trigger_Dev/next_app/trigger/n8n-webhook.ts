import { task } from "@trigger.dev/sdk";

export const n8nWebhookTask = task({
  id: "n8n-webhook",
  run: async (payload: { email: string }) => {
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (!webhookUrl) {
      throw new Error("N8N_WEBHOOK_URL is not configured.");
    }

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: payload.email }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        `N8N webhook responded with ${res.status}: ${detail || "no body"}`
      );
    }

    return { ok: true, email: payload.email, status: res.status };
  },
});
