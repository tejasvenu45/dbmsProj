import db from '../config/db.js';

export const addSupplier = (req, res) => {
    const { name, phone, address, supply_category } = req.body;
    const sql = 'INSERT INTO suppliers (name, phone, address, supply_category) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, phone, address, supply_category], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Supplier added successfully', supplierId: result.insertId });
    });
};

export const getAllSuppliers = (req, res) => {
    const sql = 'SELECT * FROM suppliers';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ suppliers: results });
    });
};

export const getAllProductsWithSupplier = async (req, res) => {
    const sql = `
        SELECT p.id, p.name, p.price, p.description, 
               s.name AS supplier_name, s.phone AS supplier_phone, s.address AS supplier_address
        FROM products p
        JOIN suppliers s ON p.supplier_id = s.id;
    `;

    try {
        // Execute the SQL query
        const [results] = await db.execute(sql);
        
        // Send the result as a JSON response
        res.status(200).json({ products: results });
    } catch (err) {
        // Handle any errors that occur during the query
        res.status(500).json({ error: err.message });
    }
};


