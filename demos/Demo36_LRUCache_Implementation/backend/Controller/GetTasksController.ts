import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import setLRUCache from '../util/setLRUCache';

// Fetch all task IDs from the LRU Cache
export default async function getTasks(req: Request, res: Response){
    try {
        const fileData = await fileReader();
        let keysList = setLRUCache(fileData).getLRUCache();

        // Return the LRU Cache containing only the keys
        res.status(200).json({
            LRUData: keysList
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Could not fetch tasks"
        });
    }
}