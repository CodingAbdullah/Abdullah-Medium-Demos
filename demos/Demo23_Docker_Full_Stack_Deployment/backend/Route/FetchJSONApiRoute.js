const express = require("express");
const JSONDataFetch = require("../Controller/FetchJSONApiController");
const router = express.Router();

router.get("/fetch-api-data", JSONDataFetch.FetchJSONAPIData); // API endpoint

module.exports = router;