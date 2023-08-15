require("dotenv").config({ path: '../.env' });
const jwt = require("jsonwebtoken");

// Next parameter is optional. We use it distinctively, to pass data from one piece of middleware to another
exports.auth = (req, res, next) => {
    if (req.body.headers.Authorization === undefined || req.body.headers.Authorization === null) {
        res.status(401).json({
            message: "Unauthorized, token does not exist"
        });
    }

    // Format for a token submitted is the following: "Authorization: Bearer <JWT_TOKEN>"
    let token = req.body.headers.Authorization.split(" ")[1]; // Split on space and select second element

    if (token === ''){
        res.status(401).json({
            message: "Token does not exist"
        });
    }
    else {
        jwt.verify(token.substring(1, token.length - 1), process.env.TOKEN_SECRET, (err, result) => {
            if (err){
                res.status(400).json({
                    message: "Cannot verify JWT token. " + err
                });
            }
            else if (result) {
                // If only the token exists AND is verified, move to the next piece of middleware with req object
                // JWT decoded, add User email to req object and pass it on to the next function
                let newReqBody = JSON.parse(req.body.body);
                newReqBody.user = result.email;
                req.body.body = JSON.stringify(newReqBody);
                next();
            }
            else {
                res.status(401).json({
                    message: "Token is invalid or expired"
                });
            }
        });
    }
}