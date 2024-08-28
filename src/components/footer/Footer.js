// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import facebook from '../images/facebook.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="icon-container">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebook} className="icon_1" alt='' />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitter} className="icon_2" alt='' />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagram} className="icon_3" alt='' />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
