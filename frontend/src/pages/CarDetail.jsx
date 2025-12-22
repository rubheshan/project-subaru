import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/CarDetail.css';

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

    useEffect(() => {
        fetch(`http://localhost:8080/backend/products?id=${id}`)
            .then(res => res.json())
            .then(data => {
                setCar(data);
                if (data.allImages && data.allImages.length > 0) {
                    setSelectedImg(data.allImages[0]);
                }
            })
            .catch(err => console.error("Error:", err));
    }, [id]);

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
        if (activeTab === 'exterior') return car.exteriorImages;
        if (activeTab === 'interior') return car.interiorImages;
        return car.allImages;
    };

    const navigateImage = (direction) => {
        const list = getImages();
        const currIdx = list.indexOf(selectedImg);
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
            {/* ACT 1: HERO */}
            <section className="showroom-hero">
                <div className="watermark-text">{car.modelName}</div>
                <div className="car-image-container">
                    <img src={car.sideImageUrl} alt={car.modelName} className="main-car-img" />
                    <div className="car-shadow"></div>
                </div>
            </section>

            {/* ACT 2: PERFORMANCE */}
            <section className="performance-specs-section">
                <div className="specs-container">
                    <div className="specs-data-column">
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.accelerationMT)} isDecimal={true} />
                                <small>s</small>
                            </div>
                            <div className="spec-label">Acceleration 0 - 100 km/h</div>
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
                        <img src={car.frontImageUrl} alt="Performance View" className="brz-front-img" />
                    </div>
                </div>
            </section>

            {/* NEW ACT: KEY HIGHLIGHTS */}
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

            {/* ACT 3: THE GALLERY */}
            <section className="gallery-section">
                <div className="gallery-header">
                    <div className="gallery-title">
                        <span className="red-slash">/</span> GALLERY
                    </div>
                    <div className="gallery-tabs">
                        <button className={activeTab === 'all' ? 'active' : ''} onClick={() => {setActiveTab('all'); setSelectedImg(car.allImages[0]);}}>ALL</button>
                        <button className={activeTab === 'exterior' ? 'active' : ''} onClick={() => {setActiveTab('exterior'); setSelectedImg(car.exteriorImages[0]);}}>EXTERIOR</button>
                        <button className={activeTab === 'interior' ? 'active' : ''} onClick={() => {setActiveTab('interior'); setSelectedImg(car.interiorImages[0]);}}>INTERIOR</button>
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