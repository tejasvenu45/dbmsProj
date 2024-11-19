import express from 'express';
import { addProduct, updateProduct, deleteProduct, getAllProducts, nestedGetAllProducts, getTotalProductPrice, getProductsView } from '../controllers/productController.js';

const router = express.Router();

router.post('/add', addProduct);           
router.put('/update/:id', updateProduct);   
router.delete('/delete/:id', deleteProduct);
router.get('/view',getProductsView);
router.get('/all',getAllProducts);
router.get('/nested', nestedGetAllProducts);
router.get('/aggFunc',getTotalProductPrice);
export default router;
