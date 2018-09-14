import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
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
    axios.post(`/favorites/${query.uid}`, {params: { favoriteEvent: query }})
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

  render() {
    return (
      <div className="container" style={{'marginTop': '50px'}}>
        <div className="row">
          <div className="col-12">
            <Event event={this.props.events[this.state.count]} like={this.like} dislike={this.dislike}/>  
          </div>
        </div>
      </div>
    );
  }
}

  