// components/Filters/FilterItem.jsx
import React, { useState } from 'react';

const FilterItem = ({ title, options }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`filter-item ${isActive ? 'active' : ''}`}>
      <button 
        className="filter-button"
        onClick={() => setIsActive(!isActive)}
      >
        {title}
      </button>
      <div className="sub-options">
        {options.map((option, index) => (
          <label key={index}>
            <input type="checkbox" value={option} />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;