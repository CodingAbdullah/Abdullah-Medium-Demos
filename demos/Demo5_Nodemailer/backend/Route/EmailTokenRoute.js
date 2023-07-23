const express = require("express");
const router = express.Router();
const EmailTokenController = require("../Controller/EmailTokenController");

router.post("/create-token", EmailTokenController.createEmailToken);
router.post("/delete-token", EmailTokenController.deleteEmailToken);

module.exports = router;