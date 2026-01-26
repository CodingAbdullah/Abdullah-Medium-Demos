import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mb-6 text-6xl">&#10003;</div>

        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-white">
          Payment Successful
        </h1>

        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          Thank you for subscribing. Your account has been upgraded.
        </p>

        <Link
          href="/dashboard"
          className="block w-full rounded-lg bg-zinc-900 py-3 font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
