const express = require("express");
const cors = require("cors");
const APIRoute = require("./Route/APIRoute");

const app = express(); // Spin up the server

app.listen(5000, () => {
    console.log("Listening on PORT 5000");
});

// Adding middleware and enabling CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", APIRoute);