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
    this.getIt = this.getIt.bind(this);
  }
  componentDidMount() {
    this.getIt();
  }
  addEventToFaves() {
    console.log('123');
    if (this.state.count >= this.state.events.length - 1) {
      this.setState({ count: 0 });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  }
  dislikeEvent() {
    console.log('456');
    if (this.state.count >= this.state.events.length - 1) {
      this.setState({ count: 0 });
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  }

  getIt() {
    axios
      .get(
        'https://www.eventbriteapi.com/v3/events/search/?token=E5PTH3KVZH4MFUMMULAE&q=club&location.address=newyorkcity'
      )
      .then(({ data }) => {
        console.log('1221212212', data.events);
        this.setState({ events: data.events });
        console.log(this.state.events);
      })
      .catch(err => console.log('front end error', err));
  }

  requestEvents() {}

  render() {
    return (
      <div>
        {/* {console.log(`22222: ${JSON.stringify(this.state.events)}`)}   */}
        <Event
          event={this.state.events[this.state.count]}
          like={this.addEventToFaves}
          dislike={this.dislikeEvent}
        />
      </div>
    );
  }
}
export default Events;
