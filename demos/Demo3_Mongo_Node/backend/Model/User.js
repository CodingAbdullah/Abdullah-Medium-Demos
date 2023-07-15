const mongoose = require("mongoose");

// Creating a model using the Mongoose library
const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);