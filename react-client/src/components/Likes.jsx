import React from 'react';
import axios from "axios";
import LikesList from './components/LikesList.jsx';
import LikesCalendar from './components/LikesCalendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      likes: []
    }
    this.loadMyLikes = this.loadMyLikes.bind(this)
  }

  //fill out 
  componentDidMount() {
 
  }

  //make a load my likes method
  loadMyLikes(){

  }

  //renders a new endpoint with the calendar and list
  render () {
    return (<div>
      <h1 style='fontStyle:italic'>Likes</h1>
      <LikesCalendar events={this.state.events}/>
      <LikesList events={this.state.events}/>
    </div>)
  }
}

export default Likes;