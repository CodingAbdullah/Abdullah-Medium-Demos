const express = require("express");
const UserController = require("../Controller/UserController");

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/read-user", UserController.readUser);
router.post("/update-user", UserController.updateUser);
router.post("/delete-user", UserController.deleteUser);

module.exports = router;