import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FavoritesList from './components/FavoritesList.jsx';
import NavBar from './components/NavBar.jsx';
import Events from './components/Events.jsx';
import dummyData from './dummyData.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: dummyData.events,
      favorites: []
    }
    this.postEvents = this.postEvents.bind(this)
  }

  // //uses getEvents helper method on did mount to load all events
  componentDidMount() {
  //  this.getEvents();
  console.log(`dummyData: ${JSON.stringify(this.state.favorites)}`)
  }

  //sends get request to server to get the events from api
  postEvents() {
    console.log("hitting the getMOVIES in client");
    axios
      .post("/events")
      .then(res => {
        // console.log('RES.DATA in axios.postEvents', res.data)  
        this.setState({ events: res.data })
        // console.log('this is the STATE', this.state.events)
      })
      .catch(err => console.error(`err in getEvents in index.jsx: ${err}`));
  }


  //renders navbar, even & likes
  render () {
    return (
    <div>
      <button>Likes</button>
      <h1>Going</h1>
      <NavBar/>
      <Events events={this.state.events}/>
      <FavoritesList favorites={this.state.favorites}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));