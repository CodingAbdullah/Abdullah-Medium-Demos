const express = require("express");
const APIController = require("../Controller/APIController");

const router = express.Router(); // Router for working with different paths

// Routes to be added later, focusing on the 5 types: GET/POST/PUT/PATCH/DELETE
router.get("/fetch-data", APIController.fetchData);
router.post("/insert-data", APIController.insertData);
router.put("/update-whole-data", APIController.updateWholeData);
router.patch("/update-partially-data", APIController.updatePartiallyData);
router.delete("/delete-data", APIController.deleteData);

module.exports = router;