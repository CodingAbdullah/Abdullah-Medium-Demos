require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const crudRoute = require("./Router/crudRoute");

const app = express(); // Spin up Node server

// Listening to PORT 5000
app.listen(5000, () => {
    console.log("Listening to PORT 5000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", crudRoute);