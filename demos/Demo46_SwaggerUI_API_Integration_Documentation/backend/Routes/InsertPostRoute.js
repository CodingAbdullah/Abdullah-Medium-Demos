const express = require('express');
const router = express.Router();
const InsertPostController = require('../Controller/InsertPostController');

// Setting insert post route
router.post('/insertPost', InsertPostController.InsertPost);

module.exports = router;