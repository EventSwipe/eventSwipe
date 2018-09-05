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
      events: dummyData.events,
      favorites: dummyData.events,
      showFaves: false
    };
    this.postEvents = this.postEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  // //uses getEvents helper method on did mount to load all events
  componentDidMount() {
    //  this.getEvents();
    console.log("dummyData: ", this.state.favorites);
  }

  //sends get request to server to get the events from api
  postEvents() {
    console.log("hitting the getMOVIES in client");
    axios
      .post("/events")
      .then(res => {
        // console.log('RES.DATA in axios.postEvents', res.data)
        this.setState({ events: res.data });
        // console.log('this is the STATE', this.state.events)
      })
      .catch(err => console.error(`err in getEvents in index.jsx: ${err}`));
  }

  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves });
  }

  //renders navbar, even & likes
  render() {
    const showFavesOrEvents = this.state.showFaves ? (
      <FavoritesList favorites={this.state.favorites} />
    ) : (
      <Events events={this.state.events} />
    );
    return (
      <div>
        <NavBar />
        <button onClick={this.showFavorites}>
          {this.state.showFaves ? "Search Events" : "Show Favorites"}
        </button>
        {showFavesOrEvents}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
