// Home.jsx
import React from 'react';
import { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';
import { MyContext } from "../MyContext";
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoggedIn,setIsLoggedIn,setIsAdmin,setUserId } = useContext(MyContext);
  const logout = ()=>{
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserId(null);
    navigate('/');
  }
  return (
    <div className="min-h-screen bg-white text-black">

      <nav className="bg-black text-white shadow-lg">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">
            <Link to="/" className="hover:text-gray-300">MyApp</Link>
          </h1>

          <ul className="hidden md:flex space-x-6 text-lg">
            <li>
              <Link to="/" className="hover:text-gray-300">HOME</Link>
            </li>




            {!isLoggedIn && (
              <div className='flex flex-row gap-4'>
                <li>
                  <Link to="/login" className="hover:text-gray-300">LOGIN</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-gray-300">REGISTER</Link>
                </li>
              </div>
            )}

            {isAdmin && (
              <div className='flex flex-row gap-4'>
                <li>
                  <Link to="/orders" className="hover:text-gray-300">ORDERS</Link>
                </li>
                <li>
                  <Link to="/adminProd" className="hover:text-gray-300">PRODUCT MANAGEMENT</Link>
                </li>
                <li>
                  <Link to="/supplier" className="hover:text-gray-300">SUPPLIER</Link>
                </li>
              </div>
            )}

            <li>
              <Link to="/products" className="hover:text-gray-300">PRODUCTS</Link>
            </li>
            
            {isLoggedIn && (
              <div className='flex flex-row gap-4'>
                <li>
              <button onClick={logout}> LOGOUT</button>
            </li>
              </div>
            )}
          </ul>

          <button className="md:hidden focus:outline-none text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        <div className="md:hidden">
          <ul className="p-4 bg-black text-white space-y-2">
            <li>
              <Link to="/login" className="block hover:text-gray-300">Login</Link>
            </li>
            <li>
              <Link to="/register" className="block hover:text-gray-300">Register</Link>
            </li>

            <li>
              <Link to="/orders" className="block hover:text-gray-300">Orders</Link>
            </li>
            <li>
              <Link to="/products" className="block hover:text-gray-300">Products</Link>
            </li>
          </ul>
        </div>
      </nav>

      <main >

        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
