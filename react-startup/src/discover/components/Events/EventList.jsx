// components/Events/EventList.jsx
import React, { useState, useEffect } from 'react';
import APIKeys from '../../../APIKeys.json';
import '../../styles/discover.css';

const EventList = ({ currentPage, eventsPerPage = 3 }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${APIKeys.TicketMasterKey}&segmentId=KZFzniwnSyZfZ7v7nJ`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        const eventsList = data._embedded?.events || [];
        const sortedEvents = eventsList.sort((a, b) => 
          new Date(a.dates.start.localDate) - new Date(b.dates.start.localDate)
        );
        setEvents(sortedEvents);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  const startIndex = currentPage * eventsPerPage;
  const visibleEvents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <div>
    <ul className="event-list">
      {visibleEvents.map((event) => (
        <li key={event.id} className="event-item">
          <div className="event-name">
            <strong>{event.name}</strong>
          </div>
          {event.dates?.start?.localDate && (
            <div className="event-date">
              <span className="label">Date: </span>
              {new Date(event.dates.start.localDate).toLocaleDateString()}
            </div>
          )}
          {event.venues?.[0]?.name && (
            <div className="event-venue">
              <span className="label">Venue: </span>
              {event._embedded?.venues?.[0]?.name}
            </div>
          )}
          {event.priceRanges && (
            <div className="event-price">
              <span className="label">Price: </span>
              ${event.priceRanges[0]?.min} - ${event.priceRanges[0]?.max}
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default EventList;