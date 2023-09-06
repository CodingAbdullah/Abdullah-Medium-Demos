import { Request, Response } from 'express';
import axios from 'axios';

// Adding controller functions for each type of coin
const bitcoinDataFetch = (req: Request, res: Response) => {

    // Fetch Bitcoin Data
    axios.get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin" + 
              "&vs_currencies=usd&include_24hr_change=true")
    .then(response => {
        res.status(200).json({
            information: response.data
        });
    })  
    .catch(() => {
        res.status(400).json({
            message: "Could not fetch Bitcoin Data"
        });
    });
}

const altCoinDataFetch = (req: Request, res: Response ) => {
    const { coin } = JSON.parse(req.body.body);

    // Fetch Alt Coin Data
    axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}` + 
              "&vs_currencies=usd&include_24hr_change=true")
    .then(response => {
        res.status(200).json({
            information: response.data
        });
    })  
    .catch(() => {
        res.status(400).json({
            message: `Could not fetch ${coin} data`
        });
    });
}

// Exporting functions as an object
export default {
    bitcoinDataFetch,
    altCoinDataFetch
}