const fs = require("fs");

// Fetching post data from database file
exports.GetPost = async (req, res) => {  
    try {
        let dbData = JSON.parse(fs.readFileSync("../db.json", "utf-8"));
        res.status(200).json({ databaseData: dbData });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read database file"
        });
    }
}