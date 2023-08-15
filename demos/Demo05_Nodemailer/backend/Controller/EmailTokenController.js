require("dotenv").config({ path: '../.env' });
const bcryptjs = require("bcryptjs");
const EmailToken = require("../Model/EmailToken");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const PostUser = require("../Model/PostUser");
const UUID = require("uuid");

exports.createEmailToken = (req, res) => {
    const { email } = JSON.parse(req.body.body);

    // First check to see if the email requested for password reset is valid
    PostUser.find({ email }, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Could not traverse PostUser collection " + err
            });
        }
        else {
            // Invalid email
            if (result.length === 0) {
                res.status(401).json({
                    message: "No such email exists"
                });
            }
            else {
                const verification_ID = UUID.v4(); // Generate a random, unique ID

                // Salt & Hash this ID
                bcryptjs.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(400).json({
                            message: "Cannot salt ID " + err
                        });
                    }
                    else {
                        bcryptjs.hash(verification_ID, salt, (err, hashedID) => {
                            if (err) {
                                res.status(400).json({
                                    message: "Cannot hash password " + err
                                });
                            }
                            else {
                                // Delete any tokens associated with the account
                                EmailToken.deleteMany({ email }, (err, result) => {
                                    if (err) {
                                        res.status(400).json({
                                            message: "Could not clear any email tokens"
                                        });
                                    }
                                    else {
                                        // Sign JWT token with the hashed ID as payload and save to collection
                                        // JWT should only be valid for 5 minutes
                                        let emailTokenJWT = jwt.sign({ hashed_verification_id: hashedID } , process.env.TOKEN_SECRET, { expiresIn: 5 * 60 });
                                        let newEmailToken = new EmailToken({ email , token: emailTokenJWT });

                                        // Send email to user containing the actual verification ID 
                                        // Only be using GMAIL for this example
                                        const emailTransport = nodeMailer.createTransport({
                                            service: 'gmail',
                                            auth : {
                                                user: process.env.EMAIL_ADDRESS,
                                                pass: process.env.EMAIL_KEY
                                            }
                                        });

                                        // Provide the destination and set it as the user's email along with text containing ID
                                        newEmailToken.save()
                                        .then(() => {   
                                            let emailOptions = {
                                                from: process.env.EMAIL_ADDRESS,
                                                to: email,
                                                subject: 'Verification ID for password reset',
                                                html: `Here is the <b>Verification ID</b> needed to reset your password.<br /> ID will expire in <b>5 minutes: <br /> ${verification_ID}</b>`
                                            }

                                            // Send email containing details
                                            emailTransport.sendMail(emailOptions, (err, result) => {
                                                if (err){
                                                    res.status(400).json({
                                                        message: "Could not send email containing ID: " + err
                                                    });
                                                }
                                                else {
                                                    res.status(201).json({
                                                        message: "Successfully created/saved/send ID. " + result.response
                                                    });
                                                }
                                            });
                                        })
                                        .catch(err => {
                                            res.status(400).json({
                                                message: "Could not save email token to database " + err
                                            });
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    });
}

// Once User obtains verification ID, update password and delete email token from database
exports.deleteEmailToken = (req, res) => {
    const { email, ID, password } = JSON.parse(req.body.body);

    // First compare ID user submitted to one stored inside of the EmailToken collection
    // Check if email exists inside of collection
    EmailToken.find({ email }, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Cannot search EmailToken collection " + err
            });
        }
        else {
            let emailTokenJWT = result[0].token; // Extract the JWT stored inside the document

            jwt.verify(emailTokenJWT, process.env.TOKEN_SECRET, (err, payload) => {
                if (err) {
                    EmailToken.deleteOne({ email }, (err, result) => {
                        if (err) {
                            res.status(401).json({
                                message: "Token is expired and could not be removed " + err
                            });
                        }
                        else {
                            res.status(401).json({
                                message: "Token expired, deleted from EmailToken Collection!"
                            });
                        }
                    });
                }
                else {
                    // If JWT is valid (under 5 minutes), extract JWT payload and compare the ID to hashed ID
                    bcryptjs.compare(ID, payload.hashed_verification_id, (err, result) => {
                        if (err) {
                            res.status(400).json({
                                message: "Could not compare IDs"
                            });
                        }
                        // If comparison runs true, update password of user and delete email token
                        else if (result) {
                            // Update the password and stored it hashed and delete email token
                            bcryptjs.genSalt(10, (err, salt) => {
                                if (err) {
                                    res.status(400).json({
                                        message: "Could not generate a salt. " + err
                                    });
                                }
                                else {
                                    bcryptjs.hash(password, salt, (err, hashedPassword) => {
                                        if (err) {
                                            res.status(400).json({
                                                message: "Could not generate hash for new password. " + err
                                            });
                                        }
                                        else {
                                            // Once hash is generated for new password, save to PostUser collection
                                            // Delete EmailToken associated with email
                                            PostUser.updateOne( { email }, { $set : { password: hashedPassword }}, (err, result) => {
                                                if (err) {
                                                    res.status(400).json({
                                                        message: "Could not update document inside of PostUser collection. " + err
                                                    });
                                                }
                                                else {
                                                    // Now delete email token document from collection and send response
                                                    EmailToken.deleteOne({ email }, (err, result) => {
                                                        if (err) {
                                                            res.status(400).json({
                                                                message: "Could not delete EmailToken document after reset. " + err
                                                            });
                                                        }
                                                        else {
                                                            res.status(200).json({
                                                                message: "Password successfully reset! Email Token deleted."
                                                            });
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            res.status(401).json({
                                message: "Invalid ID, password will not be reset"
                            });
                        }
                    });
                }   
            });
        }
    });
}