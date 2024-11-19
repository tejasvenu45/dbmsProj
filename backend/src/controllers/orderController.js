import db from '../config/db.js';

export const createOrder = async (req, res) => {
  const { userId, products, address } = req.body;
  const orderDate = new Date(); // Current date and time

  const connection = await db.getConnection(); // Get a connection from the pool
  try {
    // Start a transaction
    await connection.beginTransaction();

    // Check if user exists
    const [userCheck] = await connection.execute('SELECT id FROM users WHERE id = ?', [userId]);
    if (userCheck.length === 0) {
      await connection.rollback();  // Roll back transaction if user not found
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate total amount by summing up the price * quantity for each product
    let totalAmount = 0;
    for (const product of products) {
      const { productId, quantity } = product;

      // Check if product exists and get its price
      const [productCheck] = await connection.execute('SELECT id, price FROM products WHERE id = ?', [productId]);
      if (productCheck.length === 0) {
        await connection.rollback();  // Roll back transaction if a product is not found
        return res.status(404).json({ error: `Product with ID ${productId} not found` });
      }

      // Add the product's total price (price * quantity) to the total amount
      totalAmount += productCheck[0].price * quantity;
    }

    // Insert order record with total_amount
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (user_id, order_date, address, total_amount) VALUES (?, ?, ?, ?)',
      [userId, orderDate, address, totalAmount]
    );
    const orderId = orderResult.insertId;

    // Insert each product into order_products table
    for (const product of products) {
      const { productId, quantity } = product;

      // Insert order-product relation
      await connection.execute(
        'INSERT INTO order_products (order_id, product_id, quantity) VALUES (?, ?, ?)',
        [orderId, productId, quantity]
      );
    }

    // Commit the transaction
    await connection.commit();

    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    await connection.rollback();  // Roll back in case of any error
    console.error(error);
    res.status(500).json({ error: 'Failed to create order' });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
};


export const getAllOrders = async (req, res) => {
  const connection = await db.getConnection(); // Get a connection from the pool
  try {
    // Query to fetch all orders along with user, product, and order details
    const [orders] = await connection.execute(`
      SELECT 
        o.id AS orderId,
        o.user_id AS userId,
        o.order_date AS orderDate,
        o.address AS address,
        o.total_amount AS totalAmount,
        p.id AS productId,
        p.name AS productName,
        p.price AS productPrice,
        op.quantity AS productQuantity
      FROM orders o
      JOIN order_products op ON o.id = op.order_id
      JOIN products p ON op.product_id = p.id
      ORDER BY o.order_date DESC
    `);

    // Group the orders by orderId to structure them with product details nested within each order
    const ordersById = {};
    orders.forEach(order => {
      const { orderId, userId, orderDate, address, totalAmount, productId, productName, productPrice, productQuantity } = order;

      if (!ordersById[orderId]) {
        ordersById[orderId] = {
          orderId,
          userId,
          orderDate,
          address,
          totalAmount,
          products: []
        };
      }

      ordersById[orderId].products.push({
        productId,
        productName,
        productPrice,
        quantity: productQuantity
      });
    });

    // Convert the object into an array of orders for easier JSON formatting
    const allOrders = Object.values(ordersById);

    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  } finally {
    connection.release();  // Release the connection back to the pool
  }
};


export const getOrderHistory = async (req, res) => {
  const sql = 'SELECT * FROM order_history';

  try {
      const [results] = await db.execute(sql);
      res.status(200).json({ products: results });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

export const getHisLogs = async (req, res) => {
  const sql = 'SELECT * FROM history_logs';

  try {
      const [results] = await db.execute(sql);
      res.status(200).json({ products: results });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};
