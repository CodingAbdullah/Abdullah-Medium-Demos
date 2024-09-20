require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require('cors');
const documentDBRoute = require("./Route/documentDBRoute");
const mongoose = require('mongoose');

// Establish connection to DocumentDB using Mongoose library and MongoDB
mongoose.connect('mongodb://' + process.env.AWS_EC2_USERNAME + ':' + process.env.AWS_EC2_PASSWORD + '@' + 
                process.env.AWS_INSTANCE_PUBLIC_IP + ':27017' + '/' + process.env.DATABASE_NAME)
.then(() => {
    console.log("Connected to database!");
})
.catch(err => {
    console.log("Could not establish connection to DocDB! " + err);
});


// Spin up Node server
const app = express();

app.listen(process.env.PORT, () => {
    console.log("Listening to PORT " + process.env.PORT);
});

// Adding in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", documentDBRoute);