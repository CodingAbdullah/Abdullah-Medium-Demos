const axios = require("axios");

// Fetch Data using JSON Placeholder API
exports.FetchJSONAPIData = (req, res) => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => {
        res.status(200).json({
            jsonData: response.data
        });
    })
    .catch(() => {
        res.status(400).json({
            message: "Could not fetch data"
        });
    });
}