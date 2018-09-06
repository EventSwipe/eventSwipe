import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: '',
      zipCode: '',
      topic: '',
      date: ''
    };
    // this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // handleChange(e){
  //     this.setState({ userInput: e.target.value });
  // }
  handleSubmit(e) {
    e.preventDefault();
    // this.props.getEvents(this.state.userInput);

    //do we want to reset state after a submit?
    this.setState({
      userInput: '',
      zipCode: '',
      top: '',
      date: ''
    });
  }
  //skeleton with dummy info for zipcode, topic and daterange
  render() {
    return (
      <form>
        <input
          //passed an anonymous function to the onChange so it is associated with it's respective state
          onChange={e => this.setState({ zipCode: e.target.value })}
          value={this.state.zipCode}
          placeholder="Zip Code"
        />
        <input
          onChange={e => this.setState({ topic: e.target.value })}
          value={this.state.topic}
          placeholder="Topic"
        />
        {/* right now just have customer enter a date and next week enter a range  */}
        {/* <input
            onChange={(e) => this.setState({date: e.target.value})}
            value={this.state.date}
            placeholder="Date Range"
        /> */}
        <select>
          {[...Array(30)].map((x, i) => (
            <option value={i + 1}>{i + 1} days</option>
          ))}
        </select>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
export default NavBar;
