import React from 'react';

//component for each event in the event tinder 
const EventTinder = ({ event }) => {
  console.log(event);
  return (
    <div>
    <h1>{event.name.text}</h1>
    <img src={event.logo.url} />
      <div className="event_description">
        <h2>{event.description.text}</h2>
        <section className="event_details">
          <div className="event_loc">
            <span className="Loc">Location</span>
            <span>{event.location}</span>
          </div>
        <div className="event_link">
          <span className="link">Link</span>
          <span>{event.url}</span>
        </div>
        <div className="event_date">
          <span className="date">Date</span>
          <span>{event.start.local}</span>
        </div>
      </section>
    </div>
  </div>

  );
}
 

export default EventTinder;