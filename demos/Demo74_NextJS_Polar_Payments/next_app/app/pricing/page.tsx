import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { getUserSubscription } from "@/lib/subscription";
import { TIER_INFO, TIER_PRODUCT_MAP, type SubscriptionTier } from "@/lib/polar";

export default async function PricingPage() {
  const { userId } = await auth();
  const user = userId ? await currentUser() : null;
  const subscription = userId ? await getUserSubscription() : null;
  const currentTier = subscription?.tier ?? "free";

  const tiers: SubscriptionTier[] = ["basic", "pro", "enterprise"];

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-16 dark:bg-black">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-zinc-900 dark:text-white">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            Choose the plan that works best for you
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => {
            const info = TIER_INFO[tier];
            const productId = TIER_PRODUCT_MAP[tier];
            const isCurrentPlan = currentTier === tier;
            const isPopular = tier === "pro";

            // Build checkout URL with customer info if logged in
            const checkoutParams = new URLSearchParams({ products: productId });
            if (user?.emailAddresses[0]?.emailAddress) {
              checkoutParams.append(
                "customerEmail",
                user.emailAddresses[0].emailAddress
              );
              checkoutParams.append("customerExternalId", userId!);
            }
            const checkoutUrl = `/api/checkout?${checkoutParams.toString()}`;

            return (
              <div
                key={tier}
                className={`relative rounded-2xl border bg-white p-8 shadow-sm dark:bg-zinc-900 ${
                  isPopular
                    ? "border-zinc-900 dark:border-white"
                    : "border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-1 text-sm font-medium text-white dark:bg-white dark:text-black">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {info.name}
                  </h2>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                      ${info.price}
                    </span>
                    <span className="ml-1 text-zinc-600 dark:text-zinc-400">
                      /month
                    </span>
                  </div>
                </div>

                <ul className="mb-8 space-y-3">
                  {info.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start text-zinc-600 dark:text-zinc-400"
                    >
                      <svg
                        className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-green-500"
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

                {isCurrentPlan ? (
                  <div className="rounded-full bg-zinc-100 py-3 text-center font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                    Current Plan
                  </div>
                ) : userId ? (
                  <Link
                    href={checkoutUrl}
                    className={`block rounded-full py-3 text-center font-medium transition-colors ${
                      isPopular
                        ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        : "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    }`}
                  >
                    Subscribe
                  </Link>
                ) : (
                  <Link
                    href="/sign-up"
                    className={`block rounded-full py-3 text-center font-medium transition-colors ${
                      isPopular
                        ? "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                        : "border border-zinc-300 text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    }`}
                  >
                    Get Started
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {subscription?.isSubscribed && (
          <div className="mt-12 text-center">
            <Link
              href="/api/portal"
              className="text-zinc-600 underline hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Manage your subscription
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
