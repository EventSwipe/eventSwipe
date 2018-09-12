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
  
  handleSubmit(e) {
    e.preventDefault();
    // run api request and pass in props
    // TODO: to add in date range
    this.props.searchEvents({
      params: {
        'location': this.state.location,
        'topic': this.state.topic,
        // start_date.range_start: 
      }
    });
  }

  render() {
    const { topic, location, date } = this.state;
    const { events } = this.props;
    return (
      <div style={{ 'marginTop': '50px','textAlign': 'center','backgroundImage': 'linear-gradient(to right, #77C9D4 , #57BC90)'}}>
        <form className="form-inline justify-content-center" role="form" >
          <input className="form-control" type="text" aria-label="Search" 
            // passed an anonymous function to the onChange so it is associated with it's respective state
            onChange={e => this.setState({ location: e.target.value })}
            value={location}
            placeholder="Enter ZipCode"
          />
          <input className="form-control" type="text" aria-label="Search"  
            onChange={e => this.setState({ topic: e.target.value })}
            value={topic}
            placeholder="Topic"
          />
          {/* right now just have customer enter a date and next week enter a range  */}
          <input className="form-control" type="text" aria-label="Search"  
            onChange={e => this.setState({ date: e.target.value })}
            value={date}
            placeholder="Enter Date Range"
          />
          {/* <select>
          {[...Array(30)].map((x, i) => 
            <option value={i+1} onChange={this.handleDate}>{i+1} days</option>
          )}
        </select> */}
          <button className="btn" onClick={this.handleSubmit} style={{backgroundColor: '#015249', color: 'white'}}>Submit</button>
        </form>
        {/* Create events component and passing down api request events array*/}
        <Events events={events} />
      </div>
    );
  }
}
export default SearchBar;
