const express = require('express');
const router = express.Router();
const UpdatePostController = require('../Controller/UpdatePostController');

// Setting update post route
router.put('/update-post-data', UpdatePostController.UpdatePost);

module.exports = router;