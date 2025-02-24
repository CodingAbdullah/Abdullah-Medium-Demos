import MarketInsightsSection from "../components/MarketInsightsSection";
import type { Metadata } from "next"

// Custom Metadata for SEO
export const metadata: Metadata = {
    title: "Market Insights",
    description: "Get a quick glance at the latest market conditions"
}

// Render the Market Insights Page containing the Market Insights Section Custom Component
export default function MarketInsightsPage() {
  return (
    <div className="min-h-screen bg-gray-800 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 shadow-lg">
      <h1 className="text-5xl font-bold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-400 to-gray-100">
              Market Insights
          </span>
      </h1>
      <p className="text-xl text-gray-400 mb-12 text-center">
        <i>Catch a quick read on market conditions</i>
      </p>
      <MarketInsightsSection />
    </div>
  )
}