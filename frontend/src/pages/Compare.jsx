import React, { useState, useEffect } from 'react';
import '../css/Compare.css';

const API_URL = 'http://localhost:8080/backend/products';

function Compare() {
  const [cars, setCars] = useState([]);
  const [selectedId1, setSelectedId1] = useState('');
  const [selectedId2, setSelectedId2] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setCars(data))
      .catch(err => console.error("Error loading cars:", err));
  }, []);

  const car1 = cars.find(c => c.id === parseInt(selectedId1));
  const car2 = cars.find(c => c.id === parseInt(selectedId2));

  const getSpec = (car, field) => {
    if (!car) return '-';
    if (car.specs && car.specs[field]) return car.specs[field];
    if (field === 'horsepower') return car.horsepower; 
    if (field === 'torque') return car.torque; 
    return '-';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-MY', { style: 'currency', currency: 'MYR', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="compare-section">
      <div className="compare-header">
        <h2>Technical <span style={{ color: '#003087' }}>Showdown</span></h2>
      </div>

      <div className="compare-container">
        
        {/* --- HEADER ROW (Images & Selectors) --- */}
        <div className="compare-row header-row">
          
          {/* COL 1: VS Badge */}
          <div className="header-col label-col">
            <div className="vs-badge">VS</div>
          </div>

          {/* COL 2: Fighter 1 */}
          <div className="header-col">
            <div className="selector-label">Model 01</div>
            <select 
              className="car-dropdown"
              value={selectedId1} 
              onChange={(e) => setSelectedId1(e.target.value)}
            >
              <option value="">- Select Model -</option>
              {cars.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === parseInt(selectedId2)}>
                  {c.modelName}
                </option>
              ))}
            </select>

            {car1 ? (
              <>
                <div className="image-container">
                  <img src={car1.sideImageUrl} alt={car1.modelName} className="car-image fade-in" />
                </div>
                <div className="model-name">{car1.modelName}</div>
                <div className="price-tag">{formatPrice(car1.price)}</div>
              </>
            ) : (
              <div className="image-container" style={{opacity:0.3, color:'#555'}}>NO MODEL SELECTED</div>
            )}
          </div>

          {/* COL 3: Fighter 2 */}
          <div className="header-col">
            <div className="selector-label">Model 02</div>
            <select 
              className="car-dropdown"
              value={selectedId2} 
              onChange={(e) => setSelectedId2(e.target.value)}
            >
              <option value="">- Select Model -</option>
              {cars.map(c => (
                <option key={c.id} value={c.id} disabled={c.id === parseInt(selectedId1)}>
                  {c.modelName}
                </option>
              ))}
            </select>

            {car2 ? (
              <>
                <div className="image-container">
                  <img src={car2.sideImageUrl} alt={car2.modelName} className="car-image fade-in" />
                </div>
                <div className="model-name">{car2.modelName}</div>
                <div className="price-tag">{formatPrice(car2.price)}</div>
              </>
            ) : (
              <div className="image-container" style={{opacity:0.3, color:'#555'}}>NO MODEL SELECTED</div>
            )}
          </div>
        </div>


        {/* --- DATA ROWS --- */}
        {car1 && car2 && (
          <>
            <div className="category-bar">Performance</div>
            
            <div className="compare-row spec-data-row">
              <div className="spec-label">Engine</div>
              <div className="spec-value">{getSpec(car1, 'engineType')}</div>
              <div className="spec-value">{getSpec(car2, 'engineType')}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Displacement</div>
              <div className="spec-value">{getSpec(car1, 'displacement')}</div>
              <div className="spec-value">{getSpec(car2, 'displacement')}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Horsepower</div>
              <div className="spec-value">{car1.horsepower}</div>
              <div className="spec-value">{car2.horsepower}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Torque</div>
              <div className="spec-value">{car1.torque}</div>
              <div className="spec-value">{car2.torque}</div>
            </div>

            <div className="category-bar">Dimensions</div>

            <div className="compare-row spec-data-row">
              <div className="spec-label">Length</div>
              <div className="spec-value">{getSpec(car1, 'length')}</div>
              <div className="spec-value">{getSpec(car2, 'length')}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Width</div>
              <div className="spec-value">{getSpec(car1, 'width')}</div>
              <div className="spec-value">{getSpec(car2, 'width')}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Curb Weight</div>
              <div className="spec-value">{getSpec(car1, 'curbWeight')}</div>
              <div className="spec-value">{getSpec(car2, 'curbWeight')}</div>
            </div>

            <div className="category-bar">Chassis</div>

            <div className="compare-row spec-data-row">
              <div className="spec-label">Tire Size</div>
              <div className="spec-value">{getSpec(car1, 'tireSize')}</div>
              <div className="spec-value">{getSpec(car2, 'tireSize')}</div>
            </div>
            <div className="compare-row spec-data-row">
              <div className="spec-label">Seating</div>
              <div className="spec-value">{getSpec(car1, 'seatingCapacity')}</div>
              <div className="spec-value">{getSpec(car2, 'seatingCapacity')}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Compare;