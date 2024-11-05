import React from 'react';

const EventsAttending = () => {
  const dummyEvents = [
    { id: 1, name: "Tech Conference 2024" },
    { id: 2, name: "React Meetup" }
  ];

  return (
    <div className="events-attending">
      <h3>Events Attending</h3>
      {dummyEvents.map(event => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  );
};

export default EventsAttending;