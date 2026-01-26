"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SubscriptionStatus {
  isSubscribed: boolean;
  subscriptionTier: string;
  error?: string;
}

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const [status, setStatus] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 10;
  const POLL_INTERVAL = 2000; // 2 seconds

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const checkSubscription = async () => {
      try {
        const response = await fetch("/api/subscription/status");
        const data = await response.json();

        if (!mounted) return;

        if (data.isSubscribed) {
          setStatus(data);
          setLoading(false);
        } else if (attempts < MAX_ATTEMPTS) {
          // Webhook might not have processed yet, retry
          setAttempts((prev) => prev + 1);
          timeoutId = setTimeout(checkSubscription, POLL_INTERVAL);
        } else {
          // Max attempts reached
          setStatus({ isSubscribed: false, subscriptionTier: "free" });
          setLoading(false);
        }
      } catch {
        if (!mounted) return;
        if (attempts < MAX_ATTEMPTS) {
          setAttempts((prev) => prev + 1);
          timeoutId = setTimeout(checkSubscription, POLL_INTERVAL);
        } else {
          setStatus({ isSubscribed: false, subscriptionTier: "free", error: "Failed to verify" });
          setLoading(false);
        }
      }
    };

    checkSubscription();

    return () => {
      mounted = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [attempts]);

  // Loading state - waiting for webhook
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent"></div>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
            Processing Payment...
          </h1>

          <p className="text-zinc-600 dark:text-zinc-400">
            Please wait while we confirm your subscription.
          </p>

          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            Attempt {attempts + 1} of {MAX_ATTEMPTS}
          </p>
        </div>
      </div>
    );
  }

  // Subscription confirmed
  if (status?.isSubscribed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 text-6xl text-emerald-500">&#10003;</div>

          <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
            Payment Successful!
          </h1>

          <p className="mb-2 text-zinc-600 dark:text-zinc-400">
            Thank you for subscribing to the{" "}
            <span className="font-semibold capitalize text-emerald-600 dark:text-emerald-400">
              {status.subscriptionTier}
            </span>{" "}
            plan.
          </p>

          <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-500">
            Your account has been upgraded and you now have access to all premium features.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/dashboard"
              className="block w-full rounded-lg bg-emerald-500 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
            >
              Go to Dashboard
            </Link>

            <Link
              href="/"
              className="block w-full rounded-lg border border-zinc-300 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Subscription not found after max attempts
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-5xl text-yellow-500">&#9888;</div>

        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Verification Pending
        </h1>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Your payment was received, but we&apos;re still processing your subscription.
          This usually takes a few seconds. Please check your dashboard or try refreshing.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              setLoading(true);
              setAttempts(0);
            }}
            className="block w-full rounded-lg bg-emerald-500 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Try Again
          </button>

          <Link
            href="/dashboard"
            className="block w-full rounded-lg border border-zinc-300 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
