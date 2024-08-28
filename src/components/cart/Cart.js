import React, { useEffect, useState } from "react";
import "../cart/cart.css";


function Cart({ cartitem, setCartitem, funcount }) {
  const [olditem, setnewitem] = useState(cartitem);
  const [price, setprice] = useState(0);
  const [pop, setpop] = useState(false);
  const [alertmessage, setAlert] = useState(null);

  useEffect(() => {
    setnewitem(cartitem);
    funcount(cartitem.length); // Update count in Navbar
    calculateTotalPrice(cartitem); // Calculate the total price when cartitem changes
  }, [cartitem, funcount]);

  function del(index) {
    const newitem = olditem.filter((_, i) => i !== index);
    setnewitem(newitem);
    setCartitem(newitem); // Update the cartitem state in the parent component
    funcount(newitem.length); // Update count with the new length
    calculateTotalPrice(newitem); // Recalculate total price
  }

  function calculateTotalPrice(cartitem) {
    const total = cartitem.reduce((sum, item) => sum + item.price, 0);
    setprice(total);
  }
  function popup() {
    setpop(!pop)
  }
  function onsubmit() {
    setpop(!pop)
    setAlert("thank for order");
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {olditem.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <ul>
          {olditem.map((item, index) => (
            <li key={index}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "50px" }}
              />
              <div className="delbox">
                <h3>{item.title}</h3>
                <p className="para">{item.description}</p>
                <p className="item-price">${item.price.toFixed(2)}</p> {/* Display item price */}
                <button
                  className="delete"
                  onClick={() => del(index)}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="footerbox">
        <div className="price">
          <h3>Total Price: ${price.toFixed(2)}</h3> {/* Display total price */}
        </div>
        <div>
          <button className="placeorder" onClick={popup}>Place Order</button> {/* Button to show form */}
        </div>
      </div>

      {pop && (
        <div className={'order-form'}>
          <button className="pop" onClick={popup}>X</button>
          <h3>Order Form</h3>
          <form >
            <label>
              Name:
              <input type="text" name="name" required />
            </label>
            <label>
              Email:
              <input type="email" name="email" required />
            </label>
            <label>
              Address:
              <input type="text" name="address" required />
            </label>
            <button type="submit" onClick={()=>onsubmit()} >Submit Order</button>
            <button type="button"  >Cancel</button>
          </form>
        </div>
      )}
       {alertmessage && (
        <div style={{ zIndex: +1, position: "fixed", width: "100%", top:0 }} className="alert alert-primary" role="alert">
          {alertmessage}
        </div>
      )}
    </div>
  );
}

export default Cart;
