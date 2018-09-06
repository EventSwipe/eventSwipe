import React from "react";
import ReactDOM from "react-dom";
import Favorites from "./components/Favorites.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Nav from "./components/Nav.jsx";
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      showFaves: false
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  // checkEventList() {
  //   console.log('e', this.state.events);
  //   this.setState({ events: this.state.events.slice() });
  //   console.log('t', this.state.events);
  // }

  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves })
  }

  searchEvents(query) {
    //axios get request from API and then populates the events state with the data
    axios.get('https://www.eventbriteapi.com/v3/events/search/', query)
      .then(({data}) => this.setState({ events: data.events }))
      .catch((err) => console.log('front end error', err))
  }

  //renders navbar, searchbar, even & likes
  render () {
    const showFavesOrEvents = this.state.showFaves ? <Favorites /> : <SearchBar events={this.state.events} searchEvents={this.searchEvents}/>;
    return (
      <div>
        <Nav/>
        <button onClick={this.showFavorites}>
          {this.state.showFaves ? "Search Events" : "Show Favorites"}
        </button>
        {showFavesOrEvents}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
