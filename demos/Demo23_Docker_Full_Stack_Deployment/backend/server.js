const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();


app.listen(5000, () => console.log("Listening to PORT 5000"));

app.use(cors());
