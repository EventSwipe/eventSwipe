import React from 'react';
import EventTinder from './EventTinder.jsx';

//maps all events to each eventTinder item
const Events = ({ events }) => (
  <div>
    <h4> Event </h4>
    <div>
      <button>X Img</button>
        {events.map(event => <EventTinder event={event} key={event.id}/>)}
      <button>Heart Img</button>
    </div>
  </div>
)

export default Events;