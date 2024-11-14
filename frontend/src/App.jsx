import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Supplier from "./components/Supplier";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Hero from "./components/Hero";
import AdminProducts from "./components/AdminProducts";
import { MyContext } from "./MyContext";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);
  return (
    <MyContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin, userId, setUserId }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="supplier" element={<Supplier />} />

            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
            <Route path="adminProd" element={<AdminProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MyContext.Provider>
  );
}

export default App;
