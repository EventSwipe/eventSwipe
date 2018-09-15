import React from 'react';
import googleKey from '../../../config.js';
import moment from 'moment';
import HomePageInfo from './HomePageInfo.jsx';

//component for each event in the event tinder
const Event = ({ event, like, dislike }) => {
  const date = event && event.start ? new Date(moment(event.start.local)).toString().substring(0, 15) : event && event.local_date ? new Date(moment(event.local_date)).toString().substring(0, 15) : 'TBD';
  const time = event && event.local_time ? event.local_time : event && event.start ? event.start.local.substring(11) : 'Time Not Given';
  const address = event && event.address ? event.address : event && event.venue && event.venue.address ? event.venue.address.address_1 + ' ' + event.venue.address.city : event && event.venue && event.venue.address_1 ? event.venue.address_1 + ' ' + event.venue.city || event.venue.address.localized_address_display : event && event.group && event.group.localized_location ? event.group.localized_location : 'TBD';
  const bold = { fontWeight: 'bold' };
  return (
    <div>
      {event ? (
        <div className="row">
          {console.log(event)}
          <div className="col">
            <div className="card" >
              <div className="card-body" style={{ width: 550, color: '#015249' }}>
                <img className="event-img" style={{ width: 500, height: 400 }} src={event.logo ? event.logo.url : event.featured_photo ? event.featured_photo.highres_link : 'http://tiny.cc/vaikyy' } alt="Card image cap"/>
                <h5 className="card-title">{event.name ? event.name.text : event.group.name}</h5>
                {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
                <p className="card-text">
                  <b>Description:</b> {event.description && event.description.text ? event.description.text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '') : event.description ? event.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '') : 'Click Link Below For Info'}
                </p>
                <p className="card-text">
                  <span className="Loc" style={bold}>Venue Address: </span>
                  <span>{address}</span>
                </p>
                <p className="card-text">
                  <span className="date" style={bold}>Date: </span>
                  <span>{date}</span>
                </p>
                <p className="card-text">
                  <span className="time" style={bold}>Time: </span>
                  <span>{time}</span>
                </p>
                <p className="card-text">
                  <span className="link" style={bold}>Link: </span>
                  <a href={event.url || event.link}>Check Out The Event</a>
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
            <iframe style={{ width: 400, height: 350 }} src={`https://www.google.com/maps/embed/v1/place?q=${event.address ? event.address : event.venue ? event.venue.name : event && event.group ? event.group.name : 'No Name'}&key=AIzaSyBMyF_JNu3kd5H4znq--2xe3WO-GRaC5NE`} allowFullScreen />
          </div>
        </div>
      ) : (
        <HomePageInfo />
      )}
    </div>
  );
  
}

export default Event;
