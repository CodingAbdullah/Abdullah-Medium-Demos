const express = require('express');
const cors = require("cors");
const PhotoRoute = require('./Route/PhotoRoute');

const app = express(); // Spin up an express server

app.listen(5000, () => {
    console.log("Listening to PORT 5000");
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", PhotoRoute);