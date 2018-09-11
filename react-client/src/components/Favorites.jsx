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
    this.removeFave = this.removeFave.bind(this);
  }

  componentDidMount() {
    this.loadMyFaves();
  }

  //loads all the favorites saved in database
  loadMyFaves() {
     axios
      .get('/favorites/ten', {
        params: {
          //sends the lengths of the favorites array down to db to offset return by
          offset: this.state.favorites.length
        }
      })
      .then(res => {
        this.setState({ favorites: res.data });
      })
      .catch(err =>
        console.error(`err in loadmyfaves in favorites.jsx: ${err}`)
      );
  }

  //removes a favorite from the favorite list
  removeFave(favoriteListItem) {
    console.log('this is the list item ', favoriteListItem);
    axios
      .delete('/favorites', {
        data: { eventId: favoriteListItem._id }
      })
      .then(() => {
        this.loadMyFaves();
      })
      .catch(err => console.error('err in removeFave in favorites.jsx', err));
  }

  //renders a new endpoint with the calendar and list
  render() {
    const { favorites } = this.state;
    return (
      <div>
        {/* click */}

        {/* toggle state  */}
        <h1>Likes</h1>
        <br />
        <FavoritesCalendar favorites={favorites}/> 
        
        <FavoritesList
          favorites={favorites}
          removeFave={this.removeFave} 
        />
      </div>
    );
  }
}

export default Favorites;
