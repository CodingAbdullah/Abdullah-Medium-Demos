'use client';

import useSWR from "swr";
import WalletStatsInfoType from "../utils/types/WalletStatsInfoType";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "../components/ui/table";
import PostFetcher from "../utils/functions/PostFetcher";
import PostFetcherArgumentsType from '../utils/types/PostFetcherArgumentsType';

// Custom Wallet Stats Info Table Component
export default function WalletStatsInfoTable(props: { address: string }) {
    const { address } = props;
    const { data, error: walletStatsError, isLoading: loadingWalletStats } = 
    useSWR(['/api/wallet-stats', { address }], ([url, body]: [string, PostFetcherArgumentsType]) => PostFetcher(url, { arg: body }), { refreshInterval: 100000 });

    if (loadingWalletStats) {
        return <div>Loading Wallet Statistics Info Table Component...</div>
    }
    else if (walletStatsError) {
        throw new Error();
    }
    else {
        const walletStatsData: WalletStatsInfoType = data;
        
        // Render Wallet Stats Info Table Component
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-100">Wallet Statistics</h2>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">NFTs</TableHead>
                            <TableHead className="text-gray-300">Collections</TableHead>
                            <TableHead className="text-gray-300">Transactions</TableHead>
                            <TableHead className="text-gray-300">NFT Transfers</TableHead>
                            <TableHead className="text-gray-300">Token Transfers</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className="border-b border-gray-800">
                            <TableCell className="text-gray-300">{walletStatsData?.nfts}</TableCell>
                            <TableCell className="text-gray-300">{walletStatsData?.collections}</TableCell>
                            <TableCell className="text-gray-300">{walletStatsData?.transactions.total}</TableCell>
                            <TableCell className="text-gray-300">{walletStatsData?.nft_transfers.total}</TableCell>
                            <TableCell className="text-gray-300">{walletStatsData?.token_transfers.total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        )
    }
}   