import axios from 'axios';

// Coin prices query
export const pricesQuery = async () => {
    const COIN_IDS = ['bitcoin', 'ethereum', 'solana'];
    const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/';

    let options = {
        method: "GET",
        headers: {
            'content-type' : 'application/json'
        }
    }

    // Fetching coin data from the custom back-end API
    let response = await axios.get(COINGECKO_URL + COIN_IDS[0], options);

    if (response.status === 200) {
        return response.data;
    }
    else {
        throw new Error("Could not fetch coin data");
    }
}