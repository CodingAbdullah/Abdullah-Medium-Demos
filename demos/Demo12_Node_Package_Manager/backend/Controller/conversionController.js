const hex2dec = require("hex2dec"); // Package for conversions and from hexadecimal and decimal

exports.decToBinConversion = (req, res) => {
    const { dec } = JSON.parse(req.body.body);

    // Client-side will ensure only numbers are entered so no need to check with regex here
    let binaryValue = parseInt(dec, '10').toString(2); // Convert decimal number to binary

    // Binary value sent as response
    res.status(200).json({
        value: binaryValue
    });
}

exports.decToHexConversion = (req, res) => {
    const { dec } = JSON.parse(req.body.body);

    // Client-side will ensure only numbers are entered so no need to check with regex here
    let hexValue = hex2dec.decToHex(String(dec)); // Incorporate the hex2dec package

    // Hex value sent as response
    res.status(200).json({
        value: hexValue
    });
}

exports.binToDecConversion = (req, res) => {
    const { bin } = JSON.parse(req.body.body);

    // Regex for checking to see if any numbers outside of 0 and 1 are found
    if (String(bin).match(/[2-9]/) !== null) {
        res.status(400).json({});
    }
    else {
        let decValue = parseInt(bin, '2').toString(10); // Convert binary to decimal

        // Decimal value sent as response
        res.status(200).json({
            value: decValue
        });
    }
}

exports.binToHexConversion = (req, res) => {
    const { bin } = JSON.parse(req.body.body);

    // Regex for checking to see if any numbers outside of 0 and 1 are found
    if (String(bin).match(/[2-9]/) !== null) {
        res.status(400).json({});
    }
    else {
        let hexValue = parseInt(bin, '2').toString(16); // Convert binary to hexadecimal

        // Hexadecimal value sent as response
        res.status(200).json({
            value: hexValue
        });
    }
}

exports.hexToBinConversion = (req, res) => {
    const { hex } = JSON.parse(req.body.body);

    // Regex for checking to see if value is alphanumeric
    if (hex.match(/^[a-zA-Z0-9]+$/) === null) {
        res.status(400).json({});
    }
    else {
        let binValue = parseInt(hex, '16').toString(2); // Convert hexadecimal to binary

        // Binary value sent as response
        res.status(200).json({
            value: binValue
        });
    }
}

exports.hexToDecConversion = (req, res) => {
    const { hex } = JSON.parse(req.body.body);

    // Regex for checking to see if value is alphanumeric
    if (hex.match(/^[a-zA-Z0-9]+$/) === null) {
        res.status(400).json({});
    }
    else {
        let decValue = hex2dec.hexToDec(hex); // Convert hexadecimal to decimal

        // Decimal value sent as response
        res.status(200).json({
            value: decValue
        });
    }
}