require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require('cors');
const CRUDRoute = require("./Route/CRUDRoute");

// Spin up Node Server
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Adding in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", CRUDRoute);