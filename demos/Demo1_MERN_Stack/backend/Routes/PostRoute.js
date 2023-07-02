const express = require("express");
const PostRouter = express.Router();
const PostController = require("../Controller/PostController"); 

PostRouter.get("/get-posts", PostController.getPost); // Router that maps Post Controller to a particular endpoint for client-side to reference

module.exports = PostRouter;