const express = require("express");
const documentDBController = require("../Controller/documentDBController");
const router = express.Router();

// Adding in routes for basic CRUD operations
router.post("/insert-user", documentDBController.insertUser);
router.get("/read-user", documentDBController.readUser);
router.post('/update-user', documentDBController.updateUser);
router.delete('/delete-user', documentDBController.deleteUser);

module.exports = router;