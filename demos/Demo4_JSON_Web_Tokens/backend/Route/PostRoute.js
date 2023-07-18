const express = require("express");
const auth = require("../Middleware/auth"); // Authentication middleware
const PostController = require("../Controller/PostController");
const router = express.Router();

// Using Express middleware for this path to ensure User is logged in to make this request
// *** We will not implement all the CRUD operations for this demo, but you can if you want ***
router.post("/create-post", auth.auth, PostController.createPost);
router.get("/lookup-post", auth.auth, PostController.lookupPost);