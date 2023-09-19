require("dotenv").config({ path: '.env' });
const DocDB = require("aws-sdk/clients/docdb");

let configuration = {
    accessKeyId: process.env.AWS_DOCDB_ACCESS_KEY,
    secretAccessKey: process.env.AWS_DOCDB_SECRET_KEY
    // Add region for AWS DocDB later
}

module.exports = new DocDB({configuration}); // Establish connection to AWS DocDB and export DocumentDB object


