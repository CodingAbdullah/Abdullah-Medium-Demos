import express from 'express';
import cors from 'cors';
import { router as deleteRouter } from './Route/deleteTaskRoute';
import { router as insertRouter } from './Route/insertTaskRoute';
import { router as getRouter } from './Route/getTasksRoute';
import { router as viewRouter } from './Route/viewTasksRoute';
import { router as updateRouter } from './Route/updateTaskRoute';

// Spinning up Node server
const app = express();

app.listen(5000, () => {
    console.log("Listening to PORT: " + 5000);
});

// Setting Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Adding Routes
app.use("/", deleteRouter);
app.use("/", insertRouter);
app.use("/", updateRouter);
app.use("/", viewRouter);
app.use("/", getRouter);