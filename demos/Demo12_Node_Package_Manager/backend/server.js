const express = require("express");
const cors = require("express");
const conversionRoute = require("../backend/Routes/conversionRoute.js");
const app = express();

app.listen(5000, () => {
    console.log("Listening on PORT 5000");
});

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // Enabling CORS

app.use("/", conversionRoute);