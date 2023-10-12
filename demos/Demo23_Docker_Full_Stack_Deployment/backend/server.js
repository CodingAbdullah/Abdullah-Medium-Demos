const express = require("express");
const cors = require("cors");
const FetchJSONApiRoute = require("./Route/FetchJSONApiRoute");

const app = express();

app.listen(5000, () => console.log("Listening to PORT 5000"));

app.use(cors());
app.use("/", FetchJSONApiRoute);