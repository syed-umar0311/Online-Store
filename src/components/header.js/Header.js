import React from 'react';
import '../header.js/header.css'

import { useEffect } from 'react';
import image1 from '../images/image1.jpg'; 
import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
function Header() {
  useEffect(() => {
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    const showNextSlide = () => {
      carouselItems[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % carouselItems.length;
      carouselItems[currentIndex].classList.add('active');
    };

    const interval = setInterval(showNextSlide, 1000); // Change slide every 3 seconds

    return () => {
      clearInterval(interval); // Clean up interval on component unmount
    };
  }, []);
  return (
    <div>
      <div id="carouselExample" className="carousel slide bg-dark" >
        <div className="carousel-inner" style={{ padding: "15px"}}>
          <div className='text'><h1>E-COMMERCE STORE</h1></div>
          <div className="carousel-item active">
            <img 
              src={image1} 
              className="d-block w-100" 
              style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} 
              alt="Slide 1" 
            />
          </div>
          <div className="carousel-item">
            <img 
              src={image2} 
              className="d-block w-100" 
              style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} 
              alt="Slide 2" 
            />
          </div>
          <div className="carousel-item">
            <img 
              src={image3} 
              className="d-block w-100" 
              style={{ height: '500px', objectFit: 'cover', borderRadius: '15px' }} 
              alt="Slide 3" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
