const UUID = require("uuid"); // Package for generating random IDs
const Post = require("../Model/Post");
const PostUser = require("../Model/PostUser");

exports.createPost = (req, res) => {
    const { user, post } = JSON.parse(req.body.body);

    const id = UUID.v4(); // Generate a random ID for each post to be saved
    let newPost = new Post({ postID: id, postMadeBy: user, post });

    // Save newly made post to database
    newPost.save()
    .then(() => {
        // Now updating the User's number of posts attribute in the Post Users collection
        PostUser.findOne({ email : user }, (err, postUser) => {
            if (err){
                res.status(400).json({
                    message: "Cannot query Post User Collection " + err
                });
            }
            else if (postUser){
                PostUser.updateOne({ email: user }, { $set : { numberOfPosts : postUser.numberOfPosts + 1 }}, (err, result) => {
                    if (err) {
                        res.status(400).json({
                            message: "Cannot update User post count"
                        });
                    }
                    else {
                        res.status(201).json({
                            message: "Post was successfully created and saved and post count updated"
                        });
                    }
                });
            }
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