const DYNAMODB = require("../AWS/dynamoDBInstance");
const USERTABLE = require("../Model/User");

// Create table object in DynamoDB 
DYNAMODB.createTable(USERTABLE, (err, data) => {
    if (err) {
        console.log("Could not create table! " + err);
    }
    else {
        console.log("DynamoDB table created successfully! " + data);
    }
});