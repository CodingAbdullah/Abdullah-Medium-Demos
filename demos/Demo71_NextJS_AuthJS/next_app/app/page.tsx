import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()

  return (
    <div className="flex min-h-screen items-center justify-center bg-black font-mono">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8">
        {/* Matrix-style header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-[#00ff41] mb-4 tracking-wider animate-pulse">
            MATRIX AUTH PORTAL
          </h1>
          <div className="h-1 w-64 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent mx-auto"></div>
        </div>

        {/* Signed Out View */}
        <SignedOut>
          <div className="border border-[#00ff41] bg-black p-12 rounded shadow-[0_0_20px_rgba(0,255,65,0.3)] max-w-2xl w-full">
            <div className="space-y-6 text-center">
              <div className="text-[#00ff41] text-xl mb-6">
                <p className="mb-2">&gt; ACCESS_DENIED</p>
                <p className="text-[#00cc33] text-sm">AUTHENTICATION_REQUIRED</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/sign-in"
                  className="bg-[#00ff41] text-black px-8 py-3 rounded font-bold text-lg shadow-[0_0_15px_rgba(0,255,65,0.5)] hover:bg-[#00cc33] transition-all border border-[#00ff41]"
                >
                  SIGN IN
                </Link>
                <Link
                  href="/sign-up"
                  className="border border-[#00ff41] text-[#00ff41] px-8 py-3 rounded font-bold text-lg hover:bg-[#00ff41] hover:text-black transition-all"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </div>
        </SignedOut>

        {/* Signed In View */}
        <SignedIn>
          <div className="border border-[#00ff41] bg-black p-12 rounded shadow-[0_0_20px_rgba(0,255,65,0.3)] max-w-2xl w-full">
            <div className="space-y-6">
              <div className="text-[#00ff41] text-xl mb-6">
                <p className="mb-2">&gt; ACCESS_GRANTED</p>
                <p className="text-[#00cc33] text-sm">WELCOME_TO_THE_MATRIX</p>
              </div>

              {user && (
                <div className="space-y-4 border border-[#00ff41]/30 p-6 rounded bg-black/50">
                  <h2 className="text-2xl font-bold text-[#00ff41] mb-4">USER DATA:</h2>

                  <div className="space-y-2 font-mono text-sm">
                    <div className="flex">
                      <span className="text-[#00cc33] w-32">ID:</span>
                      <span className="text-[#00ff41]">{user.id}</span>
                    </div>

                    {user.firstName && (
                      <div className="flex">
                        <span className="text-[#00cc33] w-32">FIRST_NAME:</span>
                        <span className="text-[#00ff41]">{user.firstName}</span>
                      </div>
                    )}

                    {user.lastName && (
                      <div className="flex">
                        <span className="text-[#00cc33] w-32">LAST_NAME:</span>
                        <span className="text-[#00ff41]">{user.lastName}</span>
                      </div>
                    )}

                    {user.emailAddresses.length > 0 && (
                      <div className="flex">
                        <span className="text-[#00cc33] w-32">EMAIL:</span>
                        <span className="text-[#00ff41]">{user.emailAddresses[0].emailAddress}</span>
                      </div>
                    )}

                    <div className="flex">
                      <span className="text-[#00cc33] w-32">CREATED:</span>
                      <span className="text-[#00ff41]">{new Date(user.createdAt).toLocaleString()}</span>
                    </div>

                    <div className="flex">
                      <span className="text-[#00cc33] w-32">LAST_SIGN_IN:</span>
                      <span className="text-[#00ff41]">{user.lastSignInAt ? new Date(user.lastSignInAt).toLocaleString() : 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-6 text-center">
                <p className="text-[#00cc33] text-sm mb-4">
                  &gt; Use the UserButton in the top-right to sign out
                </p>
              </div>
            </div>
          </div>
        </SignedIn>

        {/* Footer */}
        <div className="mt-12 text-center text-[#00cc33] text-sm font-mono">
          <p>&gt; Powered by Clerk.js + Next.js App Router</p>
        </div>
      </main>
    </div>
  )
}
