import React, { useRef, useEffect, useState } from 'react';
import MainBanner from '../components/MainBanner';
import { Link } from 'react-router-dom';
import '../css/App.css'; 

const API_URL = 'http://localhost:8080/backend/products';

/* =========================================
   ANIMATION HELPER
   ========================================= */
const RevealSection = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
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
  const [carData, setCarData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredCarId, setHoveredCarId] = useState(null); 
  const [isVideoFadingIn, setIsVideoFadingIn] = useState(false);

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

  const sliderCars = carData.length > 0 ? [...carData, ...carData, ...carData] : []; 

  useEffect(() => {
    const slider = sliderRef.current;
    const interval = setInterval(() => {
      if (slider && !isPaused && carData.length > 0) {
        slider.scrollLeft += 1; 
        if (slider.scrollLeft >= (slider.scrollWidth / 3) * 2) {
           slider.scrollLeft = slider.scrollWidth / 3;
        }
      }
    }, 8); 
    return () => clearInterval(interval);
  }, [isPaused, carData.length]); 

  const scroll = (direction) => {
    const slider = sliderRef.current;
    const scrollAmount = 500; 
    if (slider) {
      const target = direction === 'left' ? slider.scrollLeft - scrollAmount : slider.scrollLeft + scrollAmount;
      slider.scrollTo({ left: target, behavior: 'smooth' });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
  };

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

  if (error){
    return (
      <div>
        <MainBanner />
        <div className="models-section" style={{ padding: '50px', textAlign: 'center' }}>
          <h2>Temporarily Unavailable</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MainBanner />

      {/* =========================================
          1. PHILOSOPHY SECTION (Now with Spotlight Background)
      ========================================= */}
      <section className="home-statement-section">
        <RevealSection>
          
          <span className="statement-eyebrow">The Philosophy</span>
          
          <p className="statement-text delay-1">
            <strong>We don't just engineer cars.</strong> Life is a journey filled with countless roads, diverse landscapes, and defining moments.
            The path is rarely straight, often winding through tough terrain and leading to unexpected discoveries.
          </p>

          <p className="statement-text delay-1">
            Subaru understands this journey. We know your needs and desires evolve along the way. 
            That's why we craft vehicles that are more than just transportation; they're true companions.
          </p>

          <p className="statement-text delay-1">
            With Subaru, you don't just drive; <strong>you embrace life fully</strong>, secure in the knowledge that you have a companion for life.
          </p>
        </RevealSection>
      </section>

      {/* =========================================
          2. NEW "STATS" SECTION (The Tech Vibe)
      ========================================= */}
      <section className="stats-section">
         <RevealSection className="stats-container">
            
            <div className="stat-item">
               <span className="stat-number">50+</span>
               <span className="stat-label">Years of AWD</span>
            </div>

            <div className="stat-item">
               <span className="stat-number">96%</span>
               <span className="stat-label">Retained Value</span>
            </div>

            <div className="stat-item">
               <span className="stat-number">5★</span>
               <span className="stat-label">Safety Rating</span>
            </div>

         </RevealSection>
      </section>

      {/* =========================================
          3. FEATURES
      ========================================= */}
      <section className="features-section">
        <RevealSection>
          <span className="statement-eyebrow">Core Technology</span>
          <h2 style={{ fontFamily: 'Inter', fontSize: '2.5rem', marginBottom: '1rem' }}>
            ENGINEERED FOR <span style={{ color: '#c9a959' }}>REALITY</span>
          </h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="icon-circle">⚙️</div>
              <h3>Boxer Engine</h3>
              <p>A flat design for a lower center of gravity. Experience stability and balance.</p>
            </div>

            <div className="feature-card">
              <div className="icon-circle">⛖</div>
              <h3>Symmetrical AWD</h3>
              <p>Power sent to all four wheels, all the time. Total control on any terrain.</p>
            </div>

            <div className="feature-card">
              <div className="icon-circle">👁️</div>
              <h3>EyeSight® Safety</h3>
              <p>An extra set of eyes on the road. Adaptive cruise control and pre-collision braking.</p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* =========================================
          4. CAR LINEUP
      ========================================= */}
      <div className="models-section fade-in-up">
        <div className="slider-container">
          <h2>Our Lineup</h2>
          
          <button className="nav-btn prev-btn" onClick={() => scroll('left')} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>&#8592;</button>
          <button className="nav-btn next-btn" onClick={() => scroll('right')} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>&#8594;</button>

          <div className="slider-track" ref={sliderRef} onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            {sliderCars.map((car, index) => (
              <div 
                key={`${car.id}-${index}`} 
                className="slider-card"
                onMouseEnter={() => { setIsPaused(true); setHoveredCarId(car.id); }}
                onMouseLeave={() => { setIsPaused(false); setIsVideoFadingIn(false); setTimeout(() => setHoveredCarId(null), 300); }}
              >
                <div className="image-wrapper">
                  <img src={car.imageUrl} alt={car.modelName} className="car-image-placeholder" />
                  {hoveredCarId === car.id && car.videoUrl && (
                    <video src={car.videoUrl} className={`car-video ${isVideoFadingIn ? 'faded-in' : ''}`} autoPlay loop muted playsInline onLoadedData={() => setIsVideoFadingIn(true)} />
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