import React from 'react';
import HomePageInfo from './HomePageInfo.jsx';
import moment from 'moment';
import axios from 'axios';
 
class SwipeEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, x: 0, y: 0 };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this); 
  }

  like() {
    if (this.props.events.length === 1) { // check if out of items
      // TODO: something when you run out of items
      alert('You have run out of events in your search. Please search again to view more events');
    }
    let query = this.props.events.shift(); // set the query to the shifted item
    // axios post the item to the database
    query.uid = firebase.auth().currentUser.uid;
    axios.post(`/favorites/${query.uid}`, { params: { favoriteEvent: query }})
      .then(() => {
        this.setState({ count: 0 });
        alert('Event has been saved in your favorites. Check out more events!');
      })
      .catch((err) => console.error(`err in axios.post/favorites: ${err}`));
  }
  dislike() {
    if (this.props.events.length === 1) { // check if there are any even items
      // TODO: something when you run out of items
      alert('You have run out of events in your search. Please search again to view more events');
    }
    this.props.events.shift(); // shift the item
    this.setState({ count: 0 }); // reset the state
  }
  _onMouseMove(e) {
    e.preventDefault();
    // e.stopPropagation();
    this.setState({ x: e.screenX, y: e.screenY }, () => {
      // console.log('333', x);
      if (this.state.x > 1100) {
        this.like(e);
      } else {
        this.dislike(e)
      }
      // console.log(this.state.x, this.state.y)
    });
  }

  render() {
    const { events } = this.props;
    let event = events ? events[this.state.count] : events;
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
                  <img 
                    className="event-img" 
                    onDragEnd={this._onMouseMove.bind(this)}
                    style={{ width: 500, height: 400 }} 
                    src={event.logo ? event.logo.url : event.featured_photo ? event.featured_photo.highres_link : 'http://tiny.cc/vaikyy' } alt="Card image cap"
                  />
                  <h5 className="card-title">{event.name ? event.name.text : event.group.name}</h5>
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
                  <button onClick={this.dislike}>
                    <span><img className="like-button" style={{ height: 50, width: 50}} src="https://pbs.twimg.com/profile_images/534074996562227200/OR7cp94I_400x400.png" alt="Like" /></span>
                  </button>
                  <button onClick={this.like}>
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
}
 
export default SwipeEvent;