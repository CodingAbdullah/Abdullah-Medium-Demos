require("dotenv").config({ path : '.env' });
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserRoute = require("./Routes/UserRoute");
const URL = "mongodb+srv://owner:" + process.env.DB_PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";

const app = express(); // Spin up the server...

app.listen(5000, () => {
    console.log("Listening to PORT 5000");
});

// Mongoose package to connect Node server to MongoDB Atlas
mongoose.connect(URL)
.then(() => {
    console.log("Connected to DB");
})
.catch(() => {
    console.log("Error connecting to DB");
});

// Enabling CROSS-Origin Resource Sharing
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use("/", UserRoute);