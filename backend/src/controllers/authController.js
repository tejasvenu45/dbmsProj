// src/controllers/authController.js
// src/controllers/authController.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const { name, email, password, phone, sports, isAdmin } = req.body;

        // Check if any required field is missing
        if (!name || !email || !password || !phone || !sports) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const sql = `INSERT INTO users (name, email, password, phone, sports, is_admin) VALUES (?, ?, ?, ?, ?, ?)`;
        db.query(sql, [name, email, hashedPassword, phone, sports, isAdmin ? 1 : 0], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ error: "Email already exists" });
                }
                console.error("Database error:", err); // Log the full error for debugging
                return res.status(500).json({ error: "Internal server error" });
            }
            res.status(201).json({ message: "User registered successfully" });
        });
    } catch (err) {
        console.error("Error in registration:", err); // Log the full error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = (req, res) => {
    const { email, password } = req.body;

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).send("Error logging in");
        if (results.length === 0) return res.status(400).send("User not found");

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).send("Error comparing passwords");
            if (!isMatch) return res.status(400).send("Incorrect password");

            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.status(200).json({ message: "Logged in successfully", token });
        });
    });
};
