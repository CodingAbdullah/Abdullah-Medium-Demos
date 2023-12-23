const { S3Client, DeleteObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const picturePath = require("../util/picturePath");
const uuid = require("uuid");
const fs = require("fs");

// Since we are working with the LocalStack test environment, we will not need credentials
// We can make use of test credentials
// Service runs by default on http://s3.localhost.localstack.cloud:4566
// The AWS region is 'us-east-1'
// We can create an instance of the AWS S3 bucket to work with using the S3Client provided by the SDK
// Create two controllers each for handling one of the two routes

// URL format as follows: 'http://<bucket-name>.s3.localhost.localstack.cloud:4566/<key-name>
const s3 = new S3Client({
    region: 'us-east-1',
    forcePathStyle: true,
    endpoint: 'http://test.s3.localhost.localstack.cloud:4566',
    credentials: {
      accessKeyId: 'test',
      secretAccessKey: 'test',
    }
});

// Using the send() command, pass in information to upload object using the PutObjectCommand
exports.uploadObject = (req, res) => {
    // Generating a unique key for file uploading along with bucket name and body
    fs.readFileSync(picturePath, (err, fileData) => { 
        if (err) {
            res.status(400).json({
                message: "Could not read file data"
            });
        }
        else {
            s3.send(new PutObjectCommand({ 
                Key: String(new uuid.v4()).split("-")[0], 
                Bucket: "test", 
                Body: fileData
            }))
            .then(() => {
                res.status(200).json({
                    message: "Object successfully uploaded to test bucket!"
                });
            })
            .catch(err => {
                res.status(400).json({
                    message: "Object could not be uploaded to test bucket. " + err
                });
            });
        }
    });
}

// Using the send() command, pass in information to delete object using the DeleteObjectCommand
exports.deleteObject = (req, res) => {
    // Using the unique key related to object, delete from bucket
    s3.send(new DeleteObjectCommand({
        Key: String(new uuid.v4()).split("-")[0],
        Bucket: 'test'
    }))
    .then(() => 
        res.status(200).json({
            message: "Object successfully deleted from test bucket!"
        })
    )
    .catch(err => {
        res.status(400).json({
            message: "Object could not be deleted from test bucket. " + err
        });
    });
}