import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [historyLogs, setHistoryLogs] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/all');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const toggleHistoryLogs = async () => {
    if (!showHistory) {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/hisLogs');
        setHistoryLogs(response.data.products);
      } catch (error) {
        console.error('Error fetching history logs:', error);
      }
    }
    setShowHistory(!showHistory);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-4xl m-2 p-8 space-y-6 bg-black bg-opacity-50 rounded-lg shadow-2xl backdrop-blur-sm">
        <h2 className="text-4xl font-semibold text-center text-white mb-8">Orders</h2>

        {orders.map((order) => (
          <div key={order.orderId} className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md mb-4">
            <div className="flex justify-between mb-4">
              <h3 className="text-2xl font-bold text-black">Order #{order.orderId}</h3>
              <p className="text-gray-700">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
            </div>

            <p className="text-lg text-gray-800"><strong>User ID:</strong> {order.userId}</p>
            <p className="text-lg text-gray-800"><strong>Address:</strong> {order.address}</p>
            <p className="text-lg text-gray-800"><strong>Total Amount:</strong> ${order.totalAmount}</p>

            <h4 className="text-xl font-semibold text-black mt-4">Products:</h4>
            <ul className="space-y-2">
              {order.products.map((product) => (
                <li key={product.productId} className="flex justify-between border-b pb-2">
                  <span className="text-gray-800">{product.productName} (x{product.quantity})</span>
                  <span className="text-gray-800">${(product.productPrice * product.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button
          onClick={toggleHistoryLogs}
          className="mt-4 bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          {showHistory ? 'Hide Order History' : 'View Order History'}
        </button>

        {showHistory && (
          <div className="mt-8 w-full bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h3 className="text-3xl font-semibold text-center text-black mb-4">History Logs</h3>
            {historyLogs.length > 0 ? (
              historyLogs.map((log) => (
                <div key={log.id} className="border-b border-gray-300 py-4">
                  <p className="text-lg text-gray-800"><strong>User ID:</strong> {log.user_id}</p>
                  <p className="text-lg text-gray-800"><strong>Order Date:</strong> {new Date(log.order_date).toLocaleDateString()}</p>
                  <p className="text-lg text-gray-800"><strong>Address:</strong> {log.address}</p>
                  <p className="text-lg text-gray-800"><strong>Total Amount:</strong> ${log.total_amount}</p>
                  <p className="text-lg text-gray-800"><strong>Product ID:</strong> {log.product_id}</p>
                  <p className="text-lg text-gray-800"><strong>Quantity:</strong> {log.quantity}</p>
                  <p className="text-lg text-gray-800"><strong>Deleted At:</strong> {new Date(log.deleted_at).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-800 text-center">No history logs available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
