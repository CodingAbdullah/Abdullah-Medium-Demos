const express = require("express");
const CRUDController = require("../Controller/CRUDController");
const router = express.Router();

// Adding in routes for basic CRUD operations
router.post("/insert-user", CRUDController.insertUser);
router.get("/read-user", CRUDController.readUser);
router.post("/update-user", CRUDController.updateUser);
router.post("/delete-user", CRUDController.deleteUser);

module.exports = router;