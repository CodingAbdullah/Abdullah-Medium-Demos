import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import setLRUCache from '../util/setLRUCache';
import fileWriter from '../util/fileWriter';

export default async function deleteTask(req: Request, res: Response){
    const { deleteData } = JSON.parse(req.body.body);

    try {
        // Set LRU Cache and then proceed to delete entry
        // Re-write updated LRU Cache to database
        const fileData = await fileReader();
        let LRUCache = setLRUCache(fileData);

        // Key, if exists, deleted from LRU Cache
        // Finally, write the LRU Cache back to database
        LRUCache.delete(deleteData.id);
        await fileWriter(JSON.stringify({ LRU: LRUCache }));
    }
    catch (err) {
        res.status(400).json({
            message: "Could not read file. ERROR: " + err
        });
    }
}