require("dotenv").config({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRoute = require("../backend/Routes/UserRoute");
const URL = process.env.DB_URL + process.env.DB_PASSWORD + process.env.DB_ENDPOINT;

const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Establishing a connection to MongoDB, using the secure connection string
mongoose.connect(URL).then(() => console.log("Connected to MongoDB")).catch(err => console.log(err));

app.use(cors()); // Enable CROSS ORIGIN RESOURCE SHARING
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/", UserRoute);