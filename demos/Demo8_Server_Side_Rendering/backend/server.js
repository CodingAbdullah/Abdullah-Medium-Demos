require("dotenv").config({ path: '.env' });
const express = require("express");
const axios = require("axios");

// Spin up a Node server
const app = express(); 

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Setting Templating Engine to EJS
app.set('view engine', 'ejs');

// Setting location to folder containing files
app.use(express.static(__dirname + 'public'));

// EJS Title
app.get("/", (req, res) => {
    res.render('ejsTitle', { year: new Date().getFullYear() });
});

// Home Page
app.get("/information", (req, res) => {
    res.render('home', { year : new Date().getFullYear() });
});

// Data Fetched Information
app.get("/api-information", (req, res) => {
    // Setting options for API call
    let options = {
        method: 'GET',
        headers: {
            'accept' : 'application/json',
            'content-type' : 'applcation/json'
        }
    }

    axios.get('https://api.coingecko.com/api/v3/' + 
    'coins/list?include_platform=false', options)
    .then(response => {
        // If successful, pass in the data from API call to render function
        res.render('data', 
            { 
                coinData: response.data, 
                isError: false, 
                year: new Date().getFullYear() 
            }
        );
    })
    .catch(() => {
        // If not successful, pass in the empty data and set error to true
        res.render('data', 
            { 
                coinData: [], 
                isError: true, 
                year: new Date().getFullYear() 
            }
        );
    });
});