import React from 'react';
import EventTinder from './EventTinder.jsx';

//maps all events to each eventTinder item
const Event = (props) => (
  <div>
    <h4> Event </h4>
    <div>
      <button>X Img</button>
        {props.events.map(event => <EventTinder event={event}/>)}
      <button>Heart Img</button>
    </div>
  </div>
)

export default Event;