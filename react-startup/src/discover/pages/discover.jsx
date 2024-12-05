// pages/Discover.jsx
import React, { useState } from 'react';
import '../styles/discover.css';
import LeftSidebar from '../components/Layout/LeftSidebar';
import RightSidebar from '../components/Layout/RightSidebar';
import MainContent from '../components/Layout/MainContent';
import { useLocation } from 'react-router-dom';


const Discover = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.selectedCategory || null
  );

  return (
    <div className="Discover-container">
      {/* <LeftSidebar selectedCategory={selectedCategory} /> */}
      <MainContent 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      <RightSidebar />
    </div>
  );
};

export default Discover;