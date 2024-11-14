import db from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register new user
export const register = async (req, res) => {
    try {
        const { name, email, password, phone, sports, isAdmin } = req.body;

        // Check for required fields
        if (!name || !email || !password || !phone || !sports) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // SQL query for inserting new user
        const sql = `INSERT INTO users (name, email, password, phone, sports, isAdmin) VALUES (?, ?, ?, ?, ?, ?)`;
        
        // Execute query using async/await
        try {
            await db.execute(sql, [name, email, hashedPassword, phone, sports, isAdmin ? 1 : 0]);
            res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: "Email already exists" });
            }
            console.error("Database error:", err);
            return res.status(500).json({ error: "Internal server error" });
        }
    } catch (err) {
        console.error("Error in registration:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    // SQL query to find user by email
    const sql = `SELECT * FROM users WHERE email = ?`;
    try {
        const [results] = await db.execute(sql, [email]);

        // Check if user exists
        if (results.length === 0) return res.status(400).json({ error: "User not found" });

        const user = results[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

        // Generate JWT token
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        // Send response
        res.status(200).json({ user, token });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    const sql = `SELECT id, name, email, phone, sports, isAdmin FROM users`;
    try {
        const [results] = await db.execute(sql);
        res.status(200).json(results);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
