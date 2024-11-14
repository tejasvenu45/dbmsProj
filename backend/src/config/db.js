// src/config/db.js
import mysql from 'mysql2/promise';  // Import mysql2 with promise wrapper
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

console.log("Connected to MySQL database");

export default db;
