const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

// Passing in AWS RDS credentials setting up the Sequelize object to establish connection
const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.AWS_RDS_ENDPOINT,
    database: process.env.AWS_RDS_DBNAME,
    username: process.env.AWS_RDS_USERNAME,
    password: process.env.AWS_RDS_PASSWORD
});

// Represent the User model
const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING
});

exports.createUser = (req, res) => {
    const { firstName, lastName, email, password, gender } = JSON.parse(req.body.body);

    // Validate connection to DB
    sequelize.authenticate()
    .then(() => {
        // Sync database with all the models
        sequelize.sync()
        .then(() => {   
            User.findOne({ where : { email }})
            .then(result => {
                if (result !== null) {
                    res.status(200).json({
                        message: "User already exists"
                    });
                }
                else {
                    // Salt and Hash passwords prior to storage
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            res.status(500).json({
                                message: "Could not salt password"
                            });
                        }
                        else {
                            // Generate hashed password using salt and password
                            bcrypt.hash(password, salt, (err, hashedPassword) => {
                                if (err) {
                                    res.status(500).json({
                                        message: "Could not hash password"
                                    });
                                }
                                else {
                                    // Store user information and hashed password to database
                                    User.create({ firstName, lastName, 
                                                email, password: hashedPassword, 
                                                gender })
                                    .then(() => {
                                        res.status(201).json({
                                            message: "Successfully stored User to database"
                                        });
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            message: "Could not store User to database. Err " + err
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: "Could not query User database. Err " + err
                });
            })
        .catch(err => {
            res.status(500).json({
                message: "Could not sync database. ERR " + err
            });
        });
    })
    .catch(err => {
        res.status(401).json({
            message: "Could not connect to database. ERR " + err
        });
    });
})
}

exports.readUser = (req, res) => {
    // Authenticate connection. If successful, query database for all the Users
    sequelize.authenticate()
    .then(() => {
        // Query all users inside database
        User.findAll()
        .then(result => {
            res.status(200).json({
                userData: JSON.stringify(result)
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not query data. Err " + err 
            });
        });
    })
    .catch(err => {
        res.status(401).json({
            message: "Could not connect to database. ERR " + err
        });
    });
}

exports.updateUser = (req, res) => {
    const { firstName, lastName, email, password, gender } = JSON.parse(req.body.body);
    
    // Email is a unique identifier and cannot be updated when account is created
    // Set object to only contain those attributes with values to be updated
    let updateUserObject = {};

    if (firstName !== '') {
        updateUserObject.firstName = firstName;
    }
    else if (lastName !== '') {
        updateUserObject.lastName = lastName;
    }
    else if (password !== '') {
        updateUserObject.password = password;
    }
    else if (gender !== '') {
        updateUserObject.gender = gender;
    }

    // Verify database connection to AWS RDS
    // Update the one user matching the email address
    sequelize.authenticate()
    .then(() => {
        // First, validate user actually exists
        User.findOne({ where : { email }})
        .then(result => {
            if (result === null) {
                res.status(200).json({
                    message: "No user found"
                });
            }
            else {
                // If password is requested to be updated, salt and hash prior to storing
                if (Object.keys(updateUserObject).includes('password')){
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) {
                            res.status(500).json({
                                message: "Could not salt password. Err " + err
                            });
                        }
                        else {
                            // Generate hashed password using salt and password
                            bcrypt.hash(updateUserObject.password, salt, (err, hashedPassword) => {
                                if (err) {
                                    res.status(500).json({
                                        message: "Could not hash password. Err " + err
                                    });
                                }
                                else {
                                    // Update user object to contain hashed password
                                    updateUserObject.password = hashedPassword;

                                    User.update(updateUserObject, {
                                        where: {
                                            email
                                        }
                                    })
                                    .then(() => {
                                        res.status(200).json({
                                            message: "Successfully updated User information"
                                        });
                                    })
                                    .catch(err => {
                                        res.status(500).json({
                                            message: "Could not update requested User. Err " + err
                                        });
                                    });
                                }
                            });
                        }
                    });
                }
                // If password is not requested to be updated, store into database right away
                else {
                    User.update(updateUserObject, {
                        where: {
                            email
                        }
                    })
                    .then(() => {
                        res.status(200).json({
                            message: "Successfully updated User information"
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: "Could not update requested User. Err " + err
                        });
                    });
                }
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not query database. Err " + err
            });
        });
    })
    .catch(err => {
        res.status(401).json({
            message: "Cannot authenticate connection. Err " + err
        });
    });
}

exports.deleteUser = (req, res) => {
    const { email } = JSON.parse(req.body.body);

    // Authenticate connection to AWS RDS database
    sequelize.authenticate()
    .then(() => {
        User.findOne({ where: { email }})
        .then(result => {
            if (result === null) {
                res.status(200).json({
                    message: "No such user exists!"
                });
            }
            else {
                // User exists, delete the requested User
                User.destroy({ where : { email }})
                .then(() => {
                    res.status(200).json({
                        message: "User successfully deleted"
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "User could not be deleted. Err " + err
                    });
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: "Could not query User database. Err " + err
            });
        });
    })
    .catch(err => {
        res.status(401).json({
            message: "Could not establish connection to database. Err " + err
        });
    });
}

// npm install sequelize sequelize-cli mysql2
// npm sequelize-cli
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string,password:string,gender:string
// npx sequelize-cli db:migrate