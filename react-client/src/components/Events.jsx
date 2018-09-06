import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';
//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this);
  }
  componentDidMount() {
    
  }

  like() {
    //check if out of items
    if (this.props.events.length ===0) {
      //TODO:do something when you run out of items
      console.log('ran out of items');
      return;
    }
    //set the query to the shifted item
    let query = this.props.events.shift();
    //axios post the item to the database
    axios.post('/favorites',{params: {favoriteEvent: query}})
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })
    //reset the state
    this.setState({ count: 0 });

  }
  dislike() {
    //check if there are any even items
    if (this.props.events.length ===0) {
      console.log('ran out of items');
      return;
    }
    //shift the item
    let last = this.props.events.shift();
    //reset the state
    this.setState({count: 0})
  }

  render() {
    return (
      <div>
        <Event event={this.props.events[this.state.count]} like={this.like} dislike={this.dislike}/> 
      </div>
    );
  }
}
export default Events;
