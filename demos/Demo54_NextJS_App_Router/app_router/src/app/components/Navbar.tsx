import Link from 'next/link';

// Navbar Custom Component
export default function Navbar() {

    // Render Navbar Custom Component
    return (
        <nav className="bg-gray-900 text-gray-300 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
                            Next.js App Router
                        </Link>
                        <Link 
                            href="/prices"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            Prices
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}