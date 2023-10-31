require("dotenv").config({ path: '.env' });
const User = require("../Model/User");
const AWS = require('aws-sdk');

// Setting up configuration to programmatically access the AWS DynamoDB service
let configuration = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
}

// Pass in configurations of IAM user to access the service programmatically in the correct region
const dynamoDBInstance = new AWS.DynamoDB(configuration);

// Create table using User model and insert into DynamoDB, export instance
module.exports = dynamoDBInstance.createTable(User);