import { type Metadata } from 'next'
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Matrix Auth Portal',
  description: 'Secure authentication with neon-green matrix styling',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#00ff41',
          colorBackground: '#0a0a0a',
          colorInputBackground: '#000000',
          colorInputText: '#00ff41',
          colorText: '#00ff41',
          colorTextSecondary: '#00cc33',
          colorDanger: '#ff0000',
          colorSuccess: '#00ff41',
          colorWarning: '#ffff00',
          colorTextOnPrimaryBackground: '#000000',
          fontFamily: 'monospace',
          borderRadius: '0.25rem',
        },
        elements: {
          card: 'bg-black border border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.3)]',
          headerTitle: 'text-[#00ff41]',
          headerSubtitle: 'text-[#00cc33]',
          formButtonPrimary: 'bg-[#00ff41] text-black hover:bg-[#00cc33] shadow-[0_0_10px_rgba(0,255,65,0.5)] border-none',
          formFieldInput: 'bg-black border border-[#00ff41] text-[#00ff41] focus:shadow-[0_0_8px_rgba(0,255,65,0.4)]',
          formFieldLabel: 'text-[#00ff41]',
          footerActionLink: 'text-[#00ff41] hover:text-[#00cc33]',
          dividerLine: 'bg-[#00ff41]',
          dividerText: 'text-[#00cc33]',
          socialButtonsBlockButton: 'border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black',
          formFieldInputShowPasswordButton: 'text-[#00ff41]',
          identityPreviewText: 'text-[#00ff41]',
          identityPreviewEditButton: 'text-[#00ff41]',
          formResendCodeLink: 'text-[#00ff41]',
          otpCodeFieldInput: 'border-[#00ff41] text-[#00ff41]',
          footerAction: 'hidden',
        },
        layout: {
          logoPlacement: 'none',
          showOptionalFields: false,
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/"
      afterSignUpUrl="/"
    >
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#00ff41] text-black rounded-md font-mono font-bold text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer shadow-[0_0_10px_rgba(0,255,65,0.5)] hover:bg-[#00cc33] border border-[#00ff41]">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10 border-2 border-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.5)]',
                    userButtonPopoverCard: 'bg-black border-2 border-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.3)]',
                    userButtonPopoverActionButton: 'text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-all',
                    userButtonPopoverActionButtonText: 'text-[#00ff41]',
                    userButtonPopoverActionButtonIcon: 'text-[#00ff41]',
                    userButtonPopoverFooter: 'hidden',
                    userPreviewMainIdentifier: 'text-[#00ff41]',
                    userPreviewSecondaryIdentifier: 'text-[#00cc33]',
                  },
                }}
              />
            </SignedIn>
          </header>
          {children}
          <Toaster duration={3500} />
        </body>
      </html>
    </ClerkProvider>
  )
}