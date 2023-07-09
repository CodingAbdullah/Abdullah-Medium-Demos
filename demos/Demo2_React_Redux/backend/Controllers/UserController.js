require("dotenv").config({ path : '../.env '});
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Models/User");

exports.loginUser = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);

    User.find({ email }, ( error, result ) => {
        if (error) {
            res.status(400).json({
                message: "Cannot query database"
            });
        }
        else if (result.length === 0) {
            res.status(401).json({
                message: "Email does not exist"
            });
        }
        else {
            // Grab other attributes of the user
            let firstName = result[0].firstName;
            let lastName = result[0].lastName;

            let hashedPassword = result[0].password; // Check hashed password
            bcrypt.compare(password, hashedPassword, ( err, password ) => {
                if (err) {
                    res.status(400).json({
                        message: "Could not verify password " + err
                    });
                }
                else if (password){
                    // Verify and sign JWT token and pass it to client server
                    let token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
                    res.status(200).json({
                        token,
                        user: {
                            firstName,
                            lastName,
                            email
                        }
                    });
                }
                else {
                    res.status(401).json({
                        message: "Password is not valid"
                    });
                }
            });
        }
    });
}