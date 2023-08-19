require("dotenv").config({ path: '../.env' });
const http = require('http');

http.createServer((req, res) => { 
    // Additional routes will go here
}).listen(process.env.PORT || 8080);