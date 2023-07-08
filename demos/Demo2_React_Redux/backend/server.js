const express = require("express");
const cors = require("cors");

const app = express(); // Spin up the server...

app.listen(5000, () => {
    console.log("Listening to PORT 5000");
});

app.use(cors()); // Enabling CROSS-Origin Resource Sharing

// Things to be added later...