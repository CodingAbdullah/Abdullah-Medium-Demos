import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="max-w-md text-center">
        <div className="mb-6 text-6xl">
          <span role="img" aria-label="checkmark">&#10003;</span>
        </div>
        <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
          Payment Successful!
        </h1>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Thank you for your subscription. Your account has been upgraded and
          you now have access to all premium features.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="rounded-full bg-zinc-900 px-6 py-3 text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/api/portal"
            className="rounded-full border border-zinc-300 px-6 py-3 text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
          >
            Manage Subscription
          </Link>
        </div>
      </div>
    </div>
  );
}
