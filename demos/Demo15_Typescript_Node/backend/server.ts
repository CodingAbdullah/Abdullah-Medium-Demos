import express, { Application } from 'express';
import dataFetchRoute from './Route/dataFetchRoute';
import cors, { CorsOptions } from 'cors';

// Using a custom type to represent Node Server
const app: Application = express();

app.listen(5000, () => 
    console.log("Listening to PORT 5000")
);

// Set up to enable CORS on select ports
let allowedOrigins = ['http://localhost:3000'];

// Set CORS options
let options: CorsOptions = {
    origin: allowedOrigins
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(options));
app.use('/', dataFetchRoute); // Adding Route to Node server