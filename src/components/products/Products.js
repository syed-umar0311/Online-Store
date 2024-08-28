import React, { useEffect, useState } from "react";
import "../products/product.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Products({ categories, addToCart }) {
  const [data, setData] = useState([]);
  const [view, setview] = useState(false)
  const [select, setselect] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryPath = categories ? `/${categories}` : "";
        const response = await axios.get(
          `https://fakestoreapi.com/products${categoryPath}`
        );

        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [categories]);
  function handleview(item) {
    setview(!view)
    setselect(item)
  }

  return (<>
    <div className="products">
      {
      data.map((item) => {
        const shortDescription =
          item.description.length > 85
            ? item.description.substring(0, 85) + "..."
            : item.description;
        const shorttitle =
          item.title.length > 30
            ? item.title.substring(0, 30) + "..."
            : item.title;
        const price = "US " + item.price + " $";

        return (
          <div className="card" key={item.id}>
            <img
              src={item.image}
              style={{ objectFit: "contain" }}
              alt=""
              className="card-image"
            />
            <h2 className="card-title">{shorttitle}</h2>
            <h4 className="card-price">{price}</h4>
            <p className="product-para">{shortDescription}</p>

            <button className="card-button" onClick={() => addToCart(item)}>
              Add To Cart
            </button>
            <button className="card-button" onClick={() => handleview(item)}>
              View
            </button>
          </div>
        );
      })}
    </div>
    {
      view && select && (
        <div className="modal">
        <div className="modal-content">
       <button className="close-button" onClick={()=>setview(!view)}>X</button>
          <img src={select.image} alt={select.title} />
          <h2>{select.title}</h2>
          <p>{select.description}</p>
          <h4>{select.price} $ </h4>
         <Link to="/cart" style={{backgroundColor:"transparent"}}> <button className="card-button"  onClick={()=>addToCart(select)}>
              BUY NOW!
            </button></Link>
        </div>
      </div>

      )
    }
    </>    
  );
}

export default Products;
