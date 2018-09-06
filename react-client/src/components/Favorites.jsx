import React from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList.jsx';
import FavoritesCalendar from './FavoritesCalendar.jsx';
import dummyData from '../dummyData.js';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadMyLikes = this.loadMyLikes.bind(this);
  }

  //fill out
  componentDidMount() {
    // this.loadMyLikes()
  }

  //make a load my likes method
  loadMyLikes() {
    axios
      .get('/favorite')
      .then(res => {
        //console.log('RES.DATA  in axios.post loadMyLikes', res.data)
        this.setState({ likes: res.data });
      })
      .catch(err => console.error(`err in getEvents in index.jsx: ${err}`));
  }

  //renders a new endpoint with the calendar and list
  render() {
    return (
      <div>
        {/* click */}

        {/* toggle state  */}
        <button>Home</button>
        <h1>Likes</h1>
        <FavoritesList favorites={this.props.favorites} />
        {/* <FavoritesCalendar favorites={this.props.favorites}/> */}
      </div>
    );
  }
}

export default Favorites;
