const mongoose = require("mongoose");

// Creating a model representing the User
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    numberOfPicturesCurrentlyStored : {
        type: Number,
        required: true
    },
    totalStoredPictures : {
        type: Number,
        required: true
    }},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', UserSchema);