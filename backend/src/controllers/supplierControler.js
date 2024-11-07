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


