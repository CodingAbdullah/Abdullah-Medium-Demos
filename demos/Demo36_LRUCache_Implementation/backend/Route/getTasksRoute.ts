import * as express from 'express';
import getTasks from '../Controller/GetTasksController';

// Setting up router
export const router = express.Router();
router.get('/fetch-task-ids', getTasks);

