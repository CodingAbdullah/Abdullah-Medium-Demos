import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import setLRUCache from '../util/setLRUCache';
import fileWriter from '../util/fileWriter';
import ItemType from '../dataTypes/ItemType';

export default async function deleteTask(req: Request, res: Response){
    const { deleteData } = JSON.parse(req.body.body);

    try {
        // Set LRU Cache and then proceed to delete entry
        // Re-write updated LRU Cache to database
        const fileData = await fileReader();
        let LRUCache = setLRUCache(fileData);
        let fileObject: ItemType[] = [];

        // Key, if exists, deleted from LRU Cache
        // Finally, write the LRU Cache back to database
        LRUCache.delete(deleteData);
        let keyMapKeys = Array.from(LRUCache.getLRUCacheKeyMap().keys());

        // Make use of the LRU Cache Key Map and iterate through it to access each key for its value
        for (let item = 0; item < keyMapKeys.length; item++){
            let task = LRUCache.getLRUCacheKeyMap().get(keyMapKeys[item]);
            fileObject.push({ id: keyMapKeys[item], description: task });
        }
        
        // Write modified LRU Cache back to database
        await fileWriter(fileObject);
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read file. ERROR: " + err
        });
    }
}