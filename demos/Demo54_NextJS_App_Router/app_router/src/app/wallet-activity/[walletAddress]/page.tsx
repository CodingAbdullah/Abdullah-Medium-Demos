import WalletStatsInfoTable from "@/app/components/WalletStatsInfoTable";
import addressValidator from "@/app/utils/functions/addressValidator";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
    title: "Wallet Activity",
    description: "Analyze wallets along with their activity"
}

// Custom Wallet Activity Page Component
export default async function WalletActivityPage({ params }: { params: Promise<{ walletAddress: string }> }) {
    const address = (await params).walletAddress;
    
    // Dynamically render this page based on wallet address validity
    if (!addressValidator(address.trim())) {
        throw new Error();
    }
    else {
        return (
            <>
                <div className="bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
                    <h1 className="text-5xl font-bold mb-6 text-center">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
                            Wallet Transaction Activity
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 text-center">
                        Get detailed activity of a particular wallet 
                    </p>
                    <WalletStatsInfoTable address={address.trim()} />
                </div>
            </>
        )
    }
}