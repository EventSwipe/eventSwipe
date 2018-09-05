import React from 'react';
import ReactDOM from 'react-dom';
import Likes from './components/Likes.jsx';
import NavBar from './components/NavBar.jsx';
import Event from './components/Event.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      likes: []
    }
    this.postEvents = this.postEvents.bind(this)
  }

  // //uses getEvents helper method on did mount to load all events
  // componentDidMount() {
  //  this.getEvents();
  // }

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
      <button>User Profiel</button>
      <h1 style='fontStyle:italic'>Going</h1>
      <NavBar/>
      <Event/>
      <Likes/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));