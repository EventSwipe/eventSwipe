import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';
//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0,
      //hardcoded dummy data (should be this.props.events[0].location)
      mapAddress: 'https://www.google.com/maps/embed/v1/place?q=newyorkcity&key=AIzaSyBMyF_JNu3kd5H4znq--2xe3WO-GRaC5NE'
    };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this); 
    this.changeAddress = this.changeAddress.bind(this);
  }
  componentDidMount() {
    this.changeAddress();
  }

  like() {
    //check if out of items
    if (this.props.events.length === 1) {
      //TODO:do something when you run out of items
      alert('You have run out of events in your search. Please search again to view more events');
    }
    //set the query to the shifted item
    let query = this.props.events.shift();
    //axios post the item to the database
    axios.post('/favorites', {params: {favoriteEvent: query}})
      .then((response) => {
        this.setState({ count: 0 });
        alert('Event has been saved in your favorites. Check out more events!');
        this.changeAddress();
      })
      //add change map location
      .catch((err) => console.error(`err in axios.post/favorites: ${err}`));
    //reset the state
  }
  dislike() {
    //check if there are any even items
    if (this.props.events.length === 1) {
      //TODO:do something when you run out of items
      alert('You have run out of events in your search. Please search again to view more events');
      this.changeAddress();
    }
    //shift the item
    this.props.events.shift();
    //reset the state
    this.setState({ count: 0 });
  }

  //customize to get the location of the this.props.events item.
  changeAddress() {
    //change map data
    let eventLocation = '369LexingtonAvenuenewyork'
    let address = `https://www.google.com/maps/embed/v1/place?q=${eventLocation}&key=AIzaSyBMyF_JNu3kd5H4znq--2xe3WO-GRaC5NE`
    this.setState({
      mapAddress: address
    })
  }

  render() {
    const { events } = this.props;
    const { count } = this.state;
    return (
      <div>
        <Event event={events[count]} like={this.like} dislike={this.dislike}/> 
        <iframe style={{width: "450px", height:"350px"}} src={this.state.mapAddress}allowFullScreen></iframe>
      </div>
    );
  }
}
export default Events;
  