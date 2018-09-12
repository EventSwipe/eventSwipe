import React from 'react';
import FavoritesListItem from './FavoritesListItem.jsx';

const FavoritesList = ({ favorites, removeFave }) => (
  <div>
    <h4>Favorite Events</h4>
    <ul>
      {favorites.map(favorite => (
        <li key={favorite.id}>
          <FavoritesListItem favorite={favorite} removeFave={removeFave}/>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesList;
