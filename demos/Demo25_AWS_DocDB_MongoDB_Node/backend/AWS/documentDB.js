require("dotenv").config({ path: '.env' });
const AWS = require('aws-sdk');

// Setting up configuration for the AWS service to be used
let configuration = {
    accessKeyId: process.env.AWS_DOCDB_ACCESS_ID,
    secretAccessKey: process.env.AWS_DOCDB_SECRET_KEY,
    region: process.env.AWS_REGION
}

// Passing in configuration options to AWS DocumentDB, establishing connection and exporting database object
let docDB = new AWS.DocDB(configuration); 
module.exports = docDB;