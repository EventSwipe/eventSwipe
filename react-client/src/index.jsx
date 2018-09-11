import React from "react";
import ReactDOM from "react-dom";
import Favorites from "./components/Favorites.jsx";
import SearchBar from './components/SearchBar.jsx';
import Nav from './components/Nav.jsx';
import axios from 'axios';
// import SnackBars from './components/SnackBars.jsx';

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
  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves })
  }

  searchEvents(query) {
    //axios get request from API and then populates the events state with the data
    axios.get('/events', query)
      .then(({data}) => this.setState({ events: data }))
      .catch((err) => console.log('front end error', err));
  }

  //renders navbar, searchbar, even & likes
  render () {
    const { showFaves, events } = this.state;
    const showFavesOrEvents = showFaves ? <Favorites /> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
    return (
      <container>
        <Nav/>
        <div className="d-flex justify-content-center">
          <div className="container">
            <button onClick={this.showFavorites}>
              {showFaves ? 'Search Events' : 'Show Favorites'}
            </button>
            {showFavesOrEvents}
            {/* <SnackBars /> */}
          </div>
        </div>
      </container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
