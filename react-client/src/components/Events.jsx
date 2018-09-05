import React from 'react';
import Event from './Event.jsx';

//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], count: 0 };
    this.dislikeEvent = this.dislikeEvent.bind(this);
    this.addEventToFaves = this.addEventToFaves.bind(this);
  }
  componentDidMount() {
    this.setState({ events: this.props.events })
  }
  addEventToFaves() {
    this.setState({ count: this.state.count+1 });
  }
  dislikeEvent() {
    this.setState({ count: this.state.count+1 });
  }

  render() {
    return (
      <div>
        {console.log(`22222: ${JSON.stringify(this.state.events)}`)}  
        <Event event={this.state.events[this.state.count]} like={this.addEventToFaves} dislike={this.dislikeEvent}/> 

      </div>
      

    );
  }
}
export default Events;