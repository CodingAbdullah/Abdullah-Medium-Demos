import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getUserSubscription } from "@/lib/subscription";
import { TIER_INFO, type SubscriptionTier } from "@/lib/polar";
import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function DashboardPage() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const subscription = await getUserSubscription();
  const tierInfo = TIER_INFO[subscription.tier as SubscriptionTier];

  // Get recent orders
  const recentOrders = subscription.user
    ? await db
        .select()
        .from(orders)
        .where(eq(orders.userId, subscription.user.id))
        .orderBy(desc(orders.createdAt))
        .limit(5)
    : [];

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 dark:bg-black">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Dashboard
          </h1>
          <div className="flex gap-4">
            <Link
              href="/pricing"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
            >
              View Plans
            </Link>
            <Link
              href="/api/portal"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Manage Subscription
            </Link>
          </div>
        </div>

        {/* User Info */}
        <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Account
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Name</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Email</p>
              <p className="font-medium text-zinc-900 dark:text-white">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Subscription Status */}
        <div className="mb-8 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Subscription
          </h2>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {tierInfo.name}
                </span>
                {subscription.isSubscribed && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                )}
                {!subscription.isSubscribed && (
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Free Tier
                  </span>
                )}
              </div>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                ${tierInfo.price}/month
              </p>
              {subscription.user?.subscriptionEndDate && (
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
                  {subscription.isSubscribed ? "Renews" : "Expired"} on{" "}
                  {new Date(
                    subscription.user.subscriptionEndDate
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
            {!subscription.isSubscribed && (
              <Link
                href="/pricing"
                className="rounded-full bg-zinc-900 px-6 py-2 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Upgrade
              </Link>
            )}
          </div>

          {/* Features */}
          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <h3 className="mb-3 text-sm font-medium text-zinc-900 dark:text-white">
              Included Features
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {tierInfo.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center text-sm text-zinc-600 dark:text-zinc-400"
                >
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Recent Orders
          </h2>
          {recentOrders.length > 0 ? (
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white">
                      {TIER_INFO[order.subscriptionTier as SubscriptionTier]
                        ?.name ?? order.subscriptionTier}{" "}
                      Plan
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-zinc-900 dark:text-white">
                      ${(order.amount / 100).toFixed(2)}
                    </p>
                    <p
                      className={`text-sm ${
                        order.status === "paid"
                          ? "text-green-600 dark:text-green-400"
                          : order.status === "refunded"
                            ? "text-orange-600 dark:text-orange-400"
                            : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 dark:text-zinc-400">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
