import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import { carData } from '../data/TrialCarData';
import '../css/App.css';

function Home() {
  const sliderRef = useRef(null);

  const [isPaused, setIsPaused] = useState(false);

  // Duplicate data for the loop
  const sliderCars = [...carData, ...carData, ...carData, ...carData];

  useEffect(() => {
    const slider = sliderRef.current;
    
    const interval = setInterval(() => {
      // 2. Only scroll if NOT paused
      if (slider && !isPaused) {
        slider.scrollLeft += 1; // The slow creep

        // Infinite loop logic
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
           slider.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]); // 3. Re-run this effect when 'isPaused' changes

  const scroll = (direction) => {
    const slider = sliderRef.current;
    // Calculate scroll distance (60% of screen width)
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
        
        {/* Left Button - Logic added here */}
        <button 
          className="nav-btn prev-btn" 
          onClick={() => scroll('left')}
          onMouseEnter={() => setIsPaused(true)}  // Pause when hovering button
          onMouseLeave={() => setIsPaused(false)} // Resume when leaving
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
            <div key={index} className="slider-card">
              <div className="image-wrapper">
                <img src={car.image} alt={car.model} />
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