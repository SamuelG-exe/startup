// components/Layout/LeftSidebar.jsx
import React from 'react';
import PriceRangeSlider from './PriceRangeSlider';
import '../../styles/discover.css';

const LeftSidebar = ({ selectedCategory }) => {
  const getFilterOptions = () => {
    switch (selectedCategory) {
      case 'Music':
        return ['Drums', 'strings', 'winds'];
      case 'Video':
        return ['wedding', 'music video', 'creative project'];
      case 'Photo':
        return ['wedding', 'graduation', 'birthday'];
      default:
        return [];
    }
  };

  return (
    <div className="Discover-left-sidebar">
      <h3>Filters</h3>
      
      <div className="filter-item">
        <h4>Location</h4>
        <select className="location-dropdown">
          <option value="">Select Location</option>
          <option value="salt-lake">Salt Lake</option>
          <option value="austin">Austin</option>
          <option value="los-angeles">Los Angeles</option>
        </select>
      </div>

      <div className="filter-item">
        <h4>{selectedCategory} Type</h4>
        <div className="checkbox-container">
          {getFilterOptions().map((option, index) => (
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