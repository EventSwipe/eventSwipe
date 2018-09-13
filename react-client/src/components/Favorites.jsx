import React from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList.jsx';
import FavoritesCalendar from './FavoritesCalendar.jsx';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorites: [] };
    this.loadMyFaves = this.loadMyFaves.bind(this);
    this.removeFave = this.removeFave.bind(this);
  }

  componentDidMount() {
    this.loadMyFaves();
  }

  // loads all the favorites saved in database
  loadMyFaves() {
    axios.get('/favorites') //sends the lengths of the favorites array down to db to offset return by
      .then(({ data }) => this.setState({ favorites: data }))
      .catch(err => console.error(`err in loadmyfaves in favorites.jsx: ${err}`));
  }

  // removes a favorite from the favorite list
  removeFave(favoriteListItem) {
    axios.delete('/favorites', { data: { eventId: favoriteListItem._id }} )
      .then(() => this.loadMyFaves())
      .catch(err => console.error('err in removeFave in favorites.jsx', err));
  }

  // renders a new endpoint with the calendar and list
  render() {
    const { favorites } = this.state;
    return (
      <div>
        <h1>Favorite Events</h1>
        <br />
        <FavoritesCalendar favorites={favorites}/> 
        <FavoritesList favorites={favorites} removeFave={this.removeFave}/>
      </div>
    );
  }
}

export default Favorites;
