require("dotenv").config({ path: '.env' });
const cors = require("cors");
const express = require("express");
const PostUserRoute = require("./Route/PostUserRoute");
const PostRoute = require("./Route/PostRoute");
const EmailTokenRoute = require('./Route/EmailTokenRoute');
const mongoose = require("mongoose");

const URL = "mongodb+srv://owner:" + process.env.DB_PASSWORD + "@ai-user-database.zjlsn9q.mongodb.net/?retryWrites=true&w=majority";

// Spin up server on PORT 5000
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening on PORT 5000");
});

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

// Connecting to MongoDB
mongoose.connect(URL)
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Error Connecting: " + err));

// Enable CORS
app.use(cors());
app.use("/", PostUserRoute);
app.use("/", PostRoute);
app.use("/", EmailTokenRoute);