import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';

const Supplier = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/supplier/getSupply');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchTotalPrice = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/aggFunc');
        setTotalPrice(response.data.total_price);
      } catch (error) {
        console.error('Error fetching total price:', error);
      }
    };

    fetchProducts();
    fetchTotalPrice();
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >

      
      <div className="relative w-11/12 md:w-9/12 bg-black bg-opacity-90 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-4xl font-semibold text-center text-white">Supplier Products</h2>

   
        {totalPrice && (
          <div className="bg-gray-800 p-4 rounded-lg text-center text-white text-lg font-semibold shadow-lg">
            Total price in inventory: ${totalPrice}
          </div>
        )}

        {products.length === 0 ? (
          <p className="text-center text-lg text-gray-300">No products available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <h3 className="text-2xl font-semibold text-white">{product.name}</h3>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-lg font-bold text-white">${product.price}</p>
                <div className="mt-4 space-y-2 text-sm text-gray-400">
                  <p><strong>Supplier:</strong> {product.supplier_name}</p>
                  <p><strong>Phone:</strong> {product.supplier_phone}</p>
                  <p><strong>Address:</strong> {product.supplier_address}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Supplier;
