const express = require("express");
const cors = require("cors");

const app = express(); // Spin up the server

// Adding middleware and enabling CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());