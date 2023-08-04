require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require("cors");
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Setting templating engine to EJS
app.set('view engine', 'ejs');

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // CORS middleware

// More to be added later here..