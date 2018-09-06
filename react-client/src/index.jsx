import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import FavoritesList from "./components/FavoritesList.jsx";
import NavBar from "./components/NavBar.jsx";
import Events from "./components/Events.jsx";
import dummyData from "./dummyData.js";
import Nav from "./components/Nav.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      favorites: [],
      showFaves: false,
    }
    this.postEvents = this.postEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    // this.getIt = this.getIt.bind(this);
  }

  //sends get request to server to get the events from api
  postEvents() {
    console.log("hitting the getMOVIES in client");
    axios
      .post("/events")
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.error(`err in postEvents in index.jsx: ${err}`));
  }

  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves });
  }

  //renders navbar, even & likes
  render () {
    const showFavesOrEvents = this.state.showFaves ? <FavoritesList favorites={this.state.favorites}/>: <Events />;
    return (
      <div>
        <Nav/>
        <NavBar />
        <button onClick={this.showFavorites}>
          {this.state.showFaves ? 'Search Events' : 'Show Favorites'}
        </button>
        {showFavesOrEvents}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
