import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import fileWriter from '../util/fileWriter';
import setLRUCache from '../util/setLRUCache';

export default async function updateTask(req: Request, res: Response){
    const { updateData } = JSON.parse(req.body.body);

    try {
        // Set LRU Cache and then proceed to delete entry
        // Re-write updated LRU Cache to database
        const fileData = await fileReader();
        let LRUCache = setLRUCache(fileData);

        // Update key with new description
        // Finally, write the LRU Cache back to database
        LRUCache.set(updateData.id, updateData.description);
        await fileWriter(JSON.stringify({ LRU: LRUCache }));
    }
    catch (err) {

    }
}