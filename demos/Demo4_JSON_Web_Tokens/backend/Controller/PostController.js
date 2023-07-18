const UUID = require("uuid"); // Package for generating random IDs
const Post = require("../Model/Post");

exports.createPost = (req, res) => {
    const { user, post } = JSON.parse(req.body.body);

    const id = UUID.v4(); // Generate a random ID for each post to be saved
    let newPost = new Post({ postID: id, postMadeBy: user, post });

    // Save newly made post to database
    newPost.save()
    .then(() => {
        res.status(201).json({
            message: "Post was successfully created and saved"
        });
    })
    .catch(err => {
        res.status(400).json({
            message: "Post could not be saved to database " + err
        });
    });
}

exports.lookupPost = (req, res) => {
    const { user } = JSON.parse(req.body.body);

    // Lookup posts by email using middleware data sent through and pass back data as response
    Post.find({ postMadeBy: user }, (err, result) => {
        if (err) {
            res.status(400).json({
                message: "Cannot find any posts for user. " + err
            });
        }
        else {
            res.status(200).json({
                userPostData: result
            });
        }
    });
}