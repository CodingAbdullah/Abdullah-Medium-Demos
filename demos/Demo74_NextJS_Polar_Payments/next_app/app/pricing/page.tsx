"use client";

import { useState } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Plans from '../_utils/plansList';
import PlanButton from "../_components/PlanButton";

// Pricing page detailing the different subscription plans users can subscribe to
export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

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
              className="text-zinc-900 font-medium dark:text-white"
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

      {/* Pricing Content */}
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Choose the plan that works best for you
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium ${
                  !isAnnual
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? "bg-emerald-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  isAnnual
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400"
                }`}
              >
                Annual
              </span>
              {isAnnual && (
                <span className="ml-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                  Save up to 33%
                </span>
              )}
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {Plans.free.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {Plans.free.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                    $0
                  </span>
                  <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                    /month
                  </span>
                </div>
              </div>

              <Link
                href="/sign-up"
                className="mb-8 block w-full rounded-lg border border-zinc-300 py-3 text-center font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Get Started
              </Link>

              <ul className="space-y-4">
                {Plans.free.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-zinc-400"
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
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Basic Plan */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {Plans.basic.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {Plans.basic.description}
                </p>
              </div>

              <div className="mb-6">
                {isAnnual ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                        $10
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        /month
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-zinc-400 line-through">
                        $15/month
                      </span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Save {Plans.basic.annualSavings}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Billed annually at ${Plans.basic.annualPrice}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                      ${Plans.basic.monthlyPrice}
                    </span>
                    <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                      /month
                    </span>
                  </div>
                )}
              </div>

              <PlanButton
                plan={`basic-${isAnnual ? "annual" : "monthly"}`}
                className="mb-8 block w-full rounded-lg border border-zinc-300 py-3 text-center font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Subscribe
              </PlanButton>

              <ul className="space-y-4">
                {Plans.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-emerald-500"
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
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pro Plan - Popular */}
            <div className="relative rounded-2xl border-2 border-emerald-500 bg-white p-8 dark:bg-zinc-900">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="rounded-full bg-emerald-500 px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {Plans.pro.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {Plans.pro.description}
                </p>
              </div>

              <div className="mb-6">
                {isAnnual ? (
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                        $24
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">
                        /month
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm text-zinc-400 line-through">
                        $30/month
                      </span>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                        Save {Plans.pro.annualSavings}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                      Billed annually at ${Plans.pro.annualPrice}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                      ${Plans.pro.monthlyPrice}
                    </span>
                    <span className="ml-2 text-zinc-500 dark:text-zinc-400">
                      /month
                    </span>
                  </div>
                )}
              </div>

              <PlanButton
                plan={`pro-${isAnnual ? "annual" : "monthly"}`}
                className="mb-8 block w-full rounded-lg bg-emerald-500 py-3 text-center font-medium text-white transition-colors hover:bg-emerald-600"
              >
                Subscribe
              </PlanButton>

              <ul className="space-y-4">
                {Plans.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-emerald-500"
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
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* FAQ or additional info */}
          <div className="mt-16 text-center">
            <p className="text-zinc-600 dark:text-zinc-400">
              Cancel anytime. Secure payments powered by Polar.
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
