import express from 'express';
import {createOrder} from "../controllers/orderController.js"
import {getAllOrders, getOrderHistory, getHisLogs } from "../controllers/orderController.js"
const router = express.Router();

router.post('/create', createOrder);

router.get('/all', getAllOrders);

router.get('/history', getOrderHistory);


router.get('/hisLogs', getHisLogs);


export default router;
