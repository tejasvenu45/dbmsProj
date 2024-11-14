import db from '../config/db.js';

export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const result = await db.execute('SELECT * FROM categories WHERE name = ?', [name]);
    console.log(result);  // Log to check if result is an array

    if (Array.isArray(result) && result.length > 0 && result[0].length > 0) {
      return res.status(400).json({ error: 'Category name must be unique' });
    }

    const [insertResult] = await db.execute('INSERT INTO categories (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ message: 'Category added successfully', categoryId: insertResult.insertId });
  } catch (error) {
    console.error(error);  // Log the error to get more insight
    res.status(500).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = await db.execute('UPDATE categories SET name = ?, description = ? WHERE id = ?', [name, description, id]);
    console.log(result);  // Log to check if result is in the expected format

    if (!Array.isArray(result) || result.length === 0 || result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error(error);  // Log the error to get more insight
    res.status(500).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const countResult = await db.execute('SELECT COUNT(*) AS count FROM products WHERE category_id = ?', [id]);
    console.log(countResult);  // Log to check if countResult is in the expected format

    if (!Array.isArray(countResult) || countResult.length === 0 || countResult[0][0].count > 0) {
      return res.status(400).json({ error: 'Cannot delete category with associated products' });
    }

    const [deleteResult] = await db.execute('DELETE FROM categories WHERE id = ?', [id]);
    if (deleteResult.affectedRows === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);  // Log the error to get more insight
    res.status(500).json({ error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM categories');
    console.log(result);  // Log to check if result is in the expected format

    if (!Array.isArray(result) || result.length === 0) {
      return res.status(404).json({ error: 'No categories found' });
    }

    const [categories] = result;
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);  // Log the error to get more insight
    res.status(500).json({ error: error.message });
  }
};
