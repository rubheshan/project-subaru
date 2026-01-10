import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import '../css/CarDetail.css';

/**
 * 1. ANIMATION ENGINE (Updated to Reset on Scroll Up)
 */
const RevealSection = ({ children, className }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Simply set state to match intersection status
            // If scrolling down (entering), true. If scrolling up (leaving), false.
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.15 });

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className={`${className} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};

/**
 * Animated Number Ticker (Resets when out of view)
 */
const NumberTicker = ({ value, isDecimal = false }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);
    const targetValue = parseFloat(value) || 0;

    useEffect(() => {
        let timer = null;
        
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                // START COUNTING
                let start = 0;
                const duration = 1500; 
                const increment = targetValue / (duration / 16);

                timer = setInterval(() => {
                    start += increment;
                    if (start >= targetValue) {
                        setDisplayValue(targetValue);
                        clearInterval(timer);
                    } else {
                        setDisplayValue(isDecimal ? start.toFixed(1) : Math.floor(start));
                    }
                }, 16);
            } else {
                // RESET TO 0 WHEN SCROLLING UP/AWAY
                clearInterval(timer);
                setDisplayValue(0);
            }
        }, { threshold: 0.1 }); // Low threshold to reset early

        if (nodeRef.current) observer.observe(nodeRef.current);
        
        return () => {
            observer.disconnect();
            if (timer) clearInterval(timer);
        };
    }, [targetValue, isDecimal]);

    return <span ref={nodeRef}>{displayValue}</span>;
};


const CarDetail = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImg, setSelectedImg] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isImgLoading, setIsImgLoading] = useState(false); 
    const navigate = useNavigate();
    

    // ACT 1: FETCH DATA
    useEffect(() => {
        fetch(`http://localhost:8080/backend/products?id=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCar(data);
                    const allImages = [...(data.exteriorImages || []), ...(data.interiorImages || [])];
                    if (allImages.length > 0) {
                        setSelectedImg(allImages[0]);
                    }
                    if (data.colorOptions && data.colorOptions.length > 0) {
                        setSelectedColor(data.colorOptions[0]);
                    }
                }
            })
            .catch(err => console.error("Error fetching data:", err));
    }, [id]);

    // GALLERY SYNC LOGIC
    useEffect(() => {
        if (!car) return;
        const exterior = car.exteriorImages || [];
        const interior = car.interiorImages || [];
        
        if (activeTab === 'exterior' && exterior.length > 0) {
            setSelectedImg(exterior[0]);
        } else if (activeTab === 'interior' && interior.length > 0) {
            setSelectedImg(interior[0]);
        } else if (activeTab === 'all') {
            const allImages = [...exterior, ...interior];
            if (allImages.length > 0) setSelectedImg(allImages[0]);
        }
    }, [activeTab, car]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setIsFullScreen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (!car) return <div className="loading">Loading Subaru Malaysia...</div>;

    const extractNum = (str) => str ? str.replace(/[^0-9.]/g, '') : "0";

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
        let nextIdx = direction === 'next' ? (currIdx + 1) % list.length : (currIdx - 1 + list.length) % list.length;
        setSelectedImg(list[nextIdx]);
    };

    return (
        <div className="car-detail-page">
            
            {/* HERO SECTION (Static Animation on Load) */}
            <RevealSection className="showroom-hero">
                <div className="watermark-text">{car.modelName}</div>
                <div className="car-image-container">
                    <img src={car.sideImageUrl} alt={car.modelName} className="main-car-img" />
                    <div className="car-shadow"></div>
                </div>
            </RevealSection>

            {/* PERFORMANCE SPECS (Now Wrapped in RevealSection for Re-Triggering) */}
            <RevealSection className="performance-specs-section">
                <div className="specs-container">
                    <div className="specs-data-column">
                        <div className="spec-group">
                            <div className="spec-value"><NumberTicker value={extractNum(car.accelerationMT)} isDecimal={true} /><small>s</small></div>
                            <div className="spec-label">Acceleration 0 - 100 km/h</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value"><NumberTicker value={extractNum(car.horsepower)} /> <small>PS</small></div>
                            <div className="spec-label">Engine Power</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value"><NumberTicker value={extractNum(car.torque)} /> <small>Nm</small></div>
                            <div className="spec-label">Torque</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value"><NumberTicker value={extractNum(car.topSpeed)} /> <small>km/h</small></div>
                            <div className="spec-label">Top Speed</div>
                        </div>
                    </div>
                    <div className="specs-image-column">
                        <img src={car.frontImageUrl} alt="Front View" className="brz-front-img" />
                    </div>
                </div>
            </RevealSection>

            {/* HIGHLIGHTS */}
            <RevealSection className="highlights-section">
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
            </RevealSection>

            {/* GALLERY SECTION */}
            <RevealSection className="gallery-section">
                <div className="gallery-header">
                    <div className="gallery-title"><span className="red-slash">/</span> GALLERY</div>
                    <div className="gallery-tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => setActiveTab('all')}>ALL</button>
                        <button className={activeTab === 'exterior' ? 'active' : ''} onClick={() => setActiveTab('exterior')}>EXTERIOR</button>
                        <button className={activeTab === 'interior' ? 'active' : ''} onClick={() => setActiveTab('interior')}>INTERIOR</button>
                    </div>
                </div>

                <div className="gallery-main-display">
                    <button className="fullscreen-btn" onClick={() => setIsFullScreen(true)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
                    </button>
                    <button className="nav-arrow prev" onClick={() => navigateImage('prev')}>&#10094;</button>
                    <img src={selectedImg} alt="Subaru Gallery" key={selectedImg} className="fade-in" />
                    <button className="nav-arrow next" onClick={() => navigateImage('next')}>&#10095;</button>
                </div>

                <div className="gallery-thumbnails">
                    {getImages().map((img, index) => (
                        <div key={index} className={`thumb-wrapper ${selectedImg === img ? 'active-thumb' : ''}`} onClick={() => setSelectedImg(img)}>
                            <img src={img} alt={`Thumb ${index}`} />
                        </div>
                    ))}
                </div>
            </RevealSection>
            
            {/* CONFIGURATOR SECTION */}
            <RevealSection className="configurator-section">
                <div className="config-header">
                    <h2>CHOOSE YOUR <span className="red-text">STYLE</span></h2>
                    <p>Select a signature Subaru finish for your {car.modelName}</p>
                </div>

                <div className="config-container">
                    <div className="config-preview">
                        <img 
                            src={selectedColor?.image ? selectedColor.image : car.sideImageUrl} 
                            alt="Selected Color" 
                            className={`config-main-img ${isImgLoading ? 'image-loading' : 'fade-in'}`}
                            key={selectedColor?.name}
                            onLoad={() => setIsImgLoading(false)} 
                            
                            /* --- THE SUBTLE GLOW FIX --- */
                            style={{
                                /* 0px horizontal, 60px down (floor), 
                                   40px blur (soft), 
                                   Color + "40" (Adds transparency/subtlety) 
                                */
                                filter: `drop-shadow(0 60px 60px ${selectedColor?.hex || '#ffffff'}40)` 
                            }}
                        />
                        
                        {/* --- DYNAMIC FLOOR SHADOW --- */}
                        {/* We use the selected color's hex to tint the floor glow */}
                        <div 
                            className="car-shadow"
                            style={{
                                background: `radial-gradient(ellipse at center, ${selectedColor?.hex}66 0%, transparent 70%)`,
                                opacity: 0.8
                            }}
                        ></div>
                    </div>

                    <div className="config-controls">
                        {/* --- ANIMATED TEXT --- */}
                        {/* The 'key' forces React to re-play the animation on change */}
                        <h3 
                            className="selected-color-name" 
                            key={selectedColor?.name}
                            style={{ animation: 'fadeInUpShort 0.5s ease-out forwards' }}
                        >
                            {selectedColor?.name}
                        </h3>
                        
                        <div className="swatch-list">
                            {car.colorOptions?.map((color, index) => (
                                <button
                                    key={index}
                                    className={`swatch-btn ${selectedColor?.name === color.name ? 'active' : ''}`}
                                    style={{ backgroundColor: color.hex }}
                                    onClick={() => {
                                        if (color.name !== selectedColor?.name) {
                                            setIsImgLoading(true); 
                                            setSelectedColor(color);
                                        }
                                    }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </RevealSection>

            {/* VARIANT COMPARISON */}
            {car.variants && car.variants.length > 0 && (
                <RevealSection className="variants-section">
                    <div className="variants-header">
                        <h2>CHOOSE YOUR <span className="red-text">DRIVE</span></h2>
                        <p>Available configurations for the {car.modelName}</p>
                    </div>
                    <div className="variants-grid">
                        {car.variants.map((variant, index) => (
                            <div key={index} className="variant-card">
                                <div className="variant-image"><img src={variant.image} alt={variant.name} /></div>
                                <div className="variant-content">
                                    <h3>{variant.name}</h3>
                                    <div className="variant-price-tag">
                                        <small>Starting from</small>
                                        <span className="price-val">RM {variant.price.toLocaleString()}</span>
                                    </div>
                                    <div className="variant-spec-list">
                                        {variant.specs && variant.specs.map((spec, specIdx) => (
                                            <div key={specIdx} className="v-spec-item">
                                                <span className="v-label">{spec.label}</span>
                                                <span className="v-value">
                                                    {spec.value.split('\n').map((line, i) => ( 
                                                        <div key={i}>{line.trim()}</div>
                                                    ))}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </RevealSection>
            )}

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

            {/* Invisible Preloader */}
            <div style={{ display: 'none' }}>
                {car.colorOptions?.map((color, i) => (
                    <img key={i} src={color.image} alt="preload" />
                ))}
            </div>

            <div className="book-now-wrapper">
            <button
                className="book-now-btn"
                onClick={() => navigate(`/booking/${car.id}`)}
                >
                Book Now
            </button>
            </div>
        </div>
    );
};

export default CarDetail;