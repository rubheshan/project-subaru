import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';

import '../css/App.css';

const API_URL = 'http://localhost:8080/backend/products';

function Home() {
  const sliderRef = useRef(null);

  // --- STATE MANAGEMENT ---
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Slider & Video State
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCarId, setHoveredCarId] = useState(null); 
  const [isVideoFadingIn, setIsVideoFadingIn] = useState(false);

  // --- FETCH DATA FROM BACKEND ---
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setCarData(data);
        setError(null);
      } catch (e) {
        console.error("Error fetching car data:", e);
        setError("Unable to load the vehicle lineup.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  const sliderCars = carData.length > 0 
    ? [...carData, ...carData, ...carData, ...carData]
    : []; 

  useEffect(() => {
    const slider = sliderRef.current;
    
    const interval = setInterval(() => {
      if (slider && !isPaused && carData.length > 0) {
        slider.scrollLeft += 2; 

        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) {
           slider.scrollLeft = 0;
        }
      }
    }, 8); 

    return () => clearInterval(interval);
  }, [isPaused, carData.length]); 

  // --- MANUAL NAVIGATION ---
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = window.innerWidth * 0.4; // Scroll 40% of screen width

    if (slider) {
      if (direction === 'left') {
        slider.scrollLeft -= scrollAmount;
      } else {
        slider.scrollLeft += scrollAmount;
      }
    }
  };

  // --- RENDER HELPERS ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(price);
  };

  // --- LOADING / ERROR STATES ---
  if (isLoading) {
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ border: 'none', color: '#666' }}>LOADING EXPERIENCE...</h2>
        </div>
      </div>
    );
  }

  if (error){
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ padding: '50px' }}>
          <h2>Temporarily Unavailable</h2>
          <p style={{ color: '#888' }}>Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div>
      <MainBanner />

      <div className="models-section fade-in-up">
        <div className="slider-container">
          <h2>Our Lineup</h2>
          
          {/* Navigation Buttons */}
          <button 
            className="nav-btn prev-btn" 
            onClick={() => scroll('left')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            ←
          </button>

          <button 
            className="nav-btn next-btn" 
            onClick={() => scroll('right')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            →
          </button>

          {/* Slider Track */}
          <div 
            className="slider-track" 
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {sliderCars.map((car, index) => (
              <div 
                key={`${car.id}-${index}`} // Unique key for duplicated items
                className="slider-card"
                onMouseEnter={() => {
                  setIsPaused(true);
                  setHoveredCarId(car.id);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                  setIsVideoFadingIn(false); 
                  setTimeout(() => setHoveredCarId(null), 300); // Wait for fade out
                }}
              >
                <div className="image-wrapper">
                  {/* Static Image (Base Layer) */}
                  <img src={car.imageUrl} alt={car.modelName} className="car-image-placeholder" />

                  {/* Video (Overlay Layer - Only renders on hover) */}
                  {hoveredCarId === car.id && car.videoUrl && (
                    <video
                      src={car.videoUrl}
                      className={`car-video ${isVideoFadingIn ? 'faded-in' : ''}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedData={() => setIsVideoFadingIn(true)}
                    >
                    </video>
                  )}
                </div>
                
                <div className="card-details">
                  <h3>{car.modelName}</h3>
                  <p>Starting at {formatPrice(car.price)}</p>
                  <button>Configure</button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Home;