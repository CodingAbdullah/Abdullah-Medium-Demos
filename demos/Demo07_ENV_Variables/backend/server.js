require("dotenv").config({ path: '.env' });
const express = require("express");
const apiRoute = require('./Route/apiRoute');
const cors = require("cors");

const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Setting up server, adding routes and cors middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/", apiRoute);