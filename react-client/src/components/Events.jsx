import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';
//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      count: 0
    };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this); 
  }
  componentDidMount() {
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
    }
    //shift the item
    this.props.events.shift();
    //reset the state
    this.setState({ count: 0 });
  }

  render() {
    const { events } = this.props;
    const { count } = this.state;
    return (
      <div className="container" style={{'marginTop': '50px'}}>
          <div className="row">
              <div className="col-12">
                <Event event={events[count]} like={this.like} dislike={this.dislike}/>  
              </div>
          </div>
      </div>
    );
  }
}
export default Events;
  