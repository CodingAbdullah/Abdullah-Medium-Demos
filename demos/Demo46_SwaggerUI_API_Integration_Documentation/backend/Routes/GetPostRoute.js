const express = require('express');
const router = express.Router();
const GetPostController = require('../Controller/GetPostController');

// Setting fetch post data route
router.get('/getPost', GetPostController.GetPost);

module.exports = router;