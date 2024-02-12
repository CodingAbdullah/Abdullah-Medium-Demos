import * as express from 'express';
import viewTasks from '../Controller/ViewTasksController';

// Setting up router
export const router = express.Router();
router.get("/view-tasks", viewTasks);