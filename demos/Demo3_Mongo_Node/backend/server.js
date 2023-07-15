require("dotenv").config({ path: '.env' });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const URL="mongodb+srv://owner:" + process.env.DB_PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

app.use(cors()); // Enable CROSS ORIGIN RESOURCE SHARING
mongoose.connect(URL).then(() => console.log("Listening to PORT 5000")).catch(err => console.log(err));