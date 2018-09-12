import React from 'react';
import googleKey from '../../../config.js';

//component for each event in the event tinder
const Event = ({ event, like, dislike }) => {
  return (
    <div >
      {event ? (
        <div className="row">
          <div className="col-6">
            <img className="event-img" draggable="true" style={{ width: 550, height: 400 }} src={event.logo ? event.logo.url : 'https://www.google.com/images/hpp/sept-11-69x41.png' } alt="Card image cap"/>
            <div className="card" style={{ width: 550}}>
              <div className="card-body" >
                <h5 className="card-title">{event.name.text || event.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className=" event-description card-text">Description: {event.description && event.description.text ? event.description.text : event.description}</p>
                <p className="card-text"><span className="Loc">Venue Address: </span>
                  <span>{event.address ? event.address : event.group ? event.group.localized_location : 'N/A'}</span></p>
                <p className="card-text"><span className="date">Date: </span>
                  <span>{event.start ? event.start.local : event.local_date}</span></p>
                <p className="card-text"><span className="link">Link: </span>
                  <a href={event.url || event.link}>Click on Link Event</a></p>
              </div>
            </div>
          </div>
          <div className="col-6" style={{'textAlign': 'left'}}>
            <iframe style={{ width: '450px', height: '350px' }} src={'https://www.google.com/maps/embed/v1/place?q=galvanizenyc&key=AIzaSyBMyF_JNu3kd5H4znq--2xe3WO-GRaC5NE'}allowFullScreen></iframe>
            <button onClick={like}>
              <span><img className="like-button" style={{ height: 100, width: 100 }} src="http://web.arjentienkamp.com/codepen/tinder/heart.png" alt="Like" /></span>
            </button>
            <button className="float-left" onClick={dislike}>
              <span><img className="like-button float-right" style={{ height: 100, width: 100 }} src="https://pbs.twimg.com/profile_images/534074996562227200/OR7cp94I_400x400.png" alt="Like" /></span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h4>To Search For Events</h4>
          <h4>Please Enter Your City and Event Topic</h4>
        </div>
      )}
    </div>
  );
};

export default Event;
