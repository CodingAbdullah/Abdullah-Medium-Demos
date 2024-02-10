import * as fs from 'fs';

// Write the LRU cache back to the database
export default async function fileWriter(data: string){
    try {
        fs.writeFileSync('./databases/items.json', data);
    }
    catch(err) {
        throw new Error("Could not write to file");
    }
}