import HomePageWalletForm from './components/HomePageWalletForm';
import type { Metadata } from "next"

// Custom Metadata
export const metadata: Metadata = {
  title: "Home Page",
  description: "Home Page for the Next.js App Router Demo"
}

// Home Page Custom Component
export default function HomePage() {

  // Return JSX for the Home Page component
  return (
    <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
          Dashboard
        </span>
      </h1>
      <div className="max-w-3xl mx-auto">
        <p className="text-lg mb-8">
          Fancy a quick demo to learn about Next.js App Router?
        </p>
        <HomePageWalletForm />
      </div>
    </div>
  )
}