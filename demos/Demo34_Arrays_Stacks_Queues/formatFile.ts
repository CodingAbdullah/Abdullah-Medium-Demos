import * as fs from 'fs';
import Queue from './Queue';

fs.readFile('./files/unformattedText.txt', (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        let fileData = String(data); // Converting stream to string
        let PunctuationQueue = new Queue(); // Initializing an empty queue for string formatting

        for (let i = 0; i < fileData.length; i++) {
            if (fileData.charAt(i) === '.' || fileData.charAt(i) === '?' || fileData.charAt(i) === '!'){
                PunctuationQueue.enqueue(fileData.charAt(i));
            }
            else {
                continue;
            }
        }

        // Regex for splitting on sentence ending punctuation
        let sentences: string[] = fileData.split(/[.?!]/); 

        // Append punctuation back into the sentence using the PunctuationQueue
        for (let j = 0; j < sentences.length;j++){
            let punctuationValue = PunctuationQueue.dequeue();
            sentences[j] += punctuationValue;
        }

        // Append newline characters at the end of each sentence
        for (let k = 0; k < sentences.length; k++){
            sentences[k] += '\n';
        }

        // Append all into a single string again
        let modifiedText = '';
        for (let x = 0; x < sentences.length; x++) {
            modifiedText += sentences[x];
        }

        // Finally, write back the modified text to a new file
        fs.writeFile('./files/formattedText.txt', modifiedText, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }
}); 