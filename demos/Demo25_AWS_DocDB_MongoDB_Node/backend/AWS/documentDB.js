require("dotenv").config({ path: '.env' });
const AWS = require('aws-sdk');

let configuration = {
    accessKeyId: process.env.AWS_DOCDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DOCDB_SECRET_KEY
    // Add region for AWS DocDB later
}

let documentDB = 
module.exports = new ({ configuration }); // Establish connection to AWS DocDB and export DocumentDB object


