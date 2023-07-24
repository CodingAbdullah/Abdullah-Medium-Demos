const express = require("express");
const router = express.Router();
const EmailTokenController = require("../Controller/EmailTokenController");

// Setting email token routes
router.post("/create-email-token", EmailTokenController.createEmailToken);
router.post("/delete-email-token", EmailTokenController.deleteEmailToken);

module.exports = router;