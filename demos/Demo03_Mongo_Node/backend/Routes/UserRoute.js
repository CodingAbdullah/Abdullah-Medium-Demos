const express = require("express");
const userRouter = express.Router();
const UserController = require("../Controllers/UserController");

// Adding the four main routes for CRUD... 
userRouter.post("/create-user", UserController.createUser);
userRouter.post("/delete-user", UserController.deleteUser);
userRouter.post("/read-user", UserController.readUser);
userRouter.post("/update-user", UserController.updateUser);

module.exports = userRouter;