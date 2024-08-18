
import './App.css';
import Navbar from './components/Navbar';
import React from 'react';
import {Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Shop } from './pages/Shop/shop';
import { Cart } from './pages/Cart/cart';
import { ShopContextProvider } from './context/shop-context';
import { useState } from 'react'
import LoginModal from './modals/LoginModal'
import SignupModal from './modals/SignupModal'
import { AboutUs } from './pages/AboutUs';


export default function App() {
  const [signUpModal,setSignUpModal] = useState(false);
  const [loginModal,setLoginModal] = useState(false);

  return (
    <div className="App">
      <ShopContextProvider >
      <Router>
      <Navbar setSignUpModal={setSignUpModal} setLoginModal={setLoginModal} className="navbar"/>
      <LoginModal loginModal={loginModal} setSignUpModal={setSignUpModal} setLoginModal={setLoginModal}/>
      <SignupModal signUpModal={signUpModal} setSignUpModal={setSignUpModal} setLoginModal={setLoginModal}/>
      <main>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/about-us" element={<AboutUs/>}/>
      </Routes>
      </main>
      </Router>
      </ShopContextProvider>
    </div>

  );

 };
