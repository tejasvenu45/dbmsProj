import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';
import { useNavigate } from 'react-router-dom';
import { MyContext } from "../MyContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const { isLoggedIn } = useContext(MyContext);
  const [premiumProducts, setPremiumProducts] = useState([]);

  const navigate = useNavigate();


  const fetchPremiumProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products/nested');
      setPremiumProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching premium products:', error);
    }
  };

  // useEffect(fetchPremiumProducts, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/all');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please login to add products to your cart');
      navigate('/login');
    } else {
      setCart((prevCart) => {
        const existingProduct = prevCart.find(item => item.id === product.id);
        if (existingProduct) {
          return prevCart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...product, quantity: 1 }];
        }
      });
      alert(`${product.name} added to cart!`);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setCart(cart.map(item =>
      item.id === productId ? { ...item, quantity: quantity } : item
    ));
  };

  const handleCreateOrder = async () => {
    if (!userId || !address) {
      alert("Please enter user ID and address to place an order.");
      return;
    }

    const orderData = {
      userId: parseInt(userId),
      address: address,
      products: cart.map(item => ({ productId: item.id, quantity: item.quantity })),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/orders/create', orderData);
      alert('Order created successfully!');
      setCart([]);
      setUserId('');
      setAddress('');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Products Section */}
      <div className="w-1/2 p-8 space-y-6 bg-black bg-opacity-50">
        <h2 className="text-4xl font-semibold text-white mb-8 text-center">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-lg text-center"
            >
              <h3 className="text-xl font-semibold text-black">{product.name}</h3>
              <p className="text-gray-700">{product.description}</p>
              <p className="text-lg font-bold text-black">${product.price}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full py-2 mt-4 text-white bg-black border border-white rounded-md hover:bg-gray-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={fetchPremiumProducts}
          className="w-full py-3 mt-8 text-white bg-black bg-opacity-50 border border-white rounded-md hover:bg-gray-700"
        >
          Show Premium Products
        </button>

        {/* Premium Products Section */}
        <div className="mt-8">
          {premiumProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {premiumProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-4 rounded-lg shadow-lg border border-gray-300 text-center"
                >
                  <h3 className="text-xl font-semibold text-black">{product.name}</h3>
                  <p className="text-gray-700">{product.description}</p>
                  <p className="text-lg font-bold text-black">${product.price}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart and Order Section */}
      <div className="w-1/2 p-8 space-y-6 bg-gray-900 bg-opacity-75 text-white">
        <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg">
              <div>
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p>${item.price} x {item.quantity}</p>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="w-16 px-2 py-1 bg-gray-700 text-white rounded-md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Order Form */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Order Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-lg mb-2">User ID</label>
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label className="block text-lg mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          <button
            onClick={handleCreateOrder}
            className="w-full py-3 mt-6 text-black bg-white rounded-md hover:bg-gray-200"
          >
            Create Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
