// components/Events/EventList.jsx
import React from 'react';
import '../../styles/discover.css';

const EventList = () => {
  const events = [
    { id: 1, name: 'Event 1', attendees: 10 },
    { id: 2, name: 'Event 2', attendees: 5 },
    { id: 3, name: 'Event 3', attendees: 8 }
  ];

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id}>
          <div>{event.name}</div>
          <span className="attendees-count">
            {event.attendees} users
          </span>
        </li>
      ))}
    </ul>
  );
};

export default EventList;