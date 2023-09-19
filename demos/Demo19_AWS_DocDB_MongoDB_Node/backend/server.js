require("dotenv").config({ path: '.env' });
const express = require("express");

const app = express(); // Spin up Node server

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));