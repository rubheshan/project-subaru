import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../css/CarDetail.css';

// Import assets

const NumberTicker = ({ value, isDecimal = false }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let start = 0;
                const end = parseFloat(value);
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

    useEffect(() => {
        fetch(`http://localhost:8080/backend/products?id=${id}`)
            .then(res => res.json())
            .then(data => setCar(data))
            .catch(err => console.error("Error:", err));
    }, [id]);

    if (!car) return <div className="loading">Loading Subaru Malaysia...</div>;

    const hpValue = car.horsepower.replace(/[^0-9]/g, '');
    const torqueValue = car.torque.replace(/[^0-9]/g, '');

    return (
        <div className="car-detail-page">
            {/* ACT 1: THE SHOWROOM HERO */}
            <section className="showroom-hero">
                <div className="watermark-text">{car.modelName}</div>
                <div className="car-image-container">
                    <img src={car.sideImageUrl} alt={car.modelName} className="main-car-img" />
                    <div className="car-shadow"></div>
                </div>
            </section>

            {/* ACT 2: PERFORMANCE SPECS (The Porsche-Style Layout) */}
            <section className="performance-specs-section">
                <div className="specs-container">
                    
                    {/* Left Side: Technical Data */}
                    <div className="specs-data-column">
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value="6.3" isDecimal={true} />
                                <small>s</small>
                            </div>
                            <div className="spec-label">Acceleration 0 - 100 km/h</div>
                        </div>

                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value="174" /> <small>kW</small>
                                <span className="spec-divider">/</span>
                                <NumberTicker value={hpValue} /> <small>PS</small>
                            </div>
                            <div className="spec-label">Power (kW) / Power (PS)</div>
                        </div>

                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value="226" />
                                <small>km/h</small>
                            </div>
                            <div className="spec-label">Top speed</div>
                        </div>

                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={torqueValue} />
                                <small>Nm</small>
                            </div>
                            <div className="spec-label">Maximum Torque</div>
                        </div>
                    </div>

                    {/* Right Side: Front Facing Car Image */}
                    <div className="specs-image-column">
                        <img src={car.frontImageUrl} alt="BRZ Performance" className="brz-front-img" />
                        <div className="car-ground-shadow"></div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default CarDetail;