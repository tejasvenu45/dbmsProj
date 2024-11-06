// Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/bg.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [sports, setSports] = useState('');
  const [isAdmin, setIsAdmin] = useState(0); // New state for admin checkbox
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
        sports,
        isAdmin, // Include isAdmin in the registration data
      });
      console.log('Registration successful:', response.data);
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md p-8 space-y-6 bg-black bg-opacity-75 rounded-lg shadow-2xl backdrop-blur-sm">
        <h2 className="text-3xl font-semibold text-center text-white">
          Register {isAdmin ? 'as Admin' : 'as End User'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-2xl font-medium text-white">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-transparent text-white border border-white rounded-md focus:ring focus:ring-white focus:outline-none"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-2xl font-medium text-white">Email</label>
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

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-2xl font-medium text-white">Password</label>
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

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-2xl font-medium text-white">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-transparent text-white border border-white rounded-md focus:ring focus:ring-white focus:outline-none"
              placeholder="1234567890"
            />
          </div>

          {/* Sports */}
          <div>
            <label htmlFor="sports" className="block text-2xl font-medium text-white">Sports</label>
            <input
              type="text"
              id="sports"
              name="sports"
              value={sports}
              onChange={(e) => setSports(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 bg-transparent text-white border border-white rounded-md focus:ring focus:ring-white focus:outline-none"
              placeholder="cricket, football"
            />
          </div>

          {/* Admin Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="admin"
              name="admin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(1)}
              className="h-4 w-4 text-white border-gray-300 rounded focus:ring focus:ring-white focus:outline-none"
            />
            <label htmlFor="admin" className="ml-2 text-white text-xl">Register as Admin</label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-black bg-white border border-white rounded-md hover:bg-gray-200 focus:ring focus:ring-white focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
