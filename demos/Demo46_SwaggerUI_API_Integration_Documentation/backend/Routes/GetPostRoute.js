const express = require('express');
const router = express.Router();
const GetPostController = require('../Controller/GetPostController');

// Setting fetch post data route
router.get('/get-post-data', GetPostController.GetPost);

module.exports = router;