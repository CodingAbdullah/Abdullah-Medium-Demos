require("dotenv").config({ path: '.env' });
const cors = require("cors");
const express = require("express");
const UserTokenRoute = require("../backend/Route/UserTokenRoute");

// Spin up server on PORT 5000
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT 5000");
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable CORS
app.use(cors());
app.use("/", UserTokenRoute);