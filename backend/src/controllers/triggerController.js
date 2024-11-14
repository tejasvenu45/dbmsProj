import db from '../config/db.js';


export const getAllProductsLogs = async (req, res) => {
    const sql = 'select * from product_log';
    
    try {
        const [results] = await db.execute(sql);
        res.status(200).json({ products: results });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
