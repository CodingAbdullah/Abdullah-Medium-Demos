import { useEffect, useState } from 'react';
import axios from 'axios';

const BitcoinDataPage = () => {
    const [bitcoinData, updateBitcoinData] = useState(null);

    useEffect(() => {
        // Make a call as component mounts
        axios.get('http://localhost:5000/bitcoin-data')
        .then(response => {
            updateBitcoinData(response.data);
        })
        .catch(() => {
            updateBitcoinData(null);
        });
    }, []);

    // Presenting Bitcoin Data
    if (bitcoinData === null) {
        return <div>Loading...</div>
    }
    else {
        return (
            <div className="bitcoin-data-page">
                <h1 style={{ marginTop: '2rem', paddingBottom: '1rem' }}>Bitcoin Data</h1>
                <p>Price: <b>${ bitcoinData.prices[1][1].toFixed(4) } USD</b></p>
                <p>Market Cap: <b>${ bitcoinData.market_caps[1][1].toFixed(4) } USD</b></p>
            </div>
        )
    }
}

export default BitcoinDataPage;