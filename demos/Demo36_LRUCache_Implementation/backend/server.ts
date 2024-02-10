import express from 'express';
import cors from 'cors';
import { router as deleteRouter } from './Route/deleteRoute';
import { router as insertRouter } from './Route/insertRoute';
import { router as viewRouter } from './Route/viewRoute';
import { router as updateRouter } from './Route/updateRoute';

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