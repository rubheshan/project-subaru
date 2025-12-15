import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import { carData } from '../data/TrialCarData';
import '../css/App.css';

function Home() {
  const sliderRef = useRef(null);

  // --- STATE FOR SLIDER PAUSE ---
  const [isPaused, setIsPaused] = useState(false);
  
  // --- STATE FOR VIDEO ON HOVER ---
  const [hoveredCarId, setHoveredCarId] = useState(null); 
  
  // NEW STATE: Controls the video's opacity transition
  const [isVideoFadingIn, setIsVideoFadingIn] = useState(false);

  // Duplicate data for the loop
  const sliderCars = [...carData, ...carData, ...carData, ...carData];

  useEffect(() => {
    const slider = sliderRef.current;
    
    const interval = setInterval(() => {
      if (slider && !isPaused) {
        slider.scrollLeft += 1; 

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
           slider.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]); 

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = window.innerWidth * 0.6; 

    if (slider) {
      if (direction === 'left') {
        slider.scrollLeft -= scrollAmount;
      } else {
        slider.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div>
      <MainBanner />

      <div className="slider-container">
        <h2>Our Lineup</h2>
        
        {/* Left Button */}
        <button 
          className="nav-btn prev-btn" 
          onClick={() => scroll('left')}
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          ←
        </button>

        <div 
          className="slider-track" 
          ref={sliderRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {sliderCars.map((car, index) => (
            <div 
              key={index} 
              className="slider-card"
              // --- UPDATED HOVER HANDLERS ---
              onMouseEnter={() => {
                setIsPaused(true);
                setHoveredCarId(car.id);
                // We set the fade-in state in the video's onLoadedData event (below)
              }}
              onMouseLeave={() => {
                setIsPaused(false);
                // 1. Immediately start fading out the video
                setIsVideoFadingIn(false); 
                // 2. After the fade-out duration (e.g., 300ms from CSS), unmount the video element
                // This prevents the video from trying to play while invisible.
                setTimeout(() => setHoveredCarId(null), 300); 
              }}
            >
              <div className="image-wrapper">
                {/* 1. Static Image: ALWAYS present as the base/placeholder */}
                <img src={car.image} alt={car.model} className="car-image-placeholder" />

                {/* 2. Video: Only mounted when hovered AND video data exists */}
                {hoveredCarId === car.id && car.video && (
                  <video
                    key={car.id} 
                    src={car.video}
                    // Apply 'faded-in' class based on state
                    className={`car-video ${isVideoFadingIn ? 'faded-in' : ''}`}
                    autoPlay
                    loop
                    muted
                    playsInline
                    // CRITICAL: Once the video metadata is loaded, signal to start the fade-in transition
                    onLoadedData={() => setIsVideoFadingIn(true)}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              
              <div className="card-details">
                <h3>{car.model}</h3>
                <p>Starting at {car.price}</p>
                <button>Build</button>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="nav-btn next-btn" 
          onClick={() => scroll('right')}
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          →
        </button>

      </div>
    </div>
  );
}

export default Home;