import React, { useState } from 'react';
import '../src/App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Header from './components/header.js/Header';
import Products from './components/products/Products';
import Footer from './components/footer/Footer';
import Cart from './components/cart/Cart';

function App() {
  const [category, setCategory] = useState("");
  const [cartItem, setCartItem] = useState([]);
  const [alertmessage, setAlert] = useState(null);
  const [countitem, setCountItem] = useState(0);

  function getCategory(cate) {
    setCategory(cate);
  }

  function showCart(item) {
    const newCart = [...cartItem, item];
    setCartItem(newCart);
    setCountItem(newCart.length); // Update the item count in Navbar
    setAlert(`${item.title} has been added to cart`);
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  function funcount(newitem) {
    setCountItem(newitem); // Update the item count in Navbar
  }

  return (
    <>
      {alertmessage && (
        <div style={{ zIndex: +1, position: "fixed", width: "100%" }} className="alert alert-primary" role="alert">
          {alertmessage}
        </div>
      )}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar cate={getCategory} count={countitem} />
                <Header />
                <Products categories={category} addToCart={showCart} />
                <Footer />
              </>
            }
          />
          <Route
            path="/cart"
            element={<Cart cartitem={cartItem} setCartitem={setCartItem} funcount={funcount} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
