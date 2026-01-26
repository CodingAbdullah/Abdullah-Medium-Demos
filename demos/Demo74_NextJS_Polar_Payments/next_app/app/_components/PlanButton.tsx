"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import PlanButtonType from '../_utils/PlanButtonType';

// Plan button for selecting or changing subscription plans
export default function PlanButton({ plan, className, children }: PlanButtonType) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch user subscription status on mount or when sign-in state changes
  useEffect(() => {
    if (isSignedIn) {
      fetch("/api/user/status")
        .then((res) => res.json())
        .then((data) => setHasActiveSubscription(data.hasActiveSubscription))
        .catch(() => setHasActiveSubscription(false));
    }
  }, [isSignedIn]);

  const handleClick = async () => {
    if (!isSignedIn) {
      router.push(`/api/checkout?plan=${plan}`);
      return;
    }

    if (!hasActiveSubscription) {
      router.push(`/api/checkout?plan=${plan}`);
      return;
    }

    // User is subscribed - use change plan API
    setLoading(true);

    try {
      const res = await fetch("/api/subscription/change", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan })
      });

      const data = await res.json();

      // If subscription was cancelled, redirect to checkout
      if (data.useCheckout) {
        router.push(`/api/checkout?plan=${plan}`);
        return;
      }

      if (!res.ok) throw new Error("Failed to change plan");

      router.push("/checkout/success");
      router.refresh();
    }
    catch {
      alert("Failed to change plan. Please try again.");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading} className={className}>
      {loading ? "Processing..." : children}
    </button>
  );
}
