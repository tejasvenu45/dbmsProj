// src/models/supplierModel.js
import db from '../config/db.js';

const createSupplierTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS suppliers (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            phone VARCHAR(20),
            address VARCHAR(255),
            supply_category VARCHAR(100),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Suppliers table ready");
    });
};

const createProductTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS products (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            description TEXT,
            supplier_id INT,
            FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
        );
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Products table ready");
    });
};

// Initialize tables
createSupplierTable();
createProductTable();

export default db;
