require("dotenv").config({ path: '../.env' });
const PostUser = require("../Model/PostUser");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

exports.createUser = (req, res) => {
    const { email, firstName, lastName, password } = JSON.parse(req.body.body);

    // First check database to see if a user exists, before registering one
    PostUser.findOne({ email }, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Cannot query User Collection. " + err
            });
        }
        else {
            // No users are found, go ahead and register
            if (result.length === 0) {

                // Salt and hash password of newly user before registering
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(400).json({
                            message: "Cannot salt password, invalid register. " + err
                        });
                    }
                    else {
                        bcrypt.hash(password, salt, (err, hashedPassword) => {
                            if (err) {
                                res.status(400).json({
                                    message: "Cannot hash password, invalid register. " + err
                                });
                            }
                            else {
                                let newUser = new PostUser({ email, firstName, lastName, password: hashedPassword, numberOfPosts: 0 });

                                // Save newly created User to database with hashed password
                                newUser.save()
                                .then(() => {
                                    res.status(201).json({
                                        message: "User successfully registered!"
                                    });
                                })
                                .catch(err => {
                                    res.status(400).json({
                                        message: "Cannot register User. " + err 
                                    });
                                });
                            }
                        });
                    }
                });
            }
            else {
                // User exists? Respond with an error
                res.status(400).json({
                    message: "User already exists!"
                });
            }
        }
    });
}

exports.loginUser = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);

    // First, search the User by email to validate username
    PostUser.find({ email }, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Cannot search User. " + err
            });
        }
        else {
            // No emails found, means invalid email
            if (result.length === 0) {
                res.status(400).json({
                    message: "Email does not exist!"
                });
            }
            else {
                // Email is found, compare passwords
                bcrypt.compare(password, result[0].password, (err, decoded) => {
                    if (err) {
                        res.status(400).json({
                            message: "Cannot compare passwords. " + err
                        });
                    }
                    else if (decoded) {
                        // Sign a JWT token and pass the email as the payload, valid for one hour only
                        let token = JWT.sign(result[0].email, process.env.TOKEN_SECRET, { expiresIn: 60 * 60  });
                       
                        // Pass token to User
                        res.status(200).json({
                            token
                        });
                    }
                    else {
                        res.status(401).json({
                            message: "Passwords do not match"
                        });
                    }
                });
            }
        }
    });
}