import * as fs from 'fs';

// Read and return the LRU Cache data
export default async function fileReader() {
    try {
        let fileData = fs.readFileSync('./database/items.json');
        return JSON.parse(String(fileData)).LRU;
    }
    catch (err) {
        throw new Error("Could not read file");
    }
}