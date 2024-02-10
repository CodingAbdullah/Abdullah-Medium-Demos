import * as express from 'express';
import insertTask from '../Controller/InsertController';

// Setting up router
export const router = express.Router();
router.post("/insert-task", insertTask);