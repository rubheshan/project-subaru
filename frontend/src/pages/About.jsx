import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../css/About.css";

/* --- ANIMATION ENGINE --- */
const RevealSection = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`reveal-section ${className} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </section>
  );
};

function About() {
  const navigate = useNavigate();
  
  return (
    <div className="about-page">

      <div className="ambient-bg-container">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <RevealSection className="about-hero">
        
        <img 
          src="/images/home_page/brz_front_view.jpg" 
          alt="Subaru BRZ Front" 
          className="hero-car-bg" 
        />

        {/* TEXT CONTENT (Sits on top) */}
        <h1>SUBARU <br /> LEGACY</h1>
        <p>Built on safety. Driven by innovation. Trusted on every journey.</p>
      </RevealSection>

      {/* 2. INTRO */}
      <RevealSection className="about-section">
        <div className="text-block">
          <p>
            Subaru is a globally recognized automotive brand known for its
            unwavering commitment to safety, performance, and engineering excellence.
            <br /><br />
            Designed to deliver confidence in every condition, our vehicles
            are built to support both everyday driving and extraordinary
            adventures, connecting you to the road like never before.
          </p>
        </div>
      </RevealSection>

      {/* 3. MISSION & VALUES */}
      <RevealSection className="about-section light">
        <h2 className="section-title">OUR <span className="blue-text">MISSION</span></h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="card-number">01</div>
            <h3>Safety First</h3>
            <p>Advanced safety technologies designed to protect every passenger, inside and out.</p>
          </div>
          <div className="about-card">
            <div className="card-number">02</div>
            <h3>Engineering</h3>
            <p>Precision engineering focused on balance, control, and absolute reliability.</p>
          </div>
          <div className="about-card">
            <div className="card-number">03</div>
            <h3>Longevity</h3>
            <p>Durable vehicles designed for long-term ownership. 96% of Subarus sold in the last 10 years are still on the road.</p>
          </div>
        </div>
      </RevealSection>

      {/* 4. SIGNATURE TECH */}
      <RevealSection className="about-section">
        <h2 className="section-title">CORE <span className="blue-text">TECHNOLOGY</span></h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="card-number">04</div>
            <h3>Symmetrical AWD</h3>
            <p>
              Provides enhanced stability, traction, and control by distributing power to all wheels simultaneously.
            </p>
          </div>
          <div className="about-card">
            <div className="card-number">05</div>
            <h3>Boxer Engine</h3>
            <p>
              A horizontal layout with a low center of gravity that improves balance, handling, and safety.
            </p>
          </div>
          <div className="about-card">
            <div className="card-number">06</div>
            <h3>EyeSight®</h3>
            <p>
              Advanced driver assistance systems that act as an extra pair of eyes on the road.
            </p>
          </div>
        </div>
      </RevealSection>

      {/* 5. SAFETY (Split Layout with New Image) */}
      <RevealSection className="about-section light">
        <div className="split-layout">
          <div className="split-text">
            <h2 className="section-title" style={{textAlign: 'left'}}>COMMITMENT TO <span className="blue-text">SAFETY</span></h2>
            <p style={{ color: '#cfd6e4', lineHeight: '1.8' }}>
              Safety is at the core of Subaru’s philosophy. Every vehicle is
              engineered with a focus on accident prevention, occupant protection,
              and advanced driver-assistance technologies.
              <br /><br />
              We don't just build cars; we build protective shells for the people you love.
            </p>
          </div>
          {/* Replaced graphic with an image container */}
          <div className="split-graphic">
            <img 
                /* Placeholder image of Subaru EyeSight technology. Replace with your own image. */
                src="https://www.subaru.ca/content/7907/media/General/webimage/EyeSight/2023/EyeSight_Cameras_Run_01.jpg" 
                alt="Subaru EyeSight Technology" 
            />
          </div>
        </div>
      </RevealSection>

      {/* 6. SUSTAINABILITY */}
      <RevealSection className="about-section">
        <h2 className="section-title">GLOBAL <span className="blue-text">PRESENCE</span></h2>
        <div className="text-block">
          <p>
            From the rugged terrains of the Americas to the winding roads of Europe and Asia, 
            Subaru supports a wide range of lifestyles. We are committed to responsible manufacturing 
            and environmental stewardship, striving for a zero-landfill future.
          </p>
        </div>
      </RevealSection>

      {/* 7. CTA */}
      <RevealSection className="about-cta">
        <h2 className="section-title" style={{ fontSize: '2rem' }}>EXPERIENCE THE <span className="blue-text">DIFFERENCE</span></h2>
        <p style={{ color: '#8899a6' }}>Explore vehicles designed for confidence, adventure, and safety.</p>
        <button className="cta-btn"onClick={() => navigate('/')}>View Lineup</button>
      </RevealSection>

      {/* DISCLAIMER */} 
      <div className="about-disclaimer">
        <p>
           One Life. One Subaru.
        </p>
      </div>

    </div>
  );
}

export default About;