"use client";

import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/generate", { method: "POST" });
      const data = await res.json();
      setResponse(data.text);
    } 
    catch (err) {
      setResponse("Error generating response. Please try again.");
    } 
    finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start gap-8 bg-zinc-50 px-6 py-16 font-sans dark:bg-black">
      <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Bittensor Chutes AI Generator
      </h1>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
      >
        {loading ? "Generating..." : "Generate HTML Page"}
      </button>

      {response && (
        <pre className="w-full max-w-3xl overflow-auto rounded-lg border border-black/10 bg-white p-6 text-sm leading-relaxed text-black dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200">
          {response}
        </pre>
      )}
    </div>
  );
}
