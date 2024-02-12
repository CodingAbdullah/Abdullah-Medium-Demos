import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import fileWriter from '../util/fileWriter';
import setLRUCache from '../util/setLRUCache';
import ItemType from '../dataTypes/ItemType';

export default async function updateTask(req: Request, res: Response){
    const { updateID, description } = JSON.parse(req.body.body);

    try {
        // Set LRU Cache and then proceed to delete entry
        // Re-write updated LRU Cache to database
        const fileData = await fileReader();
        let LRUCache = setLRUCache(fileData);

        // Update key with new description
        // Finally, write the LRU Cache back to database
        LRUCache.set(updateID, description);

        let fileObject: ItemType[] = [];
        let keysArrangement = LRUCache.getLRUCache();
        const keyMapKeys = Array.from(LRUCache.getLRUCacheKeyMap().keys());

        // Make use of the LRU Cache Key Map and iterate through it to access each key for its value
        for (let item = 0; item < keyMapKeys.length; item++){
            let task = LRUCache.getLRUCacheKeyMap().get(keysArrangement[item]);
            fileObject.push({ id: keysArrangement[item], description: task });
        }

        // Write modified LRU Cache to file
        await fileWriter(fileObject);

        res.status(200).json({
            message: "Insertion complete!"
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not update task. ERROR: " + err
        });
    }
}