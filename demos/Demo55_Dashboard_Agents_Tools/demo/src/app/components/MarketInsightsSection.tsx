"use client";

import { useState, useEffect } from "react";
import { Bot } from "lucide-react";
import AIMarketDataType from "../utils/types/AIMarketDataType";

// Market Insights Section Custom Component
export default function MarketInsightsSection() {
  const [data, setData] = useState<AIMarketDataType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Upon page mount, make the back-end call to fetch market data
  // Fetch data
  useEffect(() => {
    async function fetchMarketInsights() {
        try {
            const response = await fetch("/api/market-insights-data");

            // Return error, if request call is not successful
            if (!response.ok) {
                throw new Error("Failed to fetch market insights data");
            }
            
            // Load results from response call
            const result = await response.json();
            setData(result);
        } 
        catch {
            throw new Error("Failed to fetch market insights data");
        } 
        finally {
            setIsLoading(false);
        }
    }

    fetchMarketInsights();
  }, []);

    // Conditionally render component
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-300"></div>
            </div>
        )
    }

    // Finally, load the Market Insights Section component containing the relevant data
    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-100">
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex items-start space-x-2">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <Bot size={24} className="text-gray-300" />
                    </div>
                    <div className="flex-grow bg-gray-800 rounded-lg p-4 shadow-lg overflow-y-auto max-h-[calc(100vh-2rem)]">
                        {data &&
                            Object.entries(data).map(([key, value]) => (
                            <div key={key} className="mb-4">
                                <h3 className="text-lg text-gray-100 mb-2"><b>{key.replace(/([A-Z])/g, " $1").trim().toUpperCase()}</b></h3>
                                <p className="text-gray-400 mb-10">{value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}