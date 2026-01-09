import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/CarDetail.css';

/* =========================
   REVEAL SECTION
========================= */
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
        <section ref={ref} className={`${className} ${isVisible ? 'is-visible' : ''}`}>
            {children}
        </section>
    );
};

/* =========================
   NUMBER TICKER
========================= */
const NumberTicker = ({ value, isDecimal = false }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const nodeRef = useRef(null);
    const targetValue = parseFloat(value) || 0;

    useEffect(() => {
        let timer = null;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
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
                clearInterval(timer);
                setDisplayValue(0);
            }
        }, { threshold: 0.1 });

        if (nodeRef.current) observer.observe(nodeRef.current);
        return () => {
            observer.disconnect();
            if (timer) clearInterval(timer);
        };
    }, [targetValue, isDecimal]);

    return <span ref={nodeRef}>{displayValue}</span>;
};

/* =========================
   MAIN COMPONENT
========================= */
const CarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // ✅ FIXED

    const [car, setCar] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImg, setSelectedImg] = useState("");
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isImgLoading, setIsImgLoading] = useState(false);

    /* =========================
       FETCH CAR DATA
    ========================= */
    useEffect(() => {
        fetch(`http://localhost:8080/backend/products?id=${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCar(data);
                    const allImages = [...(data.exteriorImages || []), ...(data.interiorImages || [])];
                    if (allImages.length) setSelectedImg(allImages[0]);
                    if (data.colorOptions?.length) setSelectedColor(data.colorOptions[0]);
                }
            })
            .catch(err => console.error("Error fetching car:", err));
    }, [id]);

    /* =========================
       GALLERY TAB SYNC
    ========================= */
    useEffect(() => {
        if (!car) return;
        const exterior = car.exteriorImages || [];
        const interior = car.interiorImages || [];

        if (activeTab === 'exterior' && exterior.length) setSelectedImg(exterior[0]);
        else if (activeTab === 'interior' && interior.length) setSelectedImg(interior[0]);
        else if (activeTab === 'all' && [...exterior, ...interior].length)
            setSelectedImg([...exterior, ...interior][0]);
    }, [activeTab, car]);

    /* =========================
       ESC KEY FULLSCREEN
    ========================= */
    useEffect(() => {
        const esc = e => e.key === 'Escape' && setIsFullScreen(false);
        window.addEventListener('keydown', esc);
        return () => window.removeEventListener('keydown', esc);
    }, []);

    if (!car) return <div className="loading">Loading Subaru Malaysia...</div>;

    const extractNum = str => str?.replace(/[^0-9.]/g, '') || "0";

    const getImages = () => {
        if (activeTab === 'exterior') return car.exteriorImages || [];
        if (activeTab === 'interior') return car.interiorImages || [];
        return [...(car.exteriorImages || []), ...(car.interiorImages || [])];
    };

    const navigateImage = dir => {
        const list = getImages();
        const idx = list.indexOf(selectedImg);
        if (idx === -1) return;
        const next = dir === 'next'
            ? (idx + 1) % list.length
            : (idx - 1 + list.length) % list.length;
        setSelectedImg(list[next]);
    };

    return (
        <div className="car-detail-page">

            {/* HERO */}
            <RevealSection className="showroom-hero">
                <div className="watermark-text">{car.modelName}</div>
                <div className="car-image-container">
                    <img src={car.sideImageUrl} alt={car.modelName} className="main-car-img" />
                </div>
            </RevealSection>

            {/* PERFORMANCE */}
            <RevealSection className="performance-specs-section">
                <div className="specs-container">
                    <div className="specs-data-column">
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.accelerationMT)} isDecimal />
                                <small>s</small>
                            </div>
                            <div className="spec-label">0–100 km/h (MT)</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.horsepower)} />
                                <small>PS</small>
                            </div>
                            <div className="spec-label">Power</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.torque)} />
                                <small>Nm</small>
                            </div>
                            <div className="spec-label">Torque</div>
                        </div>
                        <div className="spec-group">
                            <div className="spec-value">
                                <NumberTicker value={extractNum(car.topSpeed)} />
                                <small>km/h</small>
                            </div>
                            <div className="spec-label">Top Speed</div>
                        </div>
                    </div>
                    <div className="specs-image-column">
                        <img src={car.frontImageUrl} alt="Front" className="brz-front-img" />
                    </div>
                </div>
            </RevealSection>

            {/* GALLERY */}
            <RevealSection className="gallery-section">
                <div className="gallery-header">
                    <div className="gallery-title"><span className="red-slash">/</span> GALLERY</div>
                    <div className="gallery-tabs">
                        {['all','exterior','interior'].map(tab => (
                            <button
                                key={tab}
                                className={activeTab === tab ? 'active' : ''}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gallery-main-display">
                    <button className="nav-arrow prev" onClick={() => navigateImage('prev')}>&#10094;</button>
                    <img src={selectedImg} alt="Gallery" className="fade-in" />
                    <button className="nav-arrow next" onClick={() => navigateImage('next')}>&#10095;</button>
                </div>
            </RevealSection>

            {/* BOOKING CTA ✅ FIXED */}
            <section className="booking-cta">
                <h2>
                    READY TO BOOK <span className="red-text">{car.modelName}</span>
                </h2>
                <p>Proceed to confirm your booking and preferred dates.</p>
                <button
                    className="book-now-btn"
                    onClick={() => navigate(`/booking/${id}`)}
                >
                    BOOK NOW
                </button>
            </section>

        </div>
    );
};

export default CarDetail;
