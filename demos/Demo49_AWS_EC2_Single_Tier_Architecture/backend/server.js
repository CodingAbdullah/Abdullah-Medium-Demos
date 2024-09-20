require("dotenv").config({ path: '.env' });
const express = require("express");
const cors = require('cors');
const documentDBRoute = require("./Route/documentDBRoute");
const mongoose = require('mongoose');

// Establish connection to DocumentDB using Mongoose library and MongoDB
mongoose.connect('mongodb://' + process.env.AWS_DOCDB_USERNAME + ':' + process.env.AWS_DOCDB_PASSWORD + 
                '@mediumdemodb.cluster-clzvikposz04.us-east-2.docdb.amazonaws.com:27017/?tls=true&tlsCAFile=global-bundle.pem' + 
                '&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false')
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