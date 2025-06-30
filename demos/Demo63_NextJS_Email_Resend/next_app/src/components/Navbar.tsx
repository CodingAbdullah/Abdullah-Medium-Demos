import Link from 'next/link';

// Navbar Custom Component
export default function Navbar() {
    return (
        <nav className="bg-gray-900 text-gray-300 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-100 hover:to-gray-300 transition-all duration-300">
                            User Password Resets
                        </Link>
                        <Link 
                            href="/register-user"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            Register User
                        </Link>
                        <Link 
                            href="/login-user"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            Login User
                        </Link>
                        <Link 
                            href="/password-reset-user"
                            className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            Password Reset
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}