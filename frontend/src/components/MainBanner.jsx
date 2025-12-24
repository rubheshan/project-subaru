import React from 'react';
import '../css/MainBanner.css';

function MainBanner() {
  return (
    <div className="hero-container">
      {/* Use a high-quality placeholder image for now */}
      <img 
        src="https://images.unsplash.com/photo-1503376763036-066120622c74?auto=format&fit=crop&w=1920&q=80" 
        alt="Luxury Car" 
        className="hero-image"
      />
      <div className="hero-text">
        <h1>One Life.</h1>
        <h1>One Subaru.</h1>
        <p>Go Anywhere. Do Anything.</p>
        <button className="cta-button">Join Us Now</button>
      </div>
    </div>
  );
}

export default MainBanner;