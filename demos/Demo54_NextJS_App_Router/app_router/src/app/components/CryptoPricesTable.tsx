"use client";

import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Input } from "../components/ui/input";
import GenericFetcher from "../utils/functions/GenericFetcher";
import CoinPricesType from "../utils/types/CoinPricesType";

// Trending Coins Table Custom Component
export default function CryptoPriceTable() {
    const [filter, setFilter] = useState<string>("");
    const { data: coins, error: coinsError, isLoading: loadingCoins } = useSWR<CoinPricesType[]>('/api/coin-prices', GenericFetcher, { refreshInterval: 100000 });
    
    // Conditionally render this component
    if (coinsError){
        return <div className="text-red-500 p-4">Error Loading Coins Data...</div>
    }
    else if (loadingCoins) {
        return <div className="text-gray-300 p-4">Loading Coins Data Table...</div>
    }
    else {
        // Filter data table rows based on input request
        const filteredCoinsData = coins?.filter(
            (coin) =>
              coin.name.toLowerCase().includes(filter) ||
              coin.symbol.toLowerCase().includes(filter)
        );

        // Render component using the information provided
        return (
            <div className="p-4 bg-gray-900 mt-10 shadow-lg">
                <h4 className="text-2xl font-bold mb-4 text-gray-100">Top 100 Cryptocurrency Prices</h4>
                <Input
                    type="text"
                    placeholder="Filter coins..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4 bg-gray-800 text-gray-100 border-gray-700 focus:ring-blue-500 focus:border-blue-500"
                />
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Symbol</TableHead>
                            <TableHead className="text-gray-300">Price</TableHead>
                            <TableHead className="text-gray-300">Price Change</TableHead>
                            <TableHead className="text-gray-300">High 24 Hrs</TableHead>
                            <TableHead className="text-gray-300">Low 24 Hrs</TableHead>
                            <TableHead className="text-gray-300">Market Cap</TableHead>
                            <TableHead className="text-gray-300">Total Volume</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCoinsData?.map(coin => (
                            <TableRow key={coin.name} className="border-b border-gray-800">
                                <TableCell className="font-medium text-gray-100">
                                    <Link href={'/prices/' + coin.id}><u>{coin.name}</u></Link>
                                </TableCell>                                
                                <TableCell className="text-gray-300">
                                    <div className="flex items-center space-x-2">
                                        <Image alt={`${coin.symbol} logo`} height={20} width={20} src={coin.image} />
                                        <span>{String(coin.symbol).toUpperCase()}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-300">{Number(coin.current_price) < 0.01 ? '<$0.01' : "$" + Number(coin.current_price).toFixed(2)}</TableCell>
                                <TableCell className={Number(coin.price_change_percentage_24h) >= 0 ? 'text-green-500' : 'text-red-500'}>
                                    {Number(coin.price_change_percentage_24h)> 0 ? '+' + Number(coin.price_change_percentage_24h).toFixed(2) : Number(coin.price_change_percentage_24h).toFixed(2)}%
                                </TableCell>
                                <TableCell className="text-gray-300">{Number(coin.high_24h) < 0.01 ? '<$0.01' : "$" + Number(coin.high_24h).toFixed(2)}</TableCell>
                                <TableCell className="text-gray-300">{Number(coin.low_24h) < 0.01 ? '<$0.01' : "$" + Number(coin.low_24h).toFixed(2)}</TableCell>
                                <TableCell className="text-gray-300">{"$" + Number(coin.market_cap).toFixed(2)}</TableCell>
                                <TableCell className="text-gray-300">{"$" + Number(coin.total_volume).toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        )
    }
}