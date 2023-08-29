import { useState } from 'react';
import Alert from '../Alert/Alert';
import CoinPriceCard from '../CoinPriceCard/CoinPriceCard';
import axios from 'axios';

// Fetch data related to Bitcoin and requested alts using Coingecko
const PricePage = () => {
    const [coinSelection, updateCoinSelection] = useState("ethereum");
    const [setCoinSelection, updateSetCoinSelection] = useState("ethereum");
    const [btcInformation, updateBTCInformation] = useState(null);
    const [altCoinInformation, updateAltCoinInformation] = useState(null);
    const [isSuccess, updateSuccess] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();
        updateSetCoinSelection(coinSelection);

        // Fetch Bitcoin Data
        axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin" + 
            "&vs_currencies=usd&include_24hr_change=true")
        .then(response => {
            updateBTCInformation(response.data);
            updateSuccess(true);
        })  
        .catch(() => {
            updateBTCInformation(null);
            updateSuccess(false);
         });

        // Fetch Alt Coin Data
        axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinSelection}` + 
            "&vs_currencies=usd&include_24hr_change=true")
        .then(response => {
            updateAltCoinInformation(response.data);
            updateSuccess(true);
        })  
        .catch(() => {
            updateAltCoinInformation(null);
            updateSuccess(false);
        });
    }

    // Conditionally render alerts or coin related data depending on request response
    return (
        <div className="price-page">
            <h1 style={{ marginTop: '2rem' }}>Coin Information Selector</h1>
            <p><i>Select coin related information (Bitcoin will be included by default)</i></p>
            { isSuccess ? <Alert /> : null }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} onSubmit={ formHandler }>
                <select onChange={ e => updateCoinSelection(e.target.value) } 
                        className="form-select" aria-label="Default select example">
                    <option value="ethereum" selected>Ethereum</option>
                    <option value="solana">Solana</option>
                </select>
                <button style={{ marginTop: '1rem' }} 
                    className="btn btn-success" type="submit">Request Information
                </button>
            </form>
            {
                btcInformation === null || altCoinInformation === null || !isSuccess ? null :
                    <>
                        <h3 style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Coin Information</h3>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}
                            className="container">
                            <div className="row">
                                <div className="col">
                                    <CoinPriceCard 
                                        coinType="Bitcoin" 
                                        coinData={ btcInformation } />
                                </div>
                                <div className="col">
                                    <CoinPriceCard
                                        coinType={ setCoinSelection } 
                                        coinData= { altCoinInformation } />
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default PricePage;