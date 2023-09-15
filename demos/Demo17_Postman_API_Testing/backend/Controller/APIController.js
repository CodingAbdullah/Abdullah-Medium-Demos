// Controllers for handling each of the routes to be added here
const fs = require("fs");
const filePath = require("../path");

// GET Method Implementation
exports.fetchData = (req, res) => {
    // Read data.json file and provide the path of the file from a separate module
    fs.readFile(filePath.dataFilePath, (err, data) => {
        if (err) {
            res.status(400).json({
                message: "Could not read data"
            });
        }
        else {
            // File data should be parsed for readability
            res.status(200).json({
                APIDATA: JSON.parse(data).data
            });
        }
    });
}

// POST Method Implementation
exports.insertData = (req, res) => {
    let { data } = req.body;

    // Read file data
    fs.readFile(filePath.dataFilePath, (err, fileData) => {
        if (err){
            res.status(400).json({
                message: "Could not read file"
            })
        }
        else {
            // Extract the array storing file data
            let parsedFileData = JSON.parse(fileData).data;

            // Filter request dataset based on ID, duplicates not allowed
            for (var i = 0; i < parsedFileData.length; i++) {
                data = data.filter(x => x.userId !== parsedFileData[i].userId);
            }

            // For each entry to be entered, push each user object
            for (var j = 0; j < data.length; j++) {
                parsedFileData.push(data[j]); 
            }
            
            // Write data object to file, after pushing it programmatically and converting stream to string
            fs.writeFile(filePath.dataFilePath, JSON.stringify({ data: parsedFileData }), err => {
                if (err) {
                    res.status(400).json({
                        message: "Could not write to file"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Successfully written data to file"
                    });
                }
            });
        }
    });
}

// PUT Method Implementation
exports.updateWholeData = (req, res) => {
    const { data } = req.body;

    // Write data object to file anew. Removing all the old content and replacing with data object
    fs.writeFile(filePath.dataFilePath, JSON.stringify({ data }), err => {
        if (err) {
            res.status(400).json({
                message: "Could not write to file"
            });      
        }   
        else {
            res.status(200).json({
                message: "Successfully written data to file"
            });
        }
    });
}

// PATCH Method Implementation
exports.updatePartiallyData = (req, res) => {
    let { data } = req.body;

    // Read file data
    fs.readFile(filePath.dataFilePath, (err, fileData) => {
        if (err){
            res.status(400).json({
                message: "Could not read file"
            })
        }
        else {
            // Extract the array storing file data
            let parsedFileData = JSON.parse(fileData).data;

            // Filter request dataset based on matching IDs
            for (var i = 0; i < parsedFileData.length; i++) {
                data = data.filter(x => x.userId === parsedFileData[i].userId);
            }

            // For each entry to be update, update their title
            for (var j = 0; j < parsedFileData.length; j++) {
                for (var k = 0; k < data.length; k++) {
                    if (data[k].userId === parsedFileData[j].userId){
                        parsedFileData[j].title = data[k].title;
                    }
                }
            }
            
            // Write data object to file, after pushing it programmatically and converting stream to string
            fs.writeFile(filePath.dataFilePath, JSON.stringify({ data: parsedFileData }), err => {
                if (err) {
                    res.status(400).json({
                        message: "Could not write to file"
                    });
                }
                else {
                    res.status(200).json({
                        message: "Successfully written data to file"
                    });
                }
            });
        }
    });

}

// DELETE Method Implementation
exports.deleteData = (req, res) => {
    let { data } = req.body;

    if (data.length > 0) {
        // Read file data
        fs.readFile(filePath.dataFilePath, (err, fileData) => {
            if (err){
                res.status(400).json({
                    message: "Could not read file"
                })
            }
            else {
                // Extract the array storing file data
                let parsedFileData = JSON.parse(fileData).data;

                // Filter request dataset based on IDs that exist
                for (var i = 0; i < parsedFileData.length; i++) {
                    data = data.filter(x => x.userId === parsedFileData[i].userId);
                }

                // Delete those entries based on matching IDs
                for (var j = 0; j < data.length; j++) {
                    parsedFileData = parsedFileData.filter(x => x.userId !== data[j].userId);
                }

                // If length of data object is empty, remove all entries
                fs.writeFile(filePath.dataFilePath, JSON.stringify({ data: parsedFileData }), err => {
                    if (err) {
                        res.status(400).json({
                            message: "Could not write to file"
                        });
                    }
                    else {
                        res.status(200).json({
                            message: "Successfully written data to file"
                        });
                    }
                });
            }
        });
    }
    else {
        // If length of data object is empty, remove all entries
        fs.writeFile(filePath.dataFilePath, JSON.stringify({ data: [] }), err => {
            if (err) {
                res.status(400).json({
                    message: "Could not write to file"
                });
            }
            else {
                res.status(200).json({
                    message: "Successfully written data to file"
                });
            }
        });
    }
}