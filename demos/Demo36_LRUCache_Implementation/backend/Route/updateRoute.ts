import * as express from 'express';
import updateTask from '../Controller/UpdateController';

// Setting up router
export const router = express.Router();
router.post("/update-task", updateTask);
