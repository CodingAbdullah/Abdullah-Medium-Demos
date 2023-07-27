require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");

const app = express(); // Spin up an express server

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT " + process.env.PORT);
});

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());