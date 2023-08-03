const express = require("express");
const APIController = require("../Controller/APIController");
const router = express.Router();

// Route for fetching data
router.get("/fetch-api-data", APIController.getData);

module.exports = router;