import React, { useState } from 'react';
import '../../styles/discover.css';

const PriceRangeSlider = () => {
  const [minVal, setMinVal] = useState(0);
  const [maxVal, setMaxVal] = useState(100);

  return (
    <div className="filter-item">
      <h4>Price Range</h4>
      <div className="slider-container" style={{ padding: '20px 10px' }}>
        <div className="values-display" style={{ marginBottom: '10px' }}>
          ${minVal} - ${maxVal}
        </div>
        <div className="range-slider" style={{ position: 'relative' }}>
          <input
            type="range"
            min="0"
            max="100"
            value={minVal}
            onChange={(e) => {
              const value = Math.min(Number(e.target.value), maxVal - 1);
              setMinVal(value);
            }}
            className="thumb thumb--left"
            style={{ position: 'absolute', width: '100%' }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={maxVal}
            onChange={(e) => {
              const value = Math.max(Number(e.target.value), minVal + 1);
              setMaxVal(value);
            }}
            className="thumb thumb--right"
            style={{ position: 'absolute', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;