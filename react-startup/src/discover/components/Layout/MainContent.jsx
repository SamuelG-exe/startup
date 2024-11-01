// components/Layout/MainContent.jsx
import React from 'react';
import '../../styles/discover.css';

const MainContent = () => {
  return (
    <div className="Discover-main-content">
      <div className="Discover-search">
        {['Music', 'Video', 'Photo'].map((category, index) => (
          <h2 key={index}>{category}</h2>
        ))}
      </div>
      
      <div className="Discover-grid">
        {Array(6).fill(null).map((_, index) => (
          <div key={index} className="Discover-box-container">
            <div className="profile-box">
              <div className="profile-slideshow">
                <img src="placeholder.jpg" alt="Profile" />
              </div>
              <div className="profile-info">
                <i className="info-icon" />
                <span>Profile {index + 1}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainContent;