import { NextResponse } from "next/server";

const PRO_COINGECKO_URL = "https://pro-api.coingecko.com/api/v3"; // Pro CoinGecko API Endpoint

// Custom Route Handler function
export async function GET(){

    // Endpoint for fetching coin price data
    const COIN_PRICES_ENDPOINT = "/coins/markets?vs_currency=usd&order=market_cap_desc";

    // Setting headers to pass in COINGECKO API KEY (x-cg-pro-api-key)
    const options = {
        method: "GET",
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
            'x-cg-pro-api-key' : process.env.COINGECKO_API_KEY
        } as HeadersInit
    }
    
    // Make an API call to fetch all the coins supported by CoinGecko
    const response = await fetch(PRO_COINGECKO_URL + COIN_PRICES_ENDPOINT, options);

    // Fetch data using the Ethereum data endpoints
    if (!response.ok) 
        return NextResponse.json({ error: 'Failed to fetch Ethereum price' }, { status: 500 });
    else {
        const data = await response.json();
        return NextResponse.json(data);
    }
}