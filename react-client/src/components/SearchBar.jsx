import React from 'react';
import Events from './Events.jsx';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      location: '',
      topic: '',
      date: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    //initial population with hard coded search
    // this.searchEvents({
    //   params: {
    //   "token": 'E5PTH3KVZH4MFUMMULAE',
    //   "location.address": 'newyorkcity',
    //   "q": 'food'
    // }});
  }
  handleSubmit(e) {
    e.preventDefault();
    //run api request and pass in props
    //TODO: to add in date range
    this.props.searchEvents({
      params: {
        token: 'E5PTH3KVZH4MFUMMULAE',
        'location.address': this.state.location,
        q: this.state.topic
      }
    });
  }

  render() {
    const { topic, location, date } = this.state;
    const { events } = this.props;
    return (
      <div>
        <form>
          <input
            //passed an anonymous function to the onChange so it is associated with it's respective state
            onChange={e => this.setState({ location: e.target.value })}
            value={location}
            placeholder="Location"
          />
          <input
            onChange={e => this.setState({ topic: e.target.value })}
            value={topic}
            placeholder="Topic"
          />
          {/* right now just have customer enter a date and next week enter a range  */}
          <input
            onChange={e => this.setState({ date: e.target.value })}
            value={date}
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
        <Events events={events} />
      </div>
    );
  }
}
export default SearchBar;
