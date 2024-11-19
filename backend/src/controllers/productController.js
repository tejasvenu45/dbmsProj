import db from '../config/db.js';

export const addProduct = async (req, res) => {
    const { name, price, description, supplier_id } = req.body;
    const sql = 'CALL AddProduct(?, ?, ?, ?)';

    try {
        const [result] = await db.execute(sql, [name, price, description, supplier_id]);
        res.status(201).json({ message: 'Product added successfully', productId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const sql = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';

    try {
        const [result] = await db.execute(sql, [name, price, description, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE id = ?';

    try {
        const [result] = await db.execute(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    const sql = 'SELECT * FROM products';

    try {
        const [results] = await db.execute(sql);
        res.status(200).json({ products: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const nestedGetAllProducts = async (req, res) => {
    const sql = `
    SELECT * FROM products 
    WHERE price > (
        SELECT AVG(price) 
        FROM products 
    )
`;
    try {
        const [results] = await db.execute(sql);
        res.status(200).json({ products: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getTotalProductPrice = async (req, res) => {
    const sql = `
    SELECT SUM(price) AS total_price FROM products
    `;
    try {
        const [results] = await db.execute(sql);
        res.status(200).json({ total_price: results[0].total_price });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const getProductsView = async (req, res) => {
    const sql = `
        SELECT * FROM ProductView
    `;
    try {
        const [results] = await db.execute(sql);
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


