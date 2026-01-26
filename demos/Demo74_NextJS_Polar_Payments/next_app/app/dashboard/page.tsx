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

  const subscriptionTier = user?.subscriptionTier ?? "free";
  const hasActiveSubscription = !!user?.polarSubscriptionId;

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
          <p className="text-zinc-600 dark:text-zinc-400">
            You are currently on the{" "}
            <span className="font-semibold capitalize text-zinc-900 dark:text-white">
              {subscriptionTier}
            </span>{" "}
            plan.
          </p>

          <div className="mt-4 flex gap-4">
            <Link
              href="/pricing"
              className="text-sm font-medium text-zinc-900 hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
            >
              {hasActiveSubscription ? "Change Plan" : "Upgrade"}
            </Link>
            {hasActiveSubscription && <CancelButton />}
          </div>
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
