import { Request, Response } from 'express';
import fileReader from '../util/fileReader';

export default async function viewTasks(req: Request, res: Response){
    // Read file and return LRU data in reverse order
    try {
        const readFileData = await fileReader();
        res.status(200).json({
            LRUData: readFileData.reverse()
        });
    }
    catch(err) {
        res.status(400).json({
            message: "Could not read file. ERROR: " + err 
        });
    }
}