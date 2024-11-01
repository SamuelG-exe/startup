// components/Layout/LeftSidebar.jsx
import React from 'react';
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
        <h4>Category</h4>
        {['Option 1', 'Option 2', 'Option 3'].map((option, index) => (
          <label key={index}>
            <input type="checkbox" value={option} />
            {option}
          </label>
        ))}
      </div>

      <div className="filter-item">
        <h4>Price Range</h4>
        {['Low', 'Medium', 'High'].map((range, index) => (
          <label key={index}>
            <input type="checkbox" value={range} />
            {range}
          </label>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;