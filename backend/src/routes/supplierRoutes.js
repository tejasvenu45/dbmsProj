import express from 'express';
import { addSupplier, getAllSuppliers, getAllProductsWithSupplier} from '../controllers/supplierControler.js';

const router = express.Router();

router.post('/add', addSupplier);

router.get('/all',getAllSuppliers);

router.get('/getSupply', getAllProductsWithSupplier)
export default router;


