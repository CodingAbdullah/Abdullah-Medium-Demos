require("dotenv").config({ path: '../.env' });
const axios = require("axios");

// Fetch and send data as response
// https://deep-index.moralis.io/api/v2/erc20/:address/price

exports.getData = (req, res) => {
    // Set the options and use the environment variable containing the API KEY in header
    let options = {
        method: 'GET',
        headers : {
            'content-type' : 'application/json',
            'X-API-Key' : process.env.MORALIS_API_KEY
        }
    }
    
    axios.get('https://deep-index.moralis.io/api/v2/erc20'+
    '/0x8355dbe8b0e275abad27eb843f3eaf3fc855e525/price', options)
    .then(response => {
        res.status(200).json({
            information: response.data
        });
    })
    .catch(() => {
        res.status(400).json({
            message: "ERR"
        });
    }); 
}