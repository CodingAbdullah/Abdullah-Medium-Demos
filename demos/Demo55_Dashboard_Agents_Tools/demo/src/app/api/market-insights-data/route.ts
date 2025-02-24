// Firecrawl API fetches data from this Cryptocurrency website (coingecko.com)
// LLM Data processed from website, ensure it conforms to standards (key components of the data), marked using Zod
// Schema/Structured data passed as a tool to the AI SDK using the Open AI model
import FirecrawlApp from "@mendable/firecrawl-js";
import { groq } from '@ai-sdk/groq';
import { NextResponse } from "next/server";
import { generateObject } from 'ai';
import marketSchema from "@/app/utils/constants/MarketSchema";
import AITextGeneratedSchema from "@/app/utils/constants/AITextGeneratedSchema";

export async function GET() {
    // Check if the API key is set
    const apiKey = process.env.FIRECRAWL_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: 'API key is not set' }, { status: 500 });
    }
    
    // Setting up the Firecrawl app
    const app = new FirecrawlApp({ apiKey });

    // Retrieve the web scraping result from the Coin Gecko webpage
    // Utilize the Market Schema created using Zod for guidance
    const scrapeResult = await app.scrapeUrl("https://coingecko.com/", {
        formats: ["json"],
        jsonOptions: { schema: marketSchema },
        timeout: 50000
    });

    // Conditionally return data from the Firecrawl API call
    if (!scrapeResult.success) {
        return NextResponse.json({ error: 'Failed to fetch market insights' }, { status: 500 });
    }
    else {
        // Generate an object containing valuable market information
        // Utilize the Firecrawl API data to generate content and the AI Text Generated Schema
        const { object } = await generateObject({
            model: groq('llama-3.3-70b-versatile'),
            schema: AITextGeneratedSchema,
            prompt: `Analyze the following cryptocurrency market data and provide insights:
              ${JSON.stringify(scrapeResult.json, null, 2)}
              
              Provide a detailed analysis including a summary, Bitcoin analysis, Ethereum analysis, 
              overall market overview, analysis of trending coins, analysis of top gainers, and a conclusion.`
        });

        return NextResponse.json(object, { status: 200 });
    }
}