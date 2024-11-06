// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen md:min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-75 rounded-lg shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-center text-white">Login</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-2xl font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-transparent text-white border border-white rounded-md focus:ring focus:ring-white focus:outline-none"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-2xl font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-transparent text-white border border-white rounded-md focus:ring focus:ring-white focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 mt-4 text-black bg-white border border-white rounded-md hover:bg-gray-200 focus:ring focus:ring-white focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
