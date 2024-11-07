// components/Layout/LeftSidebar.jsx
import React from 'react';
import PriceRangeSlider from './PriceRangeSlider';

import '../../styles/discover.css';

const LeftSidebar = () => {
  return (
    <div className="Discover-left-sidebar">
      <h3>Filters</h3>
      
      <div className="filter-item">
        <h4>Location</h4>
        <input type="text" placeholder="Enter Location" />
      </div>

      <div className="filter-item">
        <h4>Instrument type</h4>
        <div className="checkbox-container">
          {['Drums', 'strings', 'winds'].map((option, index) => (
            <label key={index} className="checkbox-label">
              <input type="checkbox" value={option} />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <PriceRangeSlider 
          minPrice={0}
          maxPrice={1000}
          onChange={(min, max) => {
            // Handle price range changes here
            setFilters(prev => ({
              ...prev,
              minPrice: min,
              maxPrice: max
            }));
          }}
        />
      </div>
    </div>
  );
};

export default LeftSidebar;