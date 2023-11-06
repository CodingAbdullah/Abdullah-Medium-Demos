require('dotenv').config({ path: '../.env' });
const dynamoDB = require('../AWS/dynamoDBInstance');
const bcrypt = require('bcryptjs');

exports.insertUser = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // Setting request parameters for verification
    let requestParam = {
        TableName: 'User',
        Key: {
            'emailAddress' : { 'S' : email }
        }
    }

    // Check database if User already exists
    dynamoDB.getItem(requestParam, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not query database"
            });
        }
        else {
            // If response object is empty, no user entry consists of that email, proceed to insert
            if (Object.keys(data).length === 0){
                // Generate salt for password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(400).json({
                            message: "Could not generate salt"
                        });
                    }
                    else {
                        // Generate hash using salt for password
                        bcrypt.hash(password, salt, (err, hashedPassword) => {
                            if (err) {
                                res.status(400).json({
                                    message: "Could not hash password"
                                });
                            }
                            else {
                                // Define what needs to be inserted into DynamoDB table with hashed password
                                let insertObjectParam = {
                                    TableName: 'User',
                                    Item: {
                                        'emailAddress': { 'S' : email },
                                        'firstName': { 'S' : firstName },
                                        'lastName' : { 'S' : lastName },
                                        'password' : { 'S' : hashedPassword },
                                        'dateCreated' : { 'S' : new Date().toISOString() },
                                        'dateUpdated' : { 'S' : new Date().toISOString() } 
                                    }
                                }

                                // Insert object using the PutItem() function
                                dynamoDB.putItem(insertObjectParam, (err, data) => {
                                    if (err) {
                                        res.status(400).json({
                                            message: "Could not insert User into database"
                                        });
                                    }
                                    else {
                                        res.status(200).json({
                                            message: "User successfully added"
                                        });
                                    }
                                });
                            }
                        });
                    } 
                });
            }
            else {
                res.status(400).json({
                    message: "User already exists!"
                });
            }
        }
    });
}

exports.readUser = (req, res) => { 
    const readParams = {
        TableName: 'User'
    };

    // Return all users in table using the scan() function
    dynamoDB.scan(readParams, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not fetch Users"
            });
        }
        else {
            res.status(200).json({
                users: data.Items
            });
        }
    });
}

exports.updateUser = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // Create new object for the purpose of updating data
    let userData = {};

    // Email will always be required in the Update User form, rest are optional
    userData.email = email; 

    // Check to see if any of the fields are non-empty. 
    // If so, append a key to object with their value
    if (firstName !== '') {
        userData.firstName = firstName;
    }
    if (lastName !== '') {
        userData.lastName = lastName;
    }
    if (password !== ''){
        userData.password = password;
    }

    // Setting request parameters for verification
    let requestParam = {
        TableName: 'User',
        Key: {
            'emailAddress' : { 'S' : email }
        }
    }
    
    // Check DynamoDB table to see if User exists
    dynamoDB.getItem(requestParam, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not find User"
            });
        }
        else {
            // If User with this email address is found, update User, else return error
            if (Object.keys(data).length !== 0) {
                // If update includes password, generate a salt and hash for it
                if (Object.keys(userData).includes('password')){
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            res.status(400).json({
                                message: "Could not generate salt"
                            });
                        }
                        else {
                            // Hash password of the User if data was provided
                            bcrypt.hash(password, salt, (err, hashedPassword) => {
                                if (err) {
                                    res.status(400).json({
                                        message: "Could not generate hash"
                                    });
                                }
                                else {
                                    // Set values to what was provided and update password of userData object
                                    // Pass object in for update
                                    userData.password = hashedPassword;

                                    let expression = '';
                                    let expressionAttributes = {};

                                    // Check userData object to see which attributes need to be updated for statement construction
                                    // First name and Last name may or may not be required to be updated, formulate statement accordingly
                                    expression = userData.firstName !== undefined ? 'SET firstName = :firstName,' : '';

                                    expression += userData.lastName !== undefined && userData.firstName === undefined ? 'SET lastName = :lastName,' : 
                                                    (userData.lastName !== undefined && userData.firstName !== undefined ? ' lastName = :lastName,' : ''),

                                                    // Password will be updated if userData key exists
                                    expression += userData.firstName === undefined && userData.lastName === undefined ? 'SET password = :password,' : ' password = :password,';

                                    // Date modified attribute will always be updated
                                    expression += ' dateUpdated = :dateUpdated';

                                    // Check to see which attributes are available and add values accordingly
                                    if (userData.firstName !== undefined) {
                                        expressionAttributes[':firstName'] = { 'S' : userData.firstName };
                                    }
                                    if (userData.lastName !== undefined) {
                                        expressionAttributes[':lastName'] = { 'S' : userData.lastName };
                                    }
                                    if (userData.password !== undefined) {
                                        expressionAttributes[':password'] = { 'S' : userData.password };
                                    }

                                    // Pass in the latest date value to update User information
                                    expressionAttributes[":dateUpdated"] = { 'S' : new Date().toISOString() };
                                    
                                    // Create object with expression and expression attribute values for User update
                                    let updateParams = {
                                        TableName: 'User',
                                        Key: { 'emailAddress' : { 'S' : email }
                                        },
                                        UpdateExpression: expression,
                                        ExpressionAttributeValues: expressionAttributes
                                    }

                                    // Update items using the updateItem() function
                                    dynamoDB.updateItem(updateParams, (err, data) => {
                                        if (err) {
                                            res.status(400).json({
                                                message: "Could not update User information"
                                            });
                                        }
                                        else {
                                            res.status(200).json({
                                                message: "User information updated"
                                            });
                                        };
                                    });
                                }
                            });
                        }
                    });
                }
                else {
                    // Set values to what was provided
                    // No need for salting and hashing passwords as password to update was not provided
                    // Pass object in userData object as is for updatelet expression = '';
                    let expression = '';
                    let expressionAttributes = {};

                    // Check userData object to see which attributes need to be updated for statement construction
                    // First name and Last name may or may not be required to be updated, formulate statement accordingly
                    expression = userData.firstName !== undefined ? 'SET firstName = :firstName,' : '';

                    expression += userData.lastName !== undefined && userData.firstName === undefined ? 'SET lastName = :lastName,' : 
                                    (userData.lastName !== undefined && userData.firstName !== undefined ? ' lastName = :lastName,' : ''),

                    // Password will not be updated as it is not part of the userData keys
                    // Date modified attribute will always be updated
                    expression += ' dateUpdated = :dateUpdated';

                    // Check to see which attributes are available and add values accordingly
                    if (userData.firstName !== undefined) {
                        expressionAttributes[':firstName'] = { 'S' : userData.firstName };
                    }
                    if (userData.lastName !== undefined) {
                        expressionAttributes[':lastName'] = { 'S' : userData.lastName };
                    }

                    // Pass in the latest date value to update User information
                    expressionAttributes[":dateUpdated"] = { 'S' : new Date().toISOString() };
                                    
                    // Create object with expression and expression attribute values for User update
                    let updateParams = {
                        TableName: 'User',
                        Key: { 'emailAddress' : { 'S' : email }
                        },
                        UpdateExpression: expression,
                        ExpressionAttributeValues: expressionAttributes
                    }

                    // Update DynamoDB table with requested attributes using the updateItem() function
                    dynamoDB.updateItem(updateParams, (err, data) => {
                        if (err) {
                            res.status(400).json({
                                message: "Could not update User information"
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "User information updated"
                            });
                        };
                    });
                }
            }
            else {
                // User does not exist, return error response
                res.status(400).json({
                    message: "Could not update User values, as User does not exist!"
                });
            }
        }
    });
}

exports.deleteUser = (req, res) => {
    const { emailAddress } = JSON.parse(req.body.body);

    // Set delete parameters
    let deleteParams = {
        TableName: 'User',
        Key: {
            emailAddress : { 'S' : emailAddress }
        }
    }

    // Delete item using the deleteItem() function
    dynamoDB.deleteItem(deleteParams, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not delete User"
            });
        }
        else {
            res.status(200).json({
                message: "User successfully deleted"
            });
        }
    });
}