import { FC, FormEvent, useState } from 'react';
import Alert from '../Alert/Alert';
import CoinPriceCard from '../CoinPriceCard/CoinPriceCard';
import { BTCInformationType } from '../../types/BTCInformationType';
import axios from 'axios';

// Custom Price Page Component
const PricePage: FC = () => {
    const [coinSelection, updateCoinSelection] = useState<String>('ethereum');
    const [setCoinSelection, updateSetCoinSelection] = useState<String>('ethereum');
    const [isSuccess, updateSuccess] = useState<Boolean>(false);
    const [btcInformation, updateBtcInformation] = useState<BTCInformationType>();
    const [altCoinInformation, updateAltCoinInformation] = useState<any>();

    const formHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSetCoinSelection(coinSelection);

        // Fetch Bitcoin Data
        axios.get("http://localhost:5000/bitcoin-data")
        .then(response => {
            updateBtcInformation(response.data.information);
            updateSuccess(true);
        })  
        .catch(() => {
            updateBtcInformation(undefined);
            updateSuccess(false);
         });

         // Setting options for Altcoin Data
         let options = {
            method: "POST",
            body: JSON.stringify({ coin: coinSelection }),
            headers: {
                'content-type' : 'application/json'
            }
         };

        // Fetch AltCoin Data
        axios.post("http://localhost:5000/altcoin-data", options)
        .then(response => {
            updateAltCoinInformation(response.data.information);
            updateSuccess(true);
        })  
        .catch(() => {
            updateAltCoinInformation(undefined);
            updateSuccess(false);
        });
    }

    // Display content of form and coin data, if applicable
    return (
        <div className="price-page">
            <h1 style={{ marginTop: '1rem', marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                Prices Page
            </h1>
            <p style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }}>
                <i>Select crypto price data to be displayed</i>
            </p>
            { isSuccess ? <Alert /> : null }
            <form style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%', marginTop: '1rem' }}
                onSubmit={ formHandler }>
                <select name="coin-selection" onChange={ e => updateCoinSelection(e.target.value) }>
                    <option value="ethereum">Ethereum</option>
                    <option value="solana">Solana</option>
                </select>
                <br />
                <button style={{ marginTop: '1rem' }} 
                    className="btn btn-success" type="submit">Request Information
                </button>
            </form>
            {
                !isSuccess || !btcInformation || !altCoinInformation 
                    ? null 
                    :
                        <>
                            <h3 style={{ marginTop: '1rem' }}>Coin Information</h3>
                            <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '50%' }} 
                                className="container">
                                <div className="row">
                                    <div className="col">
                                        <CoinPriceCard 
                                            cardData={{ 
                                                coinType: 'Bitcoin', 
                                                coinData: btcInformation }} 
                                        />
                                    </div>
                                    <div className="col">
                                        <CoinPriceCard 
                                            cardData={{ 
                                                coinType: setCoinSelection, 
                                                coinData: altCoinInformation }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
            }
        </div>
    )
}

export default PricePage;