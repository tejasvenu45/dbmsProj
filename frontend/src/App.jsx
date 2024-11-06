import React from "react"
import Login from "./components/Login"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Register from "./components/Register"
import Home from "./components/Home";
import Orders from "./components/Orders"
import Products from "./components/Products"
import Hero from "./components/Hero";
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Hero />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
