require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require('cors');
const documentDBRoute = require("./Route");

// Spin up Node server
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Adding in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", documentDBRoute);