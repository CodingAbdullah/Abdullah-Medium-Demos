const express = require('express');
const router = express.Router();
const DeletePostController = require('../Controller/DeletePostController');

// Setting delete post route
router.delete('/deletePost', DeletePostController.DeletePost);

module.exports = router;