import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import CancelButton from "./CancelButton";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.clerkId, userId)
  });

  // Simple logic using database fields:
  // - isSubscribed: true = active subscription, false = cancelled or none
  // - subscriptionTier: current tier (or "free")
  // - subscriptionEndDate: when access ends (for grace period)
  // - polarSubscriptionId: exists if subscription is active in Polar

  const currentTier = user?.subscriptionTier ?? "free";
  const isSubscribed = user?.isSubscribed ?? false;
  const hasSubscriptionId = !!user?.polarSubscriptionId;
  const subscriptionEndDate = user?.subscriptionEndDate;

  // Grace period: not subscribed, but tier is not free and end date is in future
  const isInGracePeriod = !isSubscribed &&
    currentTier !== "free" &&
    subscriptionEndDate &&
    subscriptionEndDate > new Date();

  // Has active subscription: subscribed and has subscription ID
  const hasActiveSubscription = isSubscribed && hasSubscriptionId;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-black">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold text-zinc-900 dark:text-white">
          Dashboard
        </h1>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-2 text-lg font-medium text-zinc-900 dark:text-white">
            Your Plan
          </h2>

          {/* Current subscription status */}
          <p className="text-zinc-600 dark:text-zinc-400">
            Current plan:{" "}
            <span className="font-semibold capitalize text-zinc-900 dark:text-white">
              {currentTier}
            </span>
          </p>

          {/* Grace period notice */}
          {isInGracePeriod && (
            <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 p-3 dark:bg-amber-900/20 dark:border-amber-800">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Subscription cancelled - access ends{" "}
                <span className="font-semibold">
                  {subscriptionEndDate?.toLocaleDateString() ?? "at end of billing period"}
                </span>
              </p>
            </div>
          )}

          {/* Show Subscribe button only if truly free (no active sub AND no grace period) */}
          {!hasActiveSubscription && !isInGracePeriod && (
            <div className="mt-4">
              <Link
                href="/pricing"
                className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
              >
                Subscribe
              </Link>
            </div>
          )}

          {/* Show Cancel button only for active subs NOT in grace period */}
          {hasActiveSubscription && !isInGracePeriod && (
            <div className="mt-4">
              <CancelButton />
            </div>
          )}
        </div>

        <Link
          href="/"
          className="mt-6 inline-block rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
