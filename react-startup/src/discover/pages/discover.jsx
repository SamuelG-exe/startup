// pages/Discover.jsx
import React from 'react';
import '../styles/discover.css';
import LeftSidebar from '../components/Layout/LeftSidebar';
import RightSidebar from '../components/Layout/RightSidebar';
import MainContent from '../components/Layout/MainContent';

const Discover = () => {
  return (
    <div className="Discover-container">
      <LeftSidebar />
      <MainContent />
      <RightSidebar />
    </div>
  );
};

export default Discover;