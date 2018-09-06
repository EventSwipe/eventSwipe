import React from 'react';
import Event from './Event.jsx';

//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.dislikeEvent = this.dislikeEvent.bind(this);
    this.addEventToFaves = this.addEventToFaves.bind(this);
  }
  //TODO: Add axios request
  addEventToFaves() {
    if (this.state.count >= this.props.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  }
  dislikeEvent() {
    if (this.state.count >= this.props.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  }

  render() {
    return (
      <div>
        <Event event={this.props.events[this.state.count]} like={this.addEventToFaves} dislike={this.dislikeEvent}/> 
      </div>
    );
  }
}
export default Events;
