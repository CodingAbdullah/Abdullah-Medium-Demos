const express = require("express");
const router = express.Router();
const PostUserController = require("../Controller/PostUserController");

// When a user is being registered the first time, allow the creation of it
// *** We will NOT implement all the CRUD operations, but you can if you want on your own ***
router.post("/create-user", PostUserController.createUser);
router.post("/login-user", PostUserController.loginUser);

module.exports = router;