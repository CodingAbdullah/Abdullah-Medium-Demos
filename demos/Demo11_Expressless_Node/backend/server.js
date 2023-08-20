// Working with core built-in modules such as HTTP, FS, PATH, and so on.
require("dotenv").config({ path: '.env' });
const axios = require("axios");
const http = require('http'); // Core modules
const fs = require("fs");
const path = require('path');

http.createServer((req, res) => { 
    // Additional routes will go here
    // Req object determines type of request and endpoint
    // Unlike Express, all routing is handled inside the main server

    if (req.method === 'POST') {
        if (req.url === '/one-post') {
            
            // Make request to fetch post data
            axios.post("https://jsonplaceholder.typicode.com/posts/1/comments", { method: 'POST' })
            .then(response => {
                let data = new Date().toISOString() + ' - ' + 'STATUS CODE: 200. ' 
                           + 'METHOD: POST. ' + 'REQUEST TYPE: ONE POST. ';

                try { 
                    // Log successful API call
                    fs.appendFileSync(path.join(__dirname, 'API.log'), data); 

                    // Upon successful logging, send data back to client
                    res.writeHead(200, { 'content-type': 'application.json' });
                    res.end(JSON.stringify(response.data)); // Response sent
                }
                catch (err) {
                    // Send back error message
                    res.writeHead(500, { 'content-type': 'text/plain' });
                    res.end("Could not append data to file");
                }
            })
            .catch(() => {
                // Send back error response
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end('Could not fetch post data');
            });
        }
        else if (req.url === '/posts') {
            // Make request to fetch post data
            axios.post("https://jsonplaceholder.typicode.com/posts", { method: 'POST' })
            .then(response => {
                let data = new Date().toISOString() + ' - ' + 'STATUS CODE: 200. ' 
                           + 'METHOD: POST. ' + 'REQUEST TYPE: MULTIPLE POSTS. ';

                try { 
                    // Log successful API call
                    fs.appendFileSync(path.join(__dirname, 'API.log'), data); 

                    // Upon successful logging, send data back to client
                    res.writeHead(200, { 'content-type': 'application.json' });
                    res.end(JSON.stringify(response.data)); // Response sent
                }
                catch (err) {
                    // Send back error message
                    res.writeHead(500, { 'content-type': 'text/plain' });
                    res.end("Could not append data to file");
                }
            })
            .catch(() => {
                // Send back error response
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end('Could not fetch post data');
            });
        }
        else {
            // Send back error response
            res.writeHead(400, { 'content-type' : 'text/plain' });
            res.end("Invalid request");
        }
    }
    else if (req.method === 'GET') {
        if (req.url === '/bitcoin-data') {

            // Fetch Bitcoin Data
            axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?'
                    + 'vs_currency=usd&days=1&interval=daily')
            .then(response => {
                let data = new Date().toISOString() + ' - ' + 'STATUS CODE: 200. ' + 
                           + 'METHOD: POST. ' + 'REQUEST TYPE: BITCOIN DATA. ';

                try {
                    // Log successful API call
                    fs.appendFileSync(path.join(__dirname, 'API.log'), data);

                    // If appending data is successful, send back data
                    res.writeHead(200, { 'content-type': 'application/json' });

                    // Send back response
                    res.end(JSON.stringify(response.data));
                }
                catch (err) {
                    // Send back error response
                    res.writeHead(500, { 'content-type' : 'text/plain' });
                    res.end("Could not append data to file");
                }
            })
            .catch(() => {
                // Send back error response
                res.writeHead(500, { 'content-type': 'text/plain' });
                res.end('Could not fetch Bitcoin data');
            });
        }
        else if (req.url === '/dual-coin-data') {

            // Fetch Bitcoin Data
            axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?'
                    + 'vs_currency=usd&days=1&interval=daily')
            .then(response => {

                // Fetch Ethereum Data
                axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?'
                        + 'vs_currency=usd&days=1&interval=daily')
                .then(ethResponse => {
                    let data = new Date().toISOString() + ' - ' + 'STATUS CODE: 200. ' + 
                               + 'METHOD: POST. ' + 'REQUEST TYPE: MULTI-COIN DATA. ';
                
                    try {
                        // Log successful API call
                        fs.appendFileSync(path.join(__dirname, 'API.log'), data);
        
                        // If appending data is successful, send back data
                        res.writeHead(200, { 'content-type': 'application/json' });
                        
                        let coinInformation = {
                            bitcoinResponse : response.data,
                            ethereumResponse : ethResponse.data
                        }

                        // Send back response
                        res.end(JSON.stringify(coinInformation));
                    }
                    catch (err) {
                        // Send error response back
                        res.writeHead(500, { 'content-type' : 'text/plain' });
                        res.end("Could not append data to file");
                    }
                })
                .catch(() => {
                    // Send back error response
                    res.writeHead(500, { 'content-type' : 'text/plain'});
                    res.end("Could not fetch coin data");
                });
            })
            .catch(() => {
                // Send back error response
                res.writeHead(500, { 'content-type' : 'text/plain' });
                res.end("Could not append data to file");
            });
        }
        else {
            // Send back error response
            res.writeHead(400, { 'content-type': 'text/plain' });
            res.end('Invalid request');
        }
    }
    else {
        // Writing a response for an invalid request type (GET/POST are acceptable)
        res.writeHead(400, { 'content-type' : 'text/plain' });
        res.end("Invalid request");
    }
})
.listen(process.env.PORT || 8080, () => {
    // Log PORT value
    console.log("Listening to PORT " + process.env.PORT || 8080);
});
