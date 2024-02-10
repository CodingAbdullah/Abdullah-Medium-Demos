import { Request, Response } from 'express';
import fileReader from '../util/fileReader';
import fileWriter from '../util/fileWriter';
import setLRUCache from '../util/setLRUCache';

// LRU data is within the database and is stored as { LRU: [] }
export default async function insertTask(req: Request, res: Response){
    const { insertData } = JSON.parse(req.body.body);

    try {
        // Fetch file information and set the LRU Cache
        const readFileResponse = await fileReader();
        let LRUCache = setLRUCache(readFileResponse);

        // Add new key-value pair to the LRU cache
        // LRU Cache takes care of everything
        // Write data back to database
        LRUCache.set(insertData.id, insertData.description);
        await fileWriter(JSON.stringify({ LRU: LRUCache }));
    }
    catch (err) {
        res.status(400).json({
            message: "Could not insert data. ERROR: " + err
        });
    }   
}