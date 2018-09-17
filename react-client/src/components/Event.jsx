import React from 'react';
import moment from 'moment';
import axios from 'axios';
import HomePageInfo from './HomePageInfo.jsx';
import Alert from 'react-s-alert';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, x: 0, y: 0 };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this); 
  }

  like() {
    if (this.props.events.length === 1) { // check if out of items
      Alert.error('You have run out of events in your search. Please search again to view more events.', {
        position: 'top-right',
        effect: 'scale',
        beep: false,
        timeout: 3000,
        offset: 100
      });
    }
    let query = this.props.events.shift(); // set the query to the shifted item
    // axios post the item to the database
    query.uid = firebase.auth().currentUser.uid;
    axios.post(`/favorites/${query.uid}`, { params: { favoriteEvent: query }})
      .then(() => {
        this.setState({ count: 0 });
        Alert.info('Event has been saved in your favorites.', {
          position: 'top-right',
          effect: 'scale',
          beep: false,
          timeout: 3000,
          offset: 100
        });
      })
      .catch((err) => console.error(`err in axios.post/favorites: ${err}`));
  }
  dislike() {
    if (this.props.events.length === 1) { // check if there are any even items
      Alert.error('You have run out of events in your search. Please search again to view more events.', {
        position: 'top-right',
        effect: 'scale',
        beep: false,
        timeout: 3000,
        offset: 100
      });
    }
    this.props.events.shift(); // shift the item
    this.setState({ count: 0 }); // reset the state
  }
  _onMouseMove(e) {
    e.preventDefault();
    this.setState({ x: e.screenX, y: e.screenY }, () => {
      if (this.state.x > 1100) {
        this.like();
      } else {
        this.dislike();
      }
    });
  }

  render() {
    const { events } = this.props;
    const event = events ? events[this.state.count] : events;
    const date = event && event.start ? new Date(moment(event.start.local)).toString().substring(0, 15) : event && event.local_date ? new Date(moment(event.local_date)).toString().substring(0, 15) : 'TBD';
    const time = event && event.local_time ? event.local_time : event && event.start ? event.start.local.substring(11) : 'Time Not Given';
    const description = event && event.plain_text_description ? event.plain_text_description : event && event.description && event.description.text ? event.description.text.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '').replace(/<img[^>]*>/g, '').replace(/<\/img>/g, '') : event && event.description ? event.description.replace(/<p[^>]*>/g, '').replace(/<\/p>/g, '').replace(/<a[^>]*>/g, '').replace(/<\/a>/g, '').replace(/<br[^>]*>/g, '').replace(/<\/br>/g, '').replace(/<img[^>]*>/g, '').replace(/<\/img>/g, '') : 'Click Link Below For Info';
    const address = event && event.address ? event.address : event && event.venue && event.venue.address ? event.venue.address.address_1 + ' ' + event.venue.address.city || event.venue.address.localized_address_display : event && event.venue && event.venue.address_1 ? event.venue.address_1 + ' ' + event.venue.city + ` ${event.venue.state || ''}` : 'TBD';
    const image = event && event.logo ? event.logo.url : event && event.featured_photo ? event.featured_photo.highres_link : event && event.group && event.group.photo ? event.group.photo.highres_link : 'http://tiny.cc/vaikyy'; 
    const price = event && event.is_free ? 'Free :)' : event && event.is_free === false ? 'Not Free' : event && event.fee ? event.fee.currency.replace('USD', '$') + event.fee.amount + ' ' + event.fee.description : 'N/A';
    const bold = { fontWeight: 'bold' };
    const name = event && event.name && !event.name.text ? event.name : event && event.name && event.name.text ? event.name.text : event && event.group && event.group.name ? event.group.name : 'No Name Given';
    const mapAddress = event && event.address ? event.address : event && event.venue ? event.venue.name : event && event.group ? event.group.name : 'No Name';
    return (
      <div>
        {event ? (
          <div className="row">
            {console.log(event)}
            <div className="col-1" style={{marginTop: '20%'}}>
              <button onClick={this.dislike}>
                <span><img className="like-button" style={{ height: 50, width: 50}} src="https://pbs.twimg.com/profile_images/534074996562227200/OR7cp94I_400x400.png" alt="Like" /></span>
              </button>
            </div>
            <div className="col-auto">
              <div className="card" style={{ backgroundColor: 'rgba(47, 168, 184, 0.925)' }}>
                <div className="card-body" style={{ width: 550, color: '#015249' }}>
                  <img 
                    className="event-img" 
                    onDragEnd={this._onMouseMove.bind(this)}
                    style={{ width: 500, height: 400 }} 
                    src={image} alt="Card image cap"
                  />
                  <h5 className="card-title" style={{ marginTop: 10 }}>{name}</h5>
                  <p className="card-text">
                    <span className="Loc"><b>Venue Address: </b> {address}</span>
                  </p>
                  <p className="card-text">
                    <span className="date"><b>Date:</b> {date}</span>
                  </p>
                  <p className="card-text">
                    <span className="time"><b>Time:</b> {time}</span>
                  </p>
                  <p className="card-text">
                    <span className="price"><b>Price: </b> {price}</span>
                  </p>  
                  <p className="card-text">
                    <span className="description"><b>Description:</b> {description}</span>
                  </p>
                  <p className="card-text">
                    <span className="link"><b>Link:</b><a href={event.url || event.link} style={{ color: 'white' }}> Check Out The Event</a></span>
                  </p>
                </div>
              </div>
            </div>
            <div className="col-1" style={{marginTop: '20%'}}>
              <button onClick={this.like}>
                <span><img className="like-button" style={{ height: 50, width: 50}} src="http://web.arjentienkamp.com/codepen/tinder/heart.png" alt="Like" /></span>
              </button>
            </div>
            <div className="col-3" style={{'textAlign': 'left'}}>
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
 
export default Event;