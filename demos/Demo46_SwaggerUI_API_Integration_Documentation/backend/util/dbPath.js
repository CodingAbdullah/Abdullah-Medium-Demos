const path = require('path');

// Dynamically exporting the path to the database file
exports.dbPath = path.join(__dirname, 'db.json');