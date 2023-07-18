require("dotenv").config({ path: '.env' });
const cors = require("cors");
const express = require("express");
const PostUserRoute = require("./Route/PostUserRoute");
const PostRoute = require("./Route/PostRoute");

// Spin up server on PORT 5000
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT 5000");
});

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());
app.use("/", PostUserRoute);
app.use("/", PostRoute);