const fs = require("fs");
const databasePath = require("../util/dbPath").dbPath;

// Deleting post data using database file
exports.DeletePost = async (req, res) => {
    const ID = req.query.ID;

    try {
        // Deleting key from data object
        let dbData = JSON.parse(fs.readFileSync(databasePath, "utf-8"));
        delete dbData[ID];

        // Writing back modified data to file
        fs.writeFileSync(databasePath, JSON.stringify(dbData, null, 2));

        res.status(200).json({
            message: "Post deleted successfully"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read database file"
        });
    }
}