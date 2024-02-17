import * as fs from 'fs';
import * as xmldom from 'xmldom';

try {
    fs.readFile('./views/SimpleWebPage.ejs', (err, data) => {
        if (err) {
            console.log("Error reading file. ERROR: " + err);
        } 
        else {
            let domParser = new xmldom.DOMParser();
            let convertedData = String(data);

            // Retrieve a nodelist document related to the HTML page
            let document = domParser.parseFromString(convertedData, 'text/xml');

            // Start from the root element and traverse your way down
            let rootElement = document.documentElement

            // Check to see if child nodes exist
            // If so, search for and return all text
            // If not, return an empty text file
            if (rootElement.hasChildNodes()) {
                let fileText = parseDocument(rootElement);

                // Write this text into a text file
                fs.writeFile('./textFileText.txt', fileText, err => {
                    if (err) {
                        console.log("Error writing text to file. ERROR: " + err);
                    }
                });
            }
            else {
                // Create an empty file with no text
                fs.writeFile('./textFileText.txt', '', err => {
                    if (err) {
                        console.log("Error creating an empty text file. ERROR: " + err);
                    }
                });
            }
        }
    })
}
catch (err) {
    console.log("Error reading the SimpleWebPage.ejs file. ERROR: " + err);
}

// Traverse through all the nodes and call the parseDocument() function
// Retrieve all text
function parseDocument(node: Node): string {
    let text = '';

    // If Node type is element (1), pass in child node and traverse through it
    // If Node type is text (3), simply append text to existing fileText
    for (let i = 0; i < node.childNodes.length; i++) {
        if (node.childNodes[i].nodeType === 1) {
            text += parseDocument(node.childNodes[i]);
        }
        else if (node.childNodes[i].nodeType === 3) {
            text += node.childNodes[i].nodeValue;
        }
    }

    // Once this process is complete, return the text
    return text;
}