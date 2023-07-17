const express = require("express");
const router = express.Router();
const UserTokenController = require("../Controller/UserTokenController");

router.post("/create-token", UserTokenController.createUserToken);

module.exports = router;