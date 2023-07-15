const User = require("../Model/User");
const bcrypt = require("bcryptjs");

exports.createUser = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // Salting and hashing a password before inserting into a database
    bcrypt.genSalt(10, ( err, salt ) => {
        if (err) {
            res.status(400).json({
                message: "Cannot Salt password " + err
            });
        }
        else {
            bcrypt.hash(password, salt, ( err, hashedPassword ) => {
                if (err){
                    res.status(400).json({
                        message: 'Cannot hash password ' + err
                    });
                }
                else {
                    User.insertMany({ firstName, lastName, email, password: hashedPassword, 
                        numberOfPicturesCurrentlyStored: 0, totalStoredPictures : 0 }, ( err, result ) => {
                            if (err){
                                res.status(400).json({
                                    message: "Cannot insert document " + err
                                });
                            }
                            else if (result){
                                res.status(201).json({
                                    message: "User successfully created"
                                });
                            }
                            else {
                                res.status(400).json({
                                    message: "Cannot create User"
                                });
                            }
                    });
                }
            });
        }
    });
}


exports.readUser = (req, res) => {
    const { ID } =  JSON.parse(req.body.body);

    // Finding a User based on unique MongoDB Object ID
    User.findOne({ _id: ID }, ( err, result ) => {
        if (err){
            res.status(400).json({
                message: "Cannot query DB " + err
            });
        }
        else if (result) {
            res.status(200).json({
                user: result
            });
        }
        else {
            res.status(400).json({
                message: "No user found"
            });
        }
    });
}

exports.updateUser = (req, res) => {
    const { firstName, lastName, email, password } = JSON.parse(req.body.body);

    // For the purposes of this demo... fields left empty will be updated as empty
    // Salting and hashing a password before inserting into a database
    bcrypt.genSalt(10, ( err, salt ) => {
        if (err) {
            res.status(400).json({
                message: "Cannot Salt password " + err
            });
        }
        else {
            bcrypt.hash(password, salt, ( err, hashedPassword ) => {
                if (err){
                    res.status(400).json({
                        message: 'Cannot hash password ' + err
                    });
                }
                else {
                    User.updateOne({ email }, { $set : { firstName, lastName, password: hashedPassword, 
                        numberOfPicturesCurrentlyStored: 0, totalStoredPictures : 0 }}, ( err, result ) => {
                            if (err){
                                res.status(400).json({
                                    message: "Cannot query database " + err
                                });
                            }
                            else if (result) {
                                res.status(200).json({
                                    message: "User successfully updated"
                                });
                            }
                            else {
                                res.status(400).json({
                                    message: "User cannot be updated"
                                });
                            }
                    });
                }
            });
        }
    });
}

exports.deleteUser = (req, res) => {
    const { ID } =  JSON.parse(req.body.body);

    // Deleting a User based on unique MongoDB Object ID
    User.deleteOne({ _id: ID }, ( err, result ) => {
        if (err){
            res.status(400).json({
                message: "Cannot query DB " + err
            });
        }
        else if (result) {
            res.status(200).json({
                user: result
            });
        }
        else {
            res.status(400).json({
                message: "No user found"
            });
        }
    });
}