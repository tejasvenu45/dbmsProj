import db from '../config/db.js';

class Category {
  static async addCategory(name, description) {
    const sql = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    const [result] = await db.execute(sql, [name, description]);
    return result;
  }

  static async getCategoryByName(name) {
    const sql = 'SELECT * FROM categories WHERE name = ?';
    const [rows] = await db.execute(sql, [name]);
    return rows[0];
  }

  static async getCategoryById(id) {
    const sql = 'SELECT * FROM categories WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  static async updateCategory(id, name, description) {
    const sql = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    const [result] = await db.execute(sql, [name, description, id]);
    return result;
  }

  static async deleteCategory(id) {
    const sql = 'DELETE FROM categories WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result;
  }

  static async getAllCategories() {
    const sql = 'SELECT * FROM categories';
    const [rows] = await db.execute(sql);
    return rows;
  }
}

export default Category;
