const express = require("express");
const bucketController = require("../Controller/bucketController");
const router = express.Router();

// Create routes to be used by client for object storage and deletion
router.get("/upload-object", bucketController.uploadObject);
router.get("/delete-object", bucketController.deleteObject);

module.exports = router;