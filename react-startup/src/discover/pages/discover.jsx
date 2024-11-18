// pages/Discover.jsx
import React, { useState } from 'react';
import '../styles/discover.css';
import LeftSidebar from '../components/Layout/LeftSidebar';
import RightSidebar from '../components/Layout/RightSidebar';
import MainContent from '../components/Layout/MainContent';

const Discover = () => {
  const [selectedCategory, setSelectedCategory] = useState('Music');

  return (
    <div className="Discover-container">
      <LeftSidebar selectedCategory={selectedCategory} />
      <MainContent 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <RightSidebar />
    </div>
  );
};

export default Discover;