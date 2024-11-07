import db from '../config/db.js';

export const addProduct = (req, res) => {
    const { name, price, description, supplier_id } = req.body;
    const sql = 'INSERT INTO products (name, price, description, supplier_id) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, price, description, supplier_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    });
};

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
    db.query(sql, [name, price, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product updated successfully' });
    });
};

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Product deleted successfully' });
    });
};

export const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ products: results });
    });
};