const express = require("express");
const cors = require("cors");
const postRoute = require("./Routes/PostRoute");

const app = express(); // Spin up the server..

app.use(cors()); // Enable CROSS-ORIGIN RESOURCE SHARING
app.use("/", postRoute);


// Listen on PORT 5000
app.listen(5000, () => {
    console.log("Listening to PORT 5000");
});