import express, { Router } from 'express';
import DataController from '../Controller/dataFetchController';

// Incorporating Router type from Express
const router: Router = express.Router();

// Routers for different coin related data
router.get("/bitcoin-data", DataController.bitcoinDataFetch);
router.post("/altcoin-data", DataController.altCoinDataFetch);

export default router;