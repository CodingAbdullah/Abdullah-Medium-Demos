import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

const features = [
  {
    title: "Authentication",
    description:
      "Secure sign-in and sign-up flows powered by Clerk with social logins, MFA, and session management.",
  },
  {
    title: "Protected Routes",
    description:
      "Middleware-based route protection ensures only authenticated users access premium content.",
  },
  {
    title: "Flexible Pricing",
    description:
      "Three-tier pricing model ready for Stripe integration — Free, Pro, and Enterprise plans.",
  },
];

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-65px)]">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight">
          Ship your SaaS{" "}
          <span className="text-blue-600">in record time</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-zinc-600 dark:text-zinc-400">
          A production-ready Next.js starter with authentication, protected
          routes, and a pricing page — so you can focus on building your
          product.
        </p>

        <div className="mt-10 flex gap-4">
          <SignedOut>
            <SignUpButton>
              <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer">
                Get Started
              </button>
            </SignUpButton>
            <SignInButton>
              <button className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/pricing"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              View Pricing
            </Link>
          </SignedIn>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800"
            >
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
