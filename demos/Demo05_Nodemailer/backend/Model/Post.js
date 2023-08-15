const mongoose = require("mongoose");

// Creating a model representing a Post
const PostSchema = new mongoose.Schema({
    postID: {
        type: String,
        required: true
    },
    postMadeBy : {
        type: String,
        required: true
    },
    post : {
        type: String,
        required: true
    }
}, 
{
    timestamps: true
}
);

module.exports = mongoose.model('Post', PostSchema);