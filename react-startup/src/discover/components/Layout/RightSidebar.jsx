// components/Layout/RightSidebar.jsx
import React from 'react';
import '../../styles/discover.css';
import EventList from '../Events/EventList';

const RightSidebar = () => {
  return (
    <div className="Discover-right-sidebar">
      <h3>Events</h3>
      <EventList />
    </div>
  );
};

export default RightSidebar;