import Link from 'next/link';
import { Home } from 'lucide-react';
import { Button } from './components/ui/button';

// Not Found Page for the Default Route
export default function NotFound() {
  return (
    <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-400 mb-8">Oops! The page you are looking for does not exist on this app.</p>
        <div className="flex justify-center space-x-4">
            <Button className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-2 px-6 rounded-md hover:from-gray-500 hover:to-gray-300 transition-all duration-300 transform hover:scale-105" asChild>
                <Link 
                    href="/" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-300 transition-colors duration-200"
                >
                    <Home className="w-5 h-5 mr-2" />
                    Back to Home
                </Link>          
            </Button>
        </div>
      </div>
    </div>
  )
}