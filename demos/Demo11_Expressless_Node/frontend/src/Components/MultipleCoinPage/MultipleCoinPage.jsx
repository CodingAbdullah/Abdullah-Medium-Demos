import { useEffect, useState } from 'react';
import axios from 'axios';

const MultipleCoinPage = () => {
    const [coinData, updateCoinData] = useState(null);

    useEffect(() => {
        // Make a call as component mounts
        axios.get('http://localhost:5000/dual-coin-data')
        .then(response => {
            updateCoinData(response.data);
        })
        .catch(() => {
            updateCoinData(null);
        });
    }, []);

    // Presenting Coins Data
    if (coinData === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="multiple-coin-page">
                <h1 style={{ marginTop: '2rem', paddingBottom: '1rem' }}>Coin Data</h1>
                <p>Bitcoin Data:</p>
                <p>Price: <b>${ coinData.bitcoinResponse.prices[1][1].toFixed(4) } USD</b></p>
                <p>Market Cap: <b>${ coinData.bitcoinResponse.market_caps[1][1].toFixed(4) } USD</b></p>
                <hr />
                <p style={{ marginTop: '2rem' }}>Ethereum Data: </p>
                <p>Price: <b>${ coinData.ethereumResponse.prices[1][1].toFixed(4) } USD</b></p>
                <p>Market Cap: <b>${ coinData.ethereumResponse.market_caps[1][1].toFixed(4) } USD</b></p>
            </div>
        )
    }
}

export default MultipleCoinPage;