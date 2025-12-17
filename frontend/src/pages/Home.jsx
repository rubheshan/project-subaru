import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';

import '../css/App.css';

const API_URL = 'http://localhost:8080/backend/products';

function Home() {
  const sliderRef = useRef(null);

  // 2. NEW STATE: State for the fetched data
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- STATE FOR SLIDER PAUSE ---
  const [isPaused, setIsPaused] = useState(false);
  // --- STATE FOR VIDEO ON HOVER ---
  const [hoveredCarId, setHoveredCarId] = useState(null); 
  // NEW STATE: Controls the video's opacity transition
  const [isVideoFadingIn, setIsVideoFadingIn] = useState(false);

  // --- NEW useEffect: FETCH DATA FROM TOMCAT BACKEND ---
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Fetch data from your Tomcat server
        const response = await fetch(API_URL);
        
        // Handle non-200 responses (like a 404 or 500)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCarData(data); // Store the fetched data
        setError(null); // Clear any previous errors

      } catch (e) {
        console.error("Error fetching car data:", e);
        setError("Failed to load car data from the backend.");
      } finally {
        setIsLoading(false); // Stop loading regardless of success/fail
      }
    };

    fetchCarData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // 3. UPDATED: Duplicate the FETCHED data for the loop (only run if data exists)
  const sliderCars = carData.length > 0 
    ? [...carData, ...carData, ...carData, ...carData]
    : []; // Use an empty array if data hasn't loaded yet

  useEffect(() => {
    const slider = sliderRef.current;
    
    const interval = setInterval(() => {
      if (slider && !isPaused && carData.length > 0) {
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

  // --- Conditional Rendering for Loading/Error States ---
  if (isLoading) {
    return (
      <div>
        <MainBanner />
        <div className="slider-container">
          <h2>Loading Lineup...</h2>
          <p>Connecting to Java Backend...</p>
        </div>
      </div>
    );
  }

  if (error){
    return (
      <div>
        <MainBanner />
        <div className="slider-container">
          <h2>Error Loading Data</h2>
          <p>{error}</p>
          <p>Ensure Tomcat is running at {API_URL}</p>
        </div>
      </div>
    );
  }

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
                <img src={car.imageUrl} alt={car.modelName} className="car-image-placeholder" />

                {/* 2. Video: Only mounted when hovered AND video data exists */}
                {hoveredCarId === car.id && car.videoUrl && (
                  <video
                    key={car.id} 
                    src={car.videoUrl}
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
                <h3>{car.modelName}</h3>
                <p>
                  Starting at RM&nbsp;
                  {car.price ? 
                  // Use Intl.NumberFormat for cleaner number formatting without the default currency symbol text
                  new Intl.NumberFormat('en-MY', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(car.price)
                  : 'Price N/A'
                }
              </p>
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