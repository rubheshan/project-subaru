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
    // Part 3 States
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImg, setSelectedImg] = useState("");

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

    if (!car) return <div className="loading">Loading Subaru Malaysia...</div>;

    const extractNum = (str) => str ? str.replace(/[^0-9.]/g, '') : "0";

    // Gallery Filter Logic
    const getImages = () => {
        if (activeTab === 'exterior') return car.exteriorImages;
        if (activeTab === 'interior') return car.interiorImages;
        return car.allImages;
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
                    {/* Navigation Arrows */}
                    <button className="nav-arrow prev" onClick={() => {
                        const list = getImages();
                        const currIdx = list.indexOf(selectedImg);
                        const nextIdx = (currIdx - 1 + list.length) % list.length;
                        setSelectedImg(list[nextIdx]);
                    }}>&#10094;</button>

                    <img src={selectedImg} alt="Subaru Gallery" key={selectedImg} className="fade-in" />

                    <button className="nav-arrow next" onClick={() => {
                        const list = getImages();
                        const currIdx = list.indexOf(selectedImg);
                        const nextIdx = (currIdx + 1) % list.length;
                        setSelectedImg(list[nextIdx]);
                    }}>&#10095;</button>
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
        </div>
    );
};

export default CarDetail;