require("dotenv").config({ path : '../.env '});
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Models/User");

exports.loginUser = (req, res) => {
    const { email, password } = JSON.parse(req.body.body);

    User.find({ email }, ( err, result ) => {
        if (err) {
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
            let hashedPassword = result[0].password; // Check hashed password
            bcrypt.compare(password, hashedPassword, (err, result) => {
                if (err) {
                    res.status(400).json({
                        message: "Could not verify password " + err
                    });
                }
                else if (result){
                    // Verify and sign JWT token and pass it to client server
                    let token = JWT.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
                    res.status(200).json({
                        message: "Email and Password is valid",
                        token
                    });
                }
                else {
                    res.status(401).json({
                        message: "Password is not valid"
                    });
                }
            });
        }
    })
    .catch(err => {
        res.status(400).json({
            message: "Could not find user " + err
        });
    });
}