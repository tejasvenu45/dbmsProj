import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);           
router.put('/update/:id', updateProduct);   
router.delete('/delete/:id', deleteProduct);
router.get('/all',getAllProducts);
export default router;
