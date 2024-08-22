import axios from 'axios';
import dayjs from 'dayjs';

// Coin prices information
export const bitcoinPriceInfo = async () => {
    const BITCOIN_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily';

    // Setting options for request
    let options = {
        method: "GET",
        headers: {
            'content-type' : 'application/json'
        }
    }

    // Fetching Bitcoin price data using the CoinGecko API
    // Incorporate the day.js library for date formatting
    // Return the formated stream of data for display
    try {
        let bitcoinResponse = await axios.get(BITCOIN_PRICE_ENDPOINT, options);
        
        return bitcoinResponse.data.prices.map(price => ({ 
            time: dayjs(price[0]).format('YYYY-MM-DD HH:mm:ss'), 
            price: Number(Number(price[1])) 
        }));
    }
    catch (err) {
        throw new Error("Could not fetch coin data. ERR: " + err);
    }
}