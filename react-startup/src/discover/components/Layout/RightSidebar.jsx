// components/Layout/RightSidebar.jsx
import '../../styles/discover.css';
import EventList from '../Events/EventList';
import React, { useState } from 'react';



const RightSidebar = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const eventsPerPage = 3;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="Discover-right-sidebar">
      <h3>Events</h3>
      <div className="event-navigation">
        <button 
          className="arrow-button" 
          onClick={handlePrevious}
          disabled={currentPage === 0}
        >
          ←
        </button>
        <button 
          className="arrow-button" 
          onClick={handleNext}
        >
          →
        </button>
      </div>
      <EventList 
        currentPage={currentPage}
        eventsPerPage={eventsPerPage}
      />
    </div>
  );
};

export default RightSidebar;