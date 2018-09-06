import React from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList.jsx';
import FavoritesCalendar from './FavoritesCalendar.jsx';
import dummyData from '../dummyData.js';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    };
    this.loadMyLikes = this.loadMyLikes.bind(this);
    this.removeFave = this.removeFave.bind(this)
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

  removeFave(favoriteListItem) {
    axios.delete('/favorites', {
            params: {_id: favoriteListItem.props.events.id}})
         .then(res => this.setState({ favorites: res.data}))
         .catch(err => console.error('err in removeFave in favorites.jsx', err))
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
