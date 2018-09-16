import React from 'react';
import Events from './Events.jsx';
import { DateRange } from 'react-date-range';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { location: '', topic: '', startDate: '', endDate: '', dateHidden: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.toggleHidden = this.toggleHidden.bind(this);
  }
  componentDidMount() {
    this.setState({
      startDate: '2018-09-18T04:00:00.000Z',
      endDate: '2018-12-18T03:59:59.999Z'
    });
  }
  
  handleSubmit(e) {
    const { location, topic, startDate, endDate } = this.state; 
    e.preventDefault();
    this.props.searchEvents({ params: { location, topic, startDate, endDate } });   // run api request and pass in props
  }

  handleSelect(range) {
    this.setState({ startDate: range.startDate._d, endDate: range.endDate._d });
  }

  toggleHidden(e) {
    e.preventDefault();
    this.setState({ dateHidden: !this.state.dateHidden });
  }

  render() {
    return (
      <div style={{'width': '100%', 'textAlign': 'center'}}>
        <form className="form-inline justify-content-center" role="form" >
          <input 
            className="form-control" 
            type="text" 
            aria-label="Search" 
            style={{ backgroundColor: '#A5A5AF', color: 'white', marginRight: 2 }}
            onChange={e => this.setState({ location: e.target.value })} // passed an anonymous function to the onChange so it is associated with it's respective state
            value={this.state.location}
            placeholder="Enter Zip Code"
          />
          <input 
            className="form-control" 
            type="text" 
            aria-label="Search" 
            style={{ backgroundColor: '#A5A5AF', color: 'white', marginRight: 2 }} 
            onChange={e => this.setState({ topic: e.target.value })}
            value={this.state.topic}
            placeholder="Topic"
          />
          <button className="btn btn-secondary" onClick={this.toggleHidden}>Select Date Range</button>
          <button className="btn" onClick={this.handleSubmit} style={{ backgroundColor: '#015249', color: 'white', marginLeft: 2 }}>Submit</button>
          {this.state.dateHidden && <DateRange onChange={this.handleSelect} />}
        </form>
        <Events events={this.props.events} />
      </div>
    );
  }
}
