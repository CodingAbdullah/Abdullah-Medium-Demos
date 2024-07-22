const fs = require("fs");
const uuid = require("uuid");
const databasePath = require("../util/dbPath").dbPath;

// Inserting Post data using database file
exports.InsertPost = async (req, res) => {
    const { post } = JSON.parse(req.body.body);

    const postID = uuid.v4(); // Makeshift Post ID using version 4

    // Read database file
    // Extract data from file
    // Parse and append Post ID with Post data
    // Write back to database file
    try {
        let dbData = JSON.parse(fs.readFileSync(databasePath, "utf-8"));
        dbData[postID] = post;

        // Write back data to file
        fs.writeFileSync(databasePath, JSON.stringify(dbData, null, 2));

        res.status(200).json({
            message: "Post added successfully"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read database file"
        });
    }
}