import * as express from 'express';
import insertTask from '../Controller/InsertTaskController';

// Setting up router
export const router = express.Router();
router.post("/insert-task", insertTask);