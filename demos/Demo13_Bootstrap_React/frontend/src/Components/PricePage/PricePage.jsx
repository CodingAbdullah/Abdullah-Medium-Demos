import { useRef, useState } from 'react';
import Alert from '../Alert/Alert';
import CoinPriceCard from '../CoinPriceCard/CoinPriceCard';
import axios from 'axios';

// Fetch data related to Bitcoin and requested alts using Coingecko
const PricePage = () => {
    const coinRef = useRef();
    const [btcInformation, updateBTCInformation] = useState(null);
    const [altCoinInformation, updateAltCoinInformation] = useState(null);
    const [isError, updateError] = useState(false);

    const formHandler = (e) => {
        e.preventDefault();

        if (coinRef.current.value === undefined || coinRef.current.value === null){
            updateError(true);
        }
        else {
            updateError(false);

            // Fetch Bitcoin Data
            axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin" + 
            "&vs_currencies=usd&include_24hr_change=true")
            .then(response => {
                updateBTCInformation(response.data);
            })  
            .catch(() => {
                updateBTCInformation(null);
            });

            // Fetch Alt Coin Data
            axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coinRef.current.value}` + 
            "&vs_currencies=usd&include_24hr_change=true")
            .then(response => {
                updateAltCoinInformation(response.data);
            })  
            .catch(() => {
                updateAltCoinInformation(null);
            });
        }
    }

    // Conditionally render alerts or coin related data depending on request response
    return (
        <div className="price-page">
            <h1>Coin Information Selector</h1>
            <p><i>Select coin related information (Bitcoin will be included by default)</i></p>
            { isError ? <Alert /> : null }
            <form onSubmit={ formHandler }>
                <div className="form-check">
                    <input className="form-check-input" type="radio" 
                        name="coinSelection" value="ethereum" ref={ coinRef } />
                    <label className="form-check-label">
                        Ethereum
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" 
                        name="coinSelection" value="solana" ref={ coinRef } />
                    <label className="form-check-label">
                        Solana
                    </label>
                </div>
                <button className="btn btn-success">Coin Selection</button>
            </form>
            {
                btcInformation === null || altCoinInformation === null ? null :
                    <>
                        <h1>Coin Information</h1>
                        <div class="container">
                            <div class="row">
                                <div class="col">
                                    <CoinPriceCard 
                                        coinType="Bitcoin" 
                                        coinData={ btcInformation } />
                                </div>
                                <div class="col">
                                    <CoinPriceCard
                                        coinType={ coinRef.current.value } 
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