import * as express from 'express';
import updateTask from '../Controller/UpdateTaskController';

// Setting up router
export const router = express.Router();
router.post("/update-task", updateTask);
