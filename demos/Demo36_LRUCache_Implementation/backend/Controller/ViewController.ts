import { Request, Response } from 'express';
import fileReader from '../util/fileReader';

export default async function viewTasks(req: Request, res: Response){
    // Read file and return LRU data
    try {
        const readFileData = await fileReader();
        res.status(200).json({
            LRUData: readFileData
        });
    }
    catch(err) {
        res.status(400).json({
            message: "Could not read file. ERROR: " + err 
        });
    }
}