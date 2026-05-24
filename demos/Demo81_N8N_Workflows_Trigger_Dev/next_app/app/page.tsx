"use client";

import { useState, type FormEvent } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; email: string }
  | { kind: "error"; message: string };

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = email.trim();

    if (!EMAIL_REGEX.test(trimmed)) {
      setStatus({ kind: "error", message: "Please enter a valid email address." });

      return;
    }

    setStatus({ kind: "submitting" });

    try {
      const res = await fetch("/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          kind: "error",
          message: data?.error ?? `Request failed (${res.status}).`,
        });

        return;
      }

      setStatus({ kind: "success", email: trimmed });
      setEmail("");
    } 
    catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  const submitting = status.kind === "submitting";

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <main className="w-full max-w-md rounded-2xl border border-black/5 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Market Updates
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Enter your email to receive notifications on the latest market updates.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4" noValidate>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
              Email
            </span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status.kind === "error") setStatus({ kind: "idle" });
              }}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="h-11 rounded-lg border border-zinc-300 bg-white px-3 text-base text-black outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="h-11 rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {submitting ? "Subscribing..." : "Subscribe"}
          </button>

          {status.kind === "success" && (
            <p className="text-sm text-green-600 dark:text-green-400">
              You're subscribed. Updates will be sent to {status.email}.
            </p>
          )}
          {status.kind === "error" && (
            <p className="text-sm text-red-600 dark:text-red-400">{status.message}</p>
          )}
        </form>
      </main>
    </div>
  );
}
