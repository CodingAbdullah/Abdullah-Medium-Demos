const express = require("express");
const PhotoController = require("../Controller/PhotoController");

const router = express.Router();

// Setting routes for deleting and uploading a picture
router.get('/upload-photo', PhotoController.uploadPhotoController);
router.post("/delete-photo", PhotoController.deletePhotoController);

module.exports = router;