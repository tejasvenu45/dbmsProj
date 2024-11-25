CREATE DATABASE IF NOT EXISTS Sports_db;
USE Sports_db;
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(255),
    supply_category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    sports VARCHAR(50),
    is_admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    supplier_id INT,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);
CREATE TABLE product_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_price DECIMAL(10, 2),
    new_price DECIMAL(10, 2),
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    address VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
CREATE TABLE order_products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
CREATE TABLE order_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    address VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10,2) DEFAULT 0.00,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);
DELIMITER //

CREATE TRIGGER product_update_log 
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    INSERT INTO product_log (product_id, action, old_price, new_price, modified_at)
    VALUES (OLD.id, 'update', OLD.price, NEW.price, NOW());
END //

DELIMITER ;
DELIMITER //

CREATE TRIGGER before_product_delete
BEFORE DELETE ON products
FOR EACH ROW
BEGIN
    INSERT INTO order_history (user_id, order_date, address, total_amount, product_id, quantity)
    SELECT o.user_id, o.order_date, o.address, o.total_amount, op.product_id, op.quantity
    FROM orders o
    INNER JOIN order_products op ON o.id = op.order_id
    WHERE op.product_id = OLD.id;
END //

DELIMITER ;
DELIMITER //

CREATE TRIGGER after_product_delete
AFTER DELETE ON products
FOR EACH ROW
BEGIN
    INSERT INTO order_history (user_id, order_date, address, total_amount, product_id, quantity)
    SELECT o.user_id, o.order_date, o.address, o.total_amount, op.product_id, op.quantity
    FROM orders o
    INNER JOIN order_products op ON o.id = op.order_id
    WHERE op.product_id = OLD.id;
END //

DELIMITER ;
DELIMITER //

CREATE PROCEDURE AddProduct(
    IN p_name VARCHAR(100),
    IN p_price DECIMAL(10, 2),
    IN p_description TEXT,
    IN p_supplier_id INT
)
BEGIN
    INSERT INTO products (name, price, description, supplier_id)
    VALUES (p_name, p_price, p_description, p_supplier_id);
END //

DELIMITER ;
CREATE VIEW ProductView AS
SELECT 
    products.id AS product_id,
    products.name AS product_name,
    products.price,
    products.description,
    suppliers.name AS supplier_name
FROM 
    products
LEFT JOIN 
    suppliers ON products.supplier_id = suppliers.id;
SHOW TABLES;
