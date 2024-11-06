// Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>

        <div className="flex flex-wrap justify-between text-center sm:text-left">
          <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Address</h3>
            <p>123 Sports Avenue</p>
            <p>Cityville, Country 12345</p>
          </div>

          <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Phone</h3>
            <p>(123) 456-7890</p>
            <p>Mon - Fri, 9:00am - 6:00pm</p>
          </div>

          <div className="w-full sm:w-1/3">
            <h3 className="text-xl font-semibold mb-3">Email</h3>
            <p>info@sportsstore.com</p>
            <p>We reply within 24 hours</p>
          </div>
        </div>

        <div className="border-t border-white opacity-20 my-8"></div>

        <div className="text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Sports Store. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
