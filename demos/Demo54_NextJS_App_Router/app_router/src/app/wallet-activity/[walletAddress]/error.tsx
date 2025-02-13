'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, Home } from 'lucide-react';
import { Button } from "../../components/ui/button";

// Custom Error Page for the Wallet Activity Page
export default function WalletActivityErrorPage({
  error
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  // Render Custom Error Page for the Wallet Activity Page
  return (
    <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-3xl font-bold text-gray-100 mb-4">Error Loading Wallet Activity Page</h3>
        <p className="text-xl text-gray-400 mb-8">
          We are having trouble retrieving the Wallet Activity page. This could likely be due to network issues or an invalid wallet address. 
          <br />
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            asChild
            variant="outline"
            className="inline-flex items-center px-6 py-3 border border-gray-600 text-base font-medium rounded-md text-gray-300 bg-gray-900 hover:bg-gray-800 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-600 transition-colors duration-200"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}