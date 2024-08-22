import axios from 'axios';

// Coin prices information
export const coinInfo = async () => {
    const COIN_IDS = ['bitcoin', 'ethereum', 'solana'];
    const COINGECKO_URL = 'https://api.coingecko.com/api/v3/coins/';

    // Setting options for request
    let options = {
        method: "GET",
        headers: {
            'content-type' : 'application/json'
        }
    }

    // Fetching coin data using the CoinGecko API
    try {
        let bitcoinResponse = await axios.get(COINGECKO_URL + COIN_IDS[0], options);
        let ethereumResponse = await axios.get(COINGECKO_URL + COIN_IDS[1], options);
        let solanaResponse = await axios.get(COINGECKO_URL + COIN_IDS[2], options);

        return [ bitcoinResponse.data, ethereumResponse.data, solanaResponse.data ];
    }
    catch (err) {
        throw new Error("Could not fetch coin data. ERR: " + err);
    }
}