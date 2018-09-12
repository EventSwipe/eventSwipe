import React from 'react';
import googleKey from '../../../config.js'
import moment from 'moment';

//component for each event in the event tinder
const Event = ({ event, like, dislike }) => {
  return (
    <div >
      {event ? (
        <div className="row">
          <div className="col">
            <div className="card" >
              <div className="card-body" style={{ width: 550, color:'#015249'}}>
                <img className="event-img" style={{ width: 460, height: 300 }} src={event.logo ? event.logo.url : 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png'} alt="Card image cap"/>
                <h5 className="card-title">{event.name.text || event.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p className=" event-description card-text">
                  Description: {event.description && event.description.text ? event.description.text : event.description}
                </p>
                <p className="card-text">
                  <span className="Loc">Venue Address: </span>
                  <span>{event.address ? event.address : event.group ? event.group.localized_location : 'N/A'}</span>
                </p>
                <p className="card-text">
                  <span className="date">Date: </span>
                  <span>{event.start ? event.start.local : event.local_date}</span>
                </p>
                <p className="card-text">
                  <span className="link">Link: </span>
                  <a href={event.url || event.link}>Click on Link Event</a>
                </p>
                <button onClick={dislike}>
                  <span><img className="like-button" style={{ height: 50, width: 50}} src="https://pbs.twimg.com/profile_images/534074996562227200/OR7cp94I_400x400.png" alt="Like" /></span>
                </button>
                <button onClick={like}>
                  <span><img className="like-button" style={{ height: 50, width: 50}} src="http://web.arjentienkamp.com/codepen/tinder/heart.png" alt="Like" /></span>
                </button>
              </div>
            </div>
          </div>

          <div className="col" style={{'textAlign': 'left'}}>
            <iframe style={{width: "400px", height:"350px"}} src={`https://www.google.com/maps/embed/v1/place?q=galvanizenyc&key=AIzaSyBMyF_JNu3kd5H4znq--2xe3WO-GRaC5NE`}allowFullScreen></iframe>
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
