import * as express from 'express';
import getTasks from '../Controller/GetTaskController';

// Setting up router
export const router = express.Router();
router.post('/delete-task', getTasks);

