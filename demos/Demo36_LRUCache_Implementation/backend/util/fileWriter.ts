import * as fs from 'fs';
import LRU from '../dataTypes/LRUCache';
import ItemType from '../dataTypes/ItemType';

// Write the LRU cache back to the database
export default async function fileWriter(fileObject: Array<ItemType>){
    try {
        fs.writeFileSync('./database/items.json', JSON.stringify({ LRU : fileObject }));
    }
    catch(err) {
        throw new Error("Could not write to file");
    }
}