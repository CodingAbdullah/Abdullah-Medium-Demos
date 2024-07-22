const fs = require("fs");

// Deleting post data using database file
exports.DeletePost = async (req, res) => {
    const { ID } = JSON.parse(req.body.body);

    try {
        // Deleting key from data object
        let dbData = JSON.parse(fs.readFileSync("../db.json", "utf-8"));
        delete dbData[ID];

        // Writing back modified data to file
        fs.writeFileSync("../db.json", JSON.stringify(dbData, null, 2));

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