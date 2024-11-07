import db from '../config/db.js';

const createUserTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            phone VARCHAR(20),
            sports VARCHAR(255),
             isAdmin TINYINT(1) DEFAULT 0
        );
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log("Users table ready");
    });
};

createUserTable();

export default db;
