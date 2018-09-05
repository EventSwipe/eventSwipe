import React from 'react';
import ReactDOM from 'react-dom';
import Likes from './components/Likes.jsx';
import NavBar from './components/NavBar.jsx';
import Event from './components/Event.jsx';
import axios from 'axios';
import dummyData from './dummyData.js';
import Nav from './components/Nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [dummyData],
      likes: []
    }
    this.postEvents = this.postEvents.bind(this)
  }

  // //uses getEvents helper method on did mount to load all events
  componentDidMount() {
  //  this.getEvents();
  console.log(`dummyData: ${JSON.stringify(dummyData)}`)
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
      {/* <Nav/> */}
      <NavBar/>
      {/* <Event events={this.state.events}/> */}
      {/* <Likes/> */} */}
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));