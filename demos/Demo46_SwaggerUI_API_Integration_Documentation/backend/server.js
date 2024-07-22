const express = require('express');
const DeletePostRoute = require("./Routes/DeletePostRoute");
const GetPostRoute = require("./Routes/GetPostRoute");
const InsertPostRoute = require("./Routes/InsertPostRoute");
const UpdatePostRoute = require("./Routes/UpdatePostRoute");

const app = express(); // Spinning up the node server

// Listening on Port 5000 by default
app.listen(5000, () => console.log("Listening on PORT 5000"));

// Adding middleware to parse JSON and URL encoded data
// Adding routes to server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", DeletePostRoute);
app.use("/", GetPostRoute);
app.use("/", InsertPostRoute);
app.use("/", UpdatePostRoute);