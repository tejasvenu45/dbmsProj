import { getAllProductsLogs } from "../controllers/triggerController.js";

import express from 'express';
const router = express.Router();

router.get('/', getAllProductsLogs);




export default router;
