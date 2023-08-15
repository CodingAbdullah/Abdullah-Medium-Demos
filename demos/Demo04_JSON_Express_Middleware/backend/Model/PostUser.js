const mongoose = require("mongoose");

// Creating a model to represent our Post User
const PostUserSchema = new mongoose.Schema({
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
    numberOfPosts : {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("PostUser", PostUserSchema);