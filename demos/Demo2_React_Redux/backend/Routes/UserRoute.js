const express = require("express");
const UserController = require("../Controllers/UserController");
const UserRouter = express.Router();

UserRouter.post("/login", UserController.loginUser);

module.exports = UserRouter;