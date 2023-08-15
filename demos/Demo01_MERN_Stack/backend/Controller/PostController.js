const axios = require("axios"); // Make use of the AXIOS HTTP package

// Controller handling request-response
// Retrieve mock data from an API. If successful, send data otherwise, send error data

exports.getPost = (req, res) => {    
    // Making a promise-based request (Promises are integral part of Javascript)
    axios.get("https://jsonplaceholder.typicode.com/todos/1")
    .then(response => {
        res.status(200).json({
            data: response.data
        });
    })
    .catch(err => {
        res.status(400).json({
            message: "Could not fetch requested data! " + err
        });
    });
}