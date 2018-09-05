import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';

//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], count: 0 };
    this.dislikeEvent = this.dislikeEvent.bind(this);
    this.addEventToFaves = this.addEventToFaves.bind(this);
    this.requestEvents = this.requestEvents.bind(this);
  }
  componentDidMount() {
    this.setState({ events: this.props.events })
  }
  addEventToFaves() {
    if (this.state.count >= this.state.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count+1 });
    }
  }
  dislikeEvent() {
    if (this.state.count >= this.state.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count+1 });
    }
  }


  requestEvents() {

  }

  render() {
    return (
      <div>
        {/* {console.log(`22222: ${JSON.stringify(this.state.events)}`)}   */}
        <Event event={this.state.events[this.state.count]} like={this.addEventToFaves} dislike={this.dislikeEvent}/> 

      </div>
      

    );
  }
}
export default Events;