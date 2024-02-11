import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import fileWriter from '../util/fileWriter';
import setLRUCache from '../util/setLRUCache';
import ItemType from '../dataTypes/ItemType';
import { v4 as uuid } from 'uuid';

// LRU data is within the database and is stored as { LRU: [] }
export default async function insertTask(req: Request, res: Response){
    const { task } = JSON.parse(req.body.body);

    try {
        // Fetch file information and set the LRU Cache
        const readFileResponse = await fileReader();
        let LRUCache = setLRUCache(readFileResponse);

        // Add new key-value pair to the LRU Cache
        // Make use of the UUID library for unique keys
        // Write data back to database
        LRUCache.set(uuid().split("-")[0], task);
        let fileObject: ItemType[] = [];
        const keyMapKeys = Array.from(LRUCache.getLRUCacheKeyMap().keys());

        // Make use of the LRU Cache Key Map and iterate through it to access each key for its value
        for (let item = 0; item < keyMapKeys.length; item++){
            let task = LRUCache.getLRUCacheKeyMap().get(keyMapKeys[item]);
            fileObject.push({ id: keyMapKeys[item], description: task });
        }

        // Write modified LRU Cache to file
        await fileWriter(fileObject);

        res.status(200).json({
            message: "Insertion complete!"
        });
    }
    catch(err) {
        res.status(400).json({
            message: "Could not insert data. ERROR: " + err
        });
    }   
}