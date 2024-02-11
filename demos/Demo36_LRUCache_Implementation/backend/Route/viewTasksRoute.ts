import * as express from 'express';
import viewTasks from '../Controller/ViewController';

// Setting up router
export const router = express.Router();
router.get("/view-tasks", viewTasks);