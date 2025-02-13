// Footer Custom Component
export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="border-t border-gray-800 pt-5 text-center">
                    <p className="text-gray-500 text-sm font-mono">
                        &copy; { new Date().getFullYear() } Next.js App Router. Powered by Next.js
                    </p>
                </div>
            </div>
        </footer>
    )
}