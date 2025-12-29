import React from 'react';
import '../css/MainBanner.css';

function MainBanner() {
  return (
    <div className="hero-container">
      {/* Use a high-quality placeholder image for now */}
      <img 
        src="/images/home_page/subaru lineup.jpg" 
        alt="Luxury Car" 
        className="hero-image"
      />
      <div className="hero-text">
        <h1>One Life.</h1>
        <h1>One Subaru.</h1>
        <p>Go Anywhere. Do Anything.</p>
        <button className="cta-button">Learn More</button>
      </div>
    </div>
  );
}

export default MainBanner;