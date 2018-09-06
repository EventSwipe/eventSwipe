import React from 'react';

//component for each event in the event tinder
const Event = ({ event, like, dislike }) => {
  return (
    <div>
      {event ? (
      <div>
        <div className="column">
          <button className="float-right" onClick={dislike}>
            <span><img className="like-button float-right" style={{height: 100, width: 100}} src="https://pbs.twimg.com/profile_images/534074996562227200/OR7cp94I_400x400.png" alt="Like" /></span>
          </button>
        </div>
        <div className="column-center">
          <img className="event-img" src={event.logo.url} alt="Card image cap"/>
          <div className="card" >
            <div className="card-body">
              <h5 className="card-title">{event.name.text}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
              <p className=" event-description card-text">{event.description.text}</p>
              <p className="card-text"><span className="Loc">Venue Address: </span>
                <span>{event.address || 'TBD'}</span></p>
              <p className="card-text"><span className="date">Date: </span>
                <span>{event.start.local.substr(0, 10)}</span></p>
              <p className="card-text"><span className="link">Link: </span>
                <a href={event.url}>{event.url}</a></p>
              <a href="#" className="card-link float-right">Card link</a>
              <a href="#" className="card-link">Another link</a>
            </div>
          </div>
        </div>
        <div className="column">
          <button onClick={like}>
            <span><img className="like-button" style={{height: 100, width: 100}} src="http://web.arjentienkamp.com/codepen/tinder/heart.png" alt="Like" /></span>
          </button>
        </div>
      </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default Event;
