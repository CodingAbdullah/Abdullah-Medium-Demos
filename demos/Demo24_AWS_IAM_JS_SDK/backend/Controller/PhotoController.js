require("dotenv").config({ path: '.env' });
const AWS = require("aws-sdk");
const uuid = require('uuid');
const fs = require('fs'); // Built-in modules for working with file data
const { picturePath } = require('../util/picturePath');

// Set up configuration using an AWS IAM identity to programmatically access AWS S3 using SDK
// Set up your user to have appropriate permissions

let configuration = {
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION    
}

// Setting the S3 object to work with user identification and region
let S3 = new AWS.S3(configuration);

exports.uploadPhotoController = (req, res) => {

    // Create a read stream for the file and use it as data prior to uploading to S3 Bucket
    fs.readFile(picturePath, (err, fileData) => {
        if (err) {
            res.status(400).json({
                message: "Could not read file data. " + err
            });
        }
        else {
            // Using the upload function to send sunflower picture to AWS S3 bucket
            S3.upload({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: String(uuid.v4().split('-')[0]) + '.png', // Defining a unique key to identify the object
                Body: fileData
            }, (err, bucketData) => {
                if (err){
                    res.status(400).json({
                        message: "Could not upload sunflower picture. " + err
                    });
                }
                else {
                    res.status(201).json({
                        message: "File uploaded successfully!"
                    });
                }
            });
        }
    });
}

exports.deletePhotoController = (req, res) => {
    const { pictureId } = JSON.parse(req.body.body);

    // Delete requested object stored in S3 bucket using key
    S3.deleteObject({ 
        Bucket: process.env.AWS_S3_BUCKET_NAME, 
        Key: pictureId + '.png'
    }, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not delete object"
            });
        }
        else {
            res.status(200).json({
                message: "Object deleted successfully!"
            });
        }
    });
}