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
    this.loadMyFaves = this.loadMyFaves.bind(this);
    this.removeFave = this.removeFave.bind(this)
  }

  //fill out
  componentDidMount() {
    this.loadMyFaves()
  }

  //make a load my likes method
  loadMyFaves() {
    axios
      .get('/favorites')
      .then(res => {
        //console.log('RES.DATA  in axios.post loadMyLikes', res.data)
        this.setState({ favorites: res.data });
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
        {/* <FavoritesCalendar favorites={this.props.favorites}/> */}
         <br/>
        <FavoritesList favorites={this.state.favorites} />
      </div>
    );
  }
}

export default Favorites;
