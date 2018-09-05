import React from 'react';
import Favorites from './Favorites.jsx';

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites }) => (
  <div>
    <h4> Faves </h4>
    <ul>
      {favorites.map(favorite => 
        <li Favorites favorite={favorite} key={favorite.id}>
        {favorite.name}, 
        {favorite.start.local.substr(0, 10)}, {favorite.start.local.substr(11)},
        <a href={favorite.url}>Get Tickets!!!</a>, 
        </li> 
      )}
    </ul>
  </div>
)


export default FavoritesList;