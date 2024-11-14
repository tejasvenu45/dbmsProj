// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRouter from "./routes/productRoutes.js"
import supplierRouter from "./routes/supplierRoutes.js"
import categoryRouter from "./routes/categoryRoutes.js"
import orderRouter from "./routes/orderRouters.js"
import logrouter from "./routes/getAllproductLogsroutes.js"

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);

app.use('/api/supplier',supplierRouter);
app.use('/api/category',categoryRouter);

app.use('/api/logRouter',logrouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
