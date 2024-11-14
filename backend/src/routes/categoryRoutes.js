import express from 'express';
import { addCategory, updateCategory, deleteCategory, getAllCategories } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/add', addCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);
router.get('/', getAllCategories);

export default router;
