import React from 'react';
import Events from './Events.jsx';
import { DateRange } from 'react-date-range';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      topic: '',
      startDate: '',
      endDate:'',
      dateHidden:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  componentDidMount() {
    this.setState({
      startDate:'2018-09-18T04:00:00.000Z',
      endDate: '2018-12-18T03:59:59.999Z'
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    // run api request and pass in props
    // TODO: to add in date range
    this.props.searchEvents({
      params: {
        'location': this.state.location,
        'topic': this.state.topic,
        'startDate': this.state.startDate,
        'endDate': this.state.endDate 
      }
    });
  }

  handleSelect(range){
    this.setState({
      startDate: range.startDate._d,
      endDate: range.endDate._d
    })
  }

  toggleHidden (e) {
    e.preventDefault();
    this.setState({
      dateHidden: !this.state.dateHidden
    })
  }

  render() {
    const { topic, location, startDate, endDate } = this.state;
    const { events } = this.props;
    return (
      <div style={{'width': '100%', 'textAlign': 'center'}}>
        <form className="form-inline justify-content-center" role="form" >
          <input className="form-control" type="text" aria-label="Search" style={{'backgroundColor': '#A5A5AF', color: 'white'}}
            // passed an anonymous function to the onChange so it is associated with it's respective state
            onChange={e => this.setState({ location: e.target.value })}
            value={location}
            placeholder="Enter Zip Code"
          />
          <input className="form-control" type="text" aria-label="Search" style={{'backgroundColor': '#A5A5AF', color: 'white'}} 
            onChange={e => this.setState({ topic: e.target.value })}
            value={topic}
            placeholder="Topic"
          />
          {/* right now just have customer enter a date and next week enter a range  */}
          <button className="btn btn-secondary" onClick={this.toggleHidden}>Select Date Range</button>
          {/* <select>
          {[...Array(30)].map((x, i) => 
            <option value={i+1} onChange={this.handleDate}>{i+1} days</option>
          )}
        </select> */}
          <button className="btn" onClick={this.handleSubmit} style={{backgroundColor: '#015249', color: 'white'}}>Submit</button>
          {this.state.dateHidden && <DateRange onChange={this.handleSelect} />}
        </form>
        {/* Create events component and passing down api request events array*/}
        <Events events={events} />
      </div>
    );
  }
}
export default SearchBar;
