import axios from 'axios';
import dayjs from 'dayjs';

// Bitcoin price action, last 7 days
export const BitcoinHistoricPriceAction = async () => {

    // Request Bitcoin prices
    let BITCOIN_PRICE_ENDPOINT = 'https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7';

    // Setting options for authenticated API call
    let options = {
        method: "GET",
        mode: 'cors', // *cors, same-origin
        headers : {
            'content-type' : 'application/json',
            'access-control-allow-origin': '*',
        }
    }

    // Safely fetching data using Axios, escaping with try-catch block
    let response = await axios.get(BITCOIN_PRICE_ENDPOINT, options); // Fetch ERC20 token prices by interval

    if (response.status !== 200) {
        throw new Error("Could not fetch coin data");
    }
    else {
        // Conditionally send the response and format it conforming to the interval
        // Incorporate the dayjs library for easy date formatting
        let prices = response.data.prices;
        return {
            coinPrices: prices.map(price => ({ 
                time: dayjs(price[0]).format('YYYY-MM-DD'), 
                price: Number(Number(price[1])) 
            }))
        };
    }
}
