const express = require("express");
const PostRouter = express.Router();
const PostController = require("../Controller/PostController"); 

// Router that maps Post Controller to a particular endpoint for client-side to reference
PostRouter.get("/get-posts", PostController.getPost); 

module.exports = PostRouter;