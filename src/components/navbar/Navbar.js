import React, { useState, useEffect, useMemo } from "react";
import "../navbar/nav.css";
import { Link } from "react-router-dom";
import axios from "axios";


function Navbar({ cate, count }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setData(response.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(data)

  // Filter items based on the search input
  const filteredData = useMemo(() => {
    if (search.length > 2) {
      return data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    return []; // Return empty array if search length is not more than 3
  }, [search, data]);

  const handleCategoryClick = (category) => (e) => {
    e.preventDefault();
    cate(category);
  };
  

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">MyWebsite</a>
        </div>
        <div className="search">
          <input
            type="search"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ul className="navbar-links">
          <Link to="/cart">
            <li>
              <a href="/">Check Cart</a>
              <span
                style={{ marginLeft: "5px" }}
                className="badge text-bg-secondary"
              >
                {count}
              </span>
            </li>
          </Link>
          <li>
            <a href="/" onClick={handleCategoryClick("")}>
            All
            </a>
          </li>
          <li>
            <a href="/" onClick={handleCategoryClick("/category/electronics")}>
              Electronics
            </a>
          </li>
          <li>
            <a href="/" onClick={handleCategoryClick("/category/jewelery")}>
              Jewelery
            </a>
          </li>
          <li>
            <a href="/" onClick={handleCategoryClick("/category/men's clothing")}>
              Men's Clothing
            </a>
          </li>
          <li>
            <a href="/" onClick={handleCategoryClick("/category/women's clothing")}>
              Women's Clothing
            </a>
          </li>
        </ul>
      <div className="search-results">
      <ul className="item-list">
        {filteredData.length > 0 && (
          filteredData.map((item, index) => (
            <li  key={index} className="item">
              {item.title}
            </li>
          ))
        ) }
      </ul>
    </div>
</nav>
    </>
  );
}

export default Navbar;
