const express = require("express");
const cors = require("cors");
const bucketRoute = require("./Route/bucketRoute");

// Spin up Node server
const app = express();

// Listen on PORT 5000
app.listen(5000, () => console.log("Listening on PORT 5000"));

// Add middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add routes
app.use("/", bucketRoute);
