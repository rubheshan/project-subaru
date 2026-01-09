import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import { Link } from 'react-router-dom';
import '../css/App.css'; // Ensure this imports your new Home.css rules too

const API_URL = 'http://localhost:8080/backend/products';

/* =========================================
   1. ANIMATION HELPER (Added this part)
   ========================================= */
const RevealSection = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 } // Trigger when 20% visible
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef} 
      className={`reveal-content ${className || ''} ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

/* =========================================
   MAIN HOME COMPONENT
   ========================================= */
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
  const sliderCars = carData.length > 0 
    ? [...carData, ...carData, ...carData]
    : []; 

  // --- AUTOPLAY LOGIC ---
  useEffect(() => {
    const slider = sliderRef.current;
    
    // 15ms interval = ~60fps smooth motion
    const interval = setInterval(() => {
      if (slider && !isPaused && carData.length > 0) {
        slider.scrollLeft += 1; 

        // Reset seamlessly when we reach the end of the cloned list
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
    const scrollAmount = 500; 

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

  // --- FORMAT PRICE ---
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency: 'MYR',
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0, 
    }).format(price);
  };

  // --- LOADING STATE ---
  if (isLoading) {
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

      {/* =========================================
          2. NEW STATEMENT SECTION (Added here)
      ========================================= */}
      <section className="home-statement-section">
        <RevealSection>
          
          <RevealSection>
          
          <span className="statement-eyebrow">The Philosophy</span>
          
          {/* Paragraph 1 */}
          <p className="statement-text">
            <strong>We don't just engineer cars.</strong> Life is a journey filled with countless roads, diverse landscapes, and defining moments.
            The path is rarely straight, often winding through tough terrain and leading to unexpected discoveries.
          </p>

          {/* Paragraph 2 */}
          <p className="statement-text delay-2">
            Subaru understands this journey. We know your needs and desires evolve along the way. 
            That's why we craft vehicles that are more than just transportation; they're true companions,
             built for every stage of your life. Engineered with purpose, Subaru vehicles inspire unparalleled 
             confidence and deliver peace of mind, safeguarding you on every adventure.
          </p>

          <p className="statement-text delay-2">
            With Subaru, you don't just drive; <strong>you embrace life fully</strong>, secure in the knowledge that you have a companion for life.
          </p>

        </RevealSection>

        </RevealSection>
      </section>
      {/* ========================================= */}

      <div className="models-section fade-in-up">
        
        <div className="slider-container">
          <h2>Our Lineup</h2>
          
          <button 
            className="nav-btn prev-btn" 
            onClick={() => scroll('left')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            &#8592;
          </button>

          <button 
            className="nav-btn next-btn" 
            onClick={() => scroll('right')}
            onMouseEnter={() => setIsPaused(true)} 
            onMouseLeave={() => setIsPaused(false)}
          >
            &#8594;
          </button>

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
                  <img src={car.imageUrl} alt={car.modelName} className="car-image-placeholder" />

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