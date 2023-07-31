require("dotenv").config({ path: '.env' });
const express = require("express");
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});


