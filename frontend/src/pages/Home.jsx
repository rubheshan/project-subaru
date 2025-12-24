import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import { Link } from 'react-router-dom';

// We rely on the Global 'App.css' for the Dark Luxury theme
import '../css/App.css';

const API_URL = 'http://localhost:8080/backend/products';

function Home() {
  const sliderRef = useRef(null);

  // --- STATE ---
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Interaction State
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCarId, setHoveredCarId] = useState(null); 
  const [isVideoFadingIn, setIsVideoFadingIn] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const data = await response.json();
        setCarData(data);
      } catch (e) {
        console.error("Error fetching lineup:", e);
        setError("Unable to load the vehicle lineup.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarData();
  }, []);

  // --- INFINITE SCROLL DATA PREP ---
  // We clone the list 3 times to create the illusion of an endless loop
  const sliderCars = carData.length > 0 
    ? [...carData, ...carData, ...carData]
    : []; 

  // --- AUTOPLAY LOGIC (The "Gliding" Effect) ---
  useEffect(() => {
    const slider = sliderRef.current;
    
    // 15ms interval = ~60fps smooth motion
    const interval = setInterval(() => {
      if (slider && !isPaused && carData.length > 0) {
        // Move 1 pixel at a time for maximum smoothness (Luxury = Slow & Steady)
        slider.scrollLeft += 1; 

        // Reset seamlessly when we reach the end of the cloned list
        // (slider.scrollWidth / 3) is the width of one real set of cars
        if (slider.scrollLeft >= (slider.scrollWidth / 3) * 2) {
           slider.scrollLeft = slider.scrollWidth / 3;
        }
      }
    }, 8); 

    return () => clearInterval(interval);
  }, [isPaused, carData.length]); 

  // --- MANUAL NAVIGATION ---
  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 500; // Scroll one card width

    if (slider) {
      const target = direction === 'left' 
        ? slider.scrollLeft - scrollAmount 
        : slider.scrollLeft + scrollAmount;
      
      slider.scrollTo({
        left: target,
        behavior: 'smooth'
      });
    }
  };

  // --- FORMAT PRICE (RM) ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(price);
  };

  // --- LOADING STATE (Minimalist) ---
  if (isLoading) {
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* A simple pulsing text instead of a jarring loading bar */}
          <h2 style={{ opacity: 0.5, animation: 'pulse 1.5s infinite' }}>LOADING EXPERIENCE...</h2>
        </div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error){
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Temporarily Unavailable</h2>
          <p style={{ color: '#888' }}>Please check your connection.</p>
        </div>
      </div>
    );
  }

  // --- MAIN RENDER ---
  return (
    <div>
      <MainBanner />

      {/* "fade-in-up" makes the section rise gently when loaded */}
      <div className="models-section fade-in-up">
        
        <div className="slider-container">
          <h2>Our Lineup</h2>
          
          {/* Navigation Arrows */}
          <button 
            className="nav-btn prev-btn" 
            onClick={() => scroll('left')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            &#8592; {/* Classic Arrow Symbol */}
          </button>

          <button 
            className="nav-btn next-btn" 
            onClick={() => scroll('right')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            &#8594;
          </button>

          {/* The Sliding Track */}
          <div 
            className="slider-track" 
            ref={sliderRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {sliderCars.map((car, index) => (
              <div 
                key={`${car.id}-${index}`} 
                className="slider-card"
                // Hover Handlers for Video
                onMouseEnter={() => {
                  setIsPaused(true);
                  setHoveredCarId(car.id);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                  setIsVideoFadingIn(false); 
                  setTimeout(() => setHoveredCarId(null), 300);
                }}
              >
                <div className="image-wrapper">
                  {/* 1. Static Image (Always Visible Base) */}
                  <img src={car.imageUrl} alt={car.modelName} className="car-image-placeholder" />

                  {/* 2. Video Overlay (Loads on Hover) */}
                  {hoveredCarId === car.id && car.videoUrl && (
                    <video
                      src={car.videoUrl}
                      className={`car-video ${isVideoFadingIn ? 'faded-in' : ''}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                      onLoadedData={() => setIsVideoFadingIn(true)}
                    />
                  )}
                </div>
                
                <div className="card-details">
                  <h3>{car.modelName}</h3>
                  <p>Starting at {formatPrice(car.price)}</p>
                  
                  {/* Link to Detail Page */}
                  <Link to={`/product/${car.id}`}> 
                    <button>Configure</button>
                  </Link>
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