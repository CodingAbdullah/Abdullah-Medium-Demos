require('dotenv').config({ path: '.env' });
const express = require("express");
const cors = require('cors');

const app = express(); // Spin up Node server

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Adding in middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));