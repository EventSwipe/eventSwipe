import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Favorites from "./components/Favorites.jsx";
import FavoritesList from "./components/FavoritesList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Events from "./components/Events.jsx";
import dummyData from "./dummyData.js";
import Nav from "./components/Nav.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      showFaves: false,
    }
    this.showFavorites = this.showFavorites.bind(this);
  }

  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves });
  }

  //renders navbar, searchbar, even & likes
  render () {
    const showFavesOrEvents = this.state.showFaves ? <Favorites />: <SearchBar />;
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
