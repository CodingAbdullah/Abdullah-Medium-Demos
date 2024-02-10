import * as express from 'express';
import deleteTask from '../Controller/DeleteController';

// Setting up router
export const router = express.Router();
router.post('/delete-task', deleteTask);

