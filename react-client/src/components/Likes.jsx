import React from 'react';
import axios from 'axios';
import LikesList from './LikesList.jsx';
import LikesCalendar from './LikesCalendar.jsx';

class Likes extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      likes: []
    }
    this.loadMyLikes = this.loadMyLikes.bind(this)
  }

  //fill out 
  componentDidMount() {
    this.loadMyLikes()
  }

  //make a load my likes method
  loadMyLikes(){
    axios.get('/favorite')
         .then(res => {
           //console.log('RES.DATA  in axios.post loadMyLikes', res.data)
           this.setState({ likes: res.data })
         })
         .catch(err => console.error(`err in getEvents in index.jsx: ${err}`));
  }

  //renders a new endpoint with the calendar and list
  render () {
    return (<div>
      //click

      //toggle state 

      <button>Home</button>
      <h1 style='fontStyle:italic'>Likes</h1>
      <LikesCalendar events={this.state.likes}/>
      <LikesList events={this.state.likes}/>
    </div>)
  }
}

export default Likes;