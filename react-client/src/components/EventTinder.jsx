import React from 'react';

//component for each event in the event tinder 
const EventTinder = props => (
  <div>
    <h1>{props.event.eventName} </h1>
    <img src={`URL${this.events.img}`} />
    <div className="event_description">
      <h2>{props.event.desription}</h2>
      <section className="event_details">
        <div className="event_loc">
          <span className="Loc">Location</span>
          <span>{props.event.location}</span>
        </div>
        <div className="event_link">
          <span className="link">Link</span>
          <span>{props.event.url}</span>
        </div>
        <div className="event_date">
          <span className="date">Date</span>
          <span>{props.event.date}</span>
        </div>
      </section>
    </div>
  </div>
);

export default EventTinder;