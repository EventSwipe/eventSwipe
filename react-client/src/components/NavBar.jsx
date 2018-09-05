import React from "react";
 class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInput: "",
      zipCode: "",
      topic: "",
      date: ""
    };
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e){
      this.setState({ userInput: e.target.value });
  }
   handleSubmit(e) {
      e.preventDefault();
      this.props.getEvents(this.state.userInput);
  }
   //skeleton with dummy info for zipcode, topic and daterange
  render() {
    return (
      <form>
        <input
            onChange={this.handleChange}
            value={this.state.zipCode}
            placeholderText="Zip Code"
        />
        <input
            onChange={this.handleChange}
            value={this.state.topic}
            placeholderText="Topic"
        />
        {/* right now just have customer enter a date and next week enter a range  */}
        <input
            onChange={this.handleChange}
            value={this.state.date}
            placeholderText="Date Range"
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
}
export default NavBar;