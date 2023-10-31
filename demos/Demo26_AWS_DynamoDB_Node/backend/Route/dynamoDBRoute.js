const express = require("express");
const dynamoDBController = require("../Controller/dynamoDBController");
const router = express.Router();

// Adding in routes for basic CRUD operations
router.post("/insert-user", dynamoDBController.insertUser);
router.get("/read-user", dynamoDBController.readUser);
router.post("/update-user", dynamoDBController.updateUser);
router.post("/delete-user", dynamoDBController.deleteUser);

module.exports = router;