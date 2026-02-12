import Link from 'next/link';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
      <Link href="/" className="text-xl font-bold tracking-tight">
        SaaSApp
      </Link>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton>
            <button className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        <SignedIn>
          <Link
            href="/pricing"
            className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white"
          >
            Pricing
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
