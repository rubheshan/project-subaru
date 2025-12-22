import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/CarDetail.css';

/**
 * Animated Number Ticker Component
 */
const NumberTicker = ({ value, isDecimal = false }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = parseFloat(value) || 0;
                const duration = 1500; 
                const increment = end / (duration / 16);

                const timer = setInterval(() => {
                    start += increment;
                    if (start >= end) {
                        setDisplayValue(end);
                        clearInterval(timer);
                    } else {
                        setDisplayValue(isDecimal ? start.toFixed(1) : Math.floor(start));
                    }
                }, 16);
            }
        }, { threshold: 0.5 });

        if (nodeRef.current) observer.observe(nodeRef.current);
        return () => observer.disconnect();
    }, [value, isDecimal]);

    return <span ref={nodeRef}>{displayValue}</span>;
};

const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImg, setSelectedImg] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8080/backend/products?id=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCar(data);
                    
                    // Initialize Gallery: Priority to Exterior images
                    const allImages = [...(data.exteriorImages || []), ...(data.interiorImages || [])];
                    if (allImages.length > 0) {
                        setSelectedImg(allImages[0]);
                    }

                    // Initialize Color Configurator: Matches 'name', 'hex', 'image' from Car.java
                    if (data.colorOptions && data.colorOptions.length > 0) {
                        setSelectedColor(data.colorOptions[0]);
                    }
                }
            })
            .catch(err => console.error("Error fetching data:", err));
    }, [id]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsFullScreen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!car) return <div className="loading">Loading Subaru Malaysia...</div>;

    // Helper to clean numeric strings for the ticker
    const extractNum = (str) => str ? str.replace(/[^0-9.]/g, '') : "0";

    // Logic to filter gallery based on tabs
    const getImages = () => {
        const exterior = car.exteriorImages || [];
        const interior = car.interiorImages || [];
        
        if (activeTab === 'exterior') return exterior;
        if (activeTab === 'interior') return interior;
        return [...exterior, ...interior];
    };

    const navigateImage = (direction) => {
        const list = getImages();
        const currIdx = list.indexOf(selectedImg);
        if (currIdx === -1) return;

        let nextIdx;
        if (direction === 'next') {
            nextIdx = (currIdx + 1) % list.length;
        } else {
            nextIdx = (currIdx - 1 + list.length) % list.length;
        }
        setSelectedImg(list[nextIdx]);
    };

    return (
        <div className="car-detail-page">
            
            {/* ACT 1: HERO SECTION */}
            <section className="showroom-hero">
                <div className="watermark-text">{car.modelName}</div>
                <div className="car-image-container">
                    <img src={car.sideImageUrl} alt={car.modelName} className="main-car-img" />
                    <div className="car-shadow"></div>
                </div>
            </section>

            {/* ACT 2: PERFORMANCE SPECS */}
            <section className="performance-specs-section">
                <div className="specs-container">
                    <div className="specs-data-column">
                        <div className="spec-group">
                            <div className="spec-value">
                                {/* Corrected to match accelerationMT in Car.java */}
                                <NumberTicker value={extractNum(car.accelerationMT)} isDecimal={true} />
                                <small>s</small>
                            </div>
                            <div className="spec-label">Acceleration 0 - 100 km/h (MT)</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.horsepower)} /> <small>PS</small>
                            </div>
                            <div className="spec-label">Engine Power</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.torque)} /> <small>Nm</small>
                            </div>
                            <div className="spec-label">Torque</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.topSpeed)} /> <small>km/h</small>
                            </div>
                            <div className="spec-label">Top Speed</div>
                        </div>
                    </div>
                    <div className="specs-image-column">
                        <img src={car.frontImageUrl} alt="Front View" className="brz-front-img" />
                    </div>
                </div>
            </section>

            {/* ACT 3: CORE TECHNOLOGY (HIGHLIGHTS) */}
            <section className="highlights-section">
                <div className="highlights-header">
                    <h2 className="highlights-main-title">CORE <span className="red-text">TECHNOLOGY</span></h2>
                    <p className="highlights-subtitle">Engineering excellence built into every {car.modelName}.</p>
                </div>
                
                <div className="highlights-grid">
                    {car.highlights && car.highlights.map((item, index) => (
                        <div key={index} className="highlight-card">
                            <div className="highlight-img-box">
                                <img src={item.image} alt={item.title} />
                                <div className="card-number">0{index + 1}</div>
                            </div>
                            <div className="highlight-info">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ACT 4: GALLERY SECTION */}
            <section className="gallery-section">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <span className="red-slash">/</span> GALLERY
                    </div>
                    <div className="gallery-tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>ALL</button>
                        <button className={activeTab === 'exterior' ? 'active' : ''} onClick={() => setActiveTab('exterior')}>EXTERIOR</button>
                        <button className={activeTab === 'interior' ? 'active' : ''} onClick={() => setActiveTab('interior')}>INTERIOR</button>
                    </div>
                </div>

                <div className="gallery-main-display">
                    <button className="fullscreen-btn" onClick={() => setIsFullScreen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                        </svg>
                    </button>

                    <button className="nav-arrow prev" onClick={() => navigateImage('prev')}>&#10094;</button>
                    <img src={selectedImg} alt="Subaru Gallery" key={selectedImg} className="fade-in" />
                    <button className="nav-arrow next" onClick={() => navigateImage('next')}>&#10095;</button>
                </div>

                <div className="gallery-thumbnails">
                    {getImages().map((img, index) => (
                        <div 
                            key={index} 
                            className={`thumb-wrapper ${selectedImg === img ? 'active-thumb' : ''}`}
                            onClick={() => setSelectedImg(img)}
                        >
                            <img src={img} alt={`Thumb ${index}`} />
                        </div>
                    ))}
                </div>
            </section>
            
            {/* ACT 5: COLOR CONFIGURATOR */}
            <section className="configurator-section">
                <div className="config-header">
                    <h2>CHOOSE YOUR <span className="red-text">STYLE</span></h2>
                    <p>Select a signature Subaru finish for your {car.modelName}</p>
                </div>

                <div className="config-container">
                    <div className="config-preview">
                        <img 
                            src={selectedColor?.image ? selectedColor.image : car.sideImageUrl} 
                            alt="Selected Color" 
                            className="config-main-img fade-in"
                        />
                        <div className="car-shadow"></div>
                    </div>

                    <div className="config-controls">
                        <h3 className="selected-color-name">
                            {selectedColor?.name}
                        </h3>
                        <div className="swatch-list">
                            {car.colorOptions?.map((color, index) => (
                                <button
                                    key={index}
                                    className={`swatch-btn ${selectedColor?.name === color.name ? 'active' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => setSelectedColor(color)}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FULLSCREEN OVERLAY */}
            {isFullScreen && (
                <div className="fullscreen-overlay" onClick={() => setIsFullScreen(false)}>
                    <button className="close-fullscreen" onClick={() => setIsFullScreen(false)}>&times;</button>
                    <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                        <button className="nav-arrow prev" onClick={() => navigateImage('prev')}>&#10094;</button>
                        <img src={selectedImg} alt="Full View" />
                        <button className="nav-arrow next" onClick={() => navigateImage('next')}>&#10095;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CarDetail;