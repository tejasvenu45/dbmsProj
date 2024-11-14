import express from 'express';
import {createOrder} from "../controllers/orderController.js"
import {getAllOrders } from "../controllers/orderController.js"
const router = express.Router();

router.post('/create', createOrder);

router.get('/all', getAllOrders);

export default router;
