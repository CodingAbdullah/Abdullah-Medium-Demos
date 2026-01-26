"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CancelButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your subscription?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscription/cancel", { method: "POST" });
      const data = await res.json();

      // If no subscription exists, just reload
      if (data.alreadyCancelled) {
        window.location.reload();
        return;
      }

      if (!res.ok) throw new Error("Failed to cancel");

      // Show confirmation and reload
      if (data.pendingCancellation) {
        alert("Your subscription will be cancelled at the end of the billing period.");
      }
      window.location.reload();
    } catch {
      alert("Failed to cancel subscription. Please try again.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
    >
      {loading ? "Cancelling..." : "Cancel Subscription"}
    </button>
  );
}
