require('dotenv').config({ path: '.env ' });
const User = require("../Model/User");
const bcrypt = require('bcryptjs');

exports.insertUser = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // Check to see if Email already exists in database
    User.find({ email }, (err, data) => {
        if (err){
            res.status(401).json({
                message: "Could not query database"
            });
        }
        else {
            if (data.length !== 0) {
                res.status(401).json({
                    message: "User already exists!"
                });
            }
            else {
                // Generate a salt for hashing password
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(400).json({
                            message: "Could not salt password"
                        });
                    }
                    else {
                        // Hash the password prior to storage
                        bcrypt.hash(password, salt, (err, hashedPassword) => {
                            if (err) {
                                res.status(400).json({
                                    message: "Could not hash password"
                                });
                            }
                            else {
                                // Create a new document with a hashed password stored and return a response
                                let newUser = new User({ firstName, lastName, email, password: hashedPassword });
                                
                                // Save document to database and return response
                                newUser.save()
                                .then(() => {
                                    res.status(200).json({
                                        message: "User successfully added to database"
                                    });
                                })
                                .catch(() => {
                                    res.status(400).json({
                                        message: "User could not be added to database"
                                    });
                                });
                            }
                        })
                    }
                });
            }
        }
    });
}

exports.readUser = (req, res) => { 
    // Return all users (no criteria specified) and filter out passwords while doing it
    User.find({}, (err, data) => {
        if (err) {
            res.status(401).json({
                message: "Could not query database"
            });
        }
        else {
            // Filter out passwords and add ObjectId attribute that uniquely identifies JSON document
            let filteredUsers = [];
            for (var i = 0; i < data.length; i++){
                let { _id, firstName, lastName, email, createdAt, updatedAt } = data[i];
                filteredUsers.push({ id: _id, firstName, lastName, email, createdAt, updatedAt });
            }
            
            // Return filtered Users
            res.status(200).json({
                users: filteredUsers
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

    // Check to see if User exists
    User.find({ email }, (err, data) => {
        if (err) {
            res.status(401).json({
                message: "Could not find User"
            });
        }
        else {
            // If User with this email address is found, update User, else return error
            if (data.length !== 0) {
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
                                    User.updateOne({ email }, { $set : userData }, (err, data) => {
                                        if (err) {
                                            res.status(400).json({
                                                message: "Could not update User credentials"
                                            });
                                        }
                                        else if (data){
                                            res.status(200).json({
                                                message: "User successfully updated"
                                            });
                                        }
                                        else {
                                            res.status(400).json({
                                                message: "User could not be updated"
                                            });
                                        }
                                    });
                                }
                            });
                        }
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
    })
}

exports.deleteUser = (req, res) => {
    const { userID } = JSON.parse(req.body.body); 

    // Check to see if User exists
    User.find({ _id: userID }, (err, data) => {
        if (err) {
            res.status(401).json({
                message: "Could not query database"
            });
        }
        else {
            // If User exists, delete it
            if (data.length !== 0) {
                User.deleteOne({ _id: userID }, (err, data) => {
                    if (err) {
                        res.status(401).json({
                            message: "Could not delete User"
                        });
                    }
                    else if (data) {
                        res.status(200).json({
                            message: "User successfully deleted"
                        });
                    }
                    else {
                        res.status(400).json({
                            message: "Could not delete User"
                        })
                    }
                });
            }
            else {
                // User does not exist, therefore return error response
                res.status(401).json({
                    message: "User with this ID does not exist"
                });
            }
        }
    });
}