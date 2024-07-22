const fs = require("fs");
const databasePath = require("../util/dbPath").dbPath;

// Updating post data using database file
exports.UpdatePost = async (req, res) => {
    const { ID, post } = req.body;

    try {
        let dbData = JSON.parse(fs.readFileSync(databasePath, "utf-8"));
        dbData[ID] = post;

        // Write back data to file
        fs.writeFileSync(databasePath, JSON.stringify(dbData, null, 2));

        res.status(200).json({
            message: "Post updated successfully"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read database file"
        });
    }
}