import React from 'react';
import Events from './Events.jsx';
import axios from 'axios';
import { callbackify } from 'util';

 class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userInput: '',
      location: '',
      topic: '',
      date: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchEvents = this.searchEvents.bind(this);
  }
  componentDidMount () {
    //initial population
    this.searchEvents({
      params: {
      "token": 'E5PTH3KVZH4MFUMMULAE',
      "location.address": 'newyorkcity',
      "q": 'food'
    }});
  }
  handleSubmit(e) {
    e.preventDefault();
    //run api request and pass in props
    //TODO: to add in date range
    this.searchEvents({
      params: {
      "token": 'E5PTH3KVZH4MFUMMULAE',
      "location.address": this.state.location,
      "q": this.state.topic
    }});
    
  }
  searchEvents(query) {
    axios.get('https://www.eventbriteapi.com/v3/events/search/', query)
    .then(({data}) => {
      this.setState({ events: data.events });
      console.log(this.state.events)
    })
    .catch((err) => console.log('front end error', err))
  }

  render() {
    return (
      <div>
      <form>
        <input
            //passed an anonymous function to the onChange so it is associated with it's respective state
            onChange={(e) => this.setState({location: e.target.value})}
            value={this.state.location}
            placeholder="Location"
        />
        <input
            onChange={(e) => this.setState({topic: e.target.value})}
            value={this.state.topic}
            placeholder="Topic"
        />
        {/* right now just have customer enter a date and next week enter a range  */}
        <input
            onChange={(e) => this.setState({date: e.target.value})}
            value={this.state.date}
            placeholder="Date Range"
        />
        {/* <select>
          {[...Array(30)].map((x, i) => 
            <option value={i+1} onChange={this.handleDate}>{i+1} days</option>
          )}
        </select> */}
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
      {/* Create events component and passing down api request events array*/}
      <Events events={this.state.events}/>
      </div>
    );
  }
}
export default SearchBar;