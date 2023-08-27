const express = require("express");
const router = express.Router();
const conversionController = require("../Controller/conversionController");

// Adding routes for front-end communication
router.post("/dec-bin-conversion", conversionController.decToBinConversion);
router.post("/dec-hex-conversion", conversionController.decToHexConversion);
router.post("/bin-dec-conversion", conversionController.binToDecConversion);
router.post("/bin-hex-conversion", conversionController.binToHexConversion);
router.post("/hex-bin-conversion", conversionController.hexToBinConversion);
router.post("/hex-dec-conversion", conversionController.hexToDecConversion);

module.exports = router;