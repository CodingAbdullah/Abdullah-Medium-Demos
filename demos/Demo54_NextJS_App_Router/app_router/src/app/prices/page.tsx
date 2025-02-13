import CryptoPricesTable from "../components/CryptoPricesTable";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
    title: "Cryptocurrency Prices",
    description: "Analyze the top winning and losing cryptocurrencies in the market"
}

// Cryptocurrency Prices Page
export default function CryptoCurrencyPricesPage() {

    // Render the Cryptocurrency Prices Page
    // Include the Top Winning and Top Losing Coins Table Components
    return (
        <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
            <h1 className="text-5xl font-bold mb-6 text-center">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
                    Cryptocurrency Prices
                </span>
            </h1>
            <p className="text-xl text-gray-400 mb-12 text-center">
                Dive deep into market prices
            </p>
            <hr className='mt-5' />
            <CryptoPricesTable />
        </div>
    )
}