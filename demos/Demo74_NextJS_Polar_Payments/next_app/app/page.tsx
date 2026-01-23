import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link
            href="/"
            className="text-xl font-bold text-zinc-900 dark:text-white"
          >
            PolarApp
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href="/pricing"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Pricing
            </Link>
            <SignedIn>
              <Link
                href="/dashboard"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center">
          <h1 className="mb-6 text-5xl font-bold leading-tight text-zinc-900 dark:text-white">
            Subscriptions Made Simple with Polar
          </h1>
          <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-400">
            A complete subscription management system built with Next.js,
            Clerk, Polar.sh, and Supabase.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pricing"
              className="rounded-full bg-zinc-900 px-8 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              View Pricing
            </Link>
            <SignedOut>
              <Link
                href="/sign-up"
                className="rounded-full border border-zinc-300 px-8 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Create Account
              </Link>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard"
                className="rounded-full border border-zinc-300 px-8 py-3 font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Go to Dashboard
              </Link>
            </SignedIn>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid max-w-4xl gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-4xl">&#128274;</div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
              Secure Auth
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Powered by Clerk for enterprise-grade authentication
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-4xl">&#128179;</div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
              Easy Payments
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Polar.sh handles subscriptions with Stripe integration
            </p>
          </div>
          <div className="text-center">
            <div className="mb-4 text-4xl">&#9889;</div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
              Real-time Sync
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400">
              Webhooks keep your database in sync automatically
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Built with Next.js, Clerk, Polar.sh, and Drizzle
        </div>
      </footer>
    </div>
  );
}
