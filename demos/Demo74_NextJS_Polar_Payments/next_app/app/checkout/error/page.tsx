"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const ERROR_MESSAGES: Record<string, { title: string; message: string }> = {
  "invalid-plan": {
    title: "Invalid Plan",
    message: "The plan you selected is not valid. Please go back and choose a valid subscription plan.",
  },
  "user-not-found": {
    title: "Account Not Found",
    message: "We couldn't find your account. Please sign up or sign in first before subscribing.",
  },
  "checkout-failed": {
    title: "Checkout Failed",
    message: "Something went wrong while setting up your checkout. Please try again.",
  },
  "no-subscription": {
    title: "No Active Subscription",
    message: "Your subscription could not be verified. If you just completed a payment, please wait a moment and try again.",
  },
};

const DEFAULT_ERROR = {
  title: "Something Went Wrong",
  message: "An unexpected error occurred. Please try again or contact support.",
};

export default function CheckoutErrorPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get("error");
  const errorInfo = errorCode ? ERROR_MESSAGES[errorCode] || DEFAULT_ERROR : DEFAULT_ERROR;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-5xl text-red-500">&#10006;</div>

        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          {errorInfo.title}
        </h1>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          {errorInfo.message}
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/pricing"
            className="block w-full rounded-lg bg-emerald-500 py-3 font-medium text-white transition-colors hover:bg-emerald-600"
          >
            Back to Pricing
          </Link>

          <Link
            href="/"
            className="block w-full rounded-lg border border-zinc-300 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
