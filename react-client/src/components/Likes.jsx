import React from 'react';
<<<<<<< HEAD
import axios from "axios";
=======
import axios from 'axios';
>>>>>>> 456a6e9a10f10b4572625e9d829b5afdf74e2c54
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
      <h1 style='fontStyle:italic'>Likes</h1>
      <LikesCalendar events={this.state.events}/>
      <LikesList events={this.state.events}/>
    </div>)
  }
}

export default Likes;