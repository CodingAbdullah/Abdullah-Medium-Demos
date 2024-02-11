import * as express from 'express';
import deleteTask from '../Controller/DeleteTaskController';

// Setting up router
export const router = express.Router();
router.post('/delete-task', deleteTask);

