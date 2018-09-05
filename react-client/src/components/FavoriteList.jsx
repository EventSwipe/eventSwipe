import React from 'react';
import Favorites from './Favorites';

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites }) => (
  <div>
    <h4> Faves </h4>
    {favorites.map(like => <Favorites like={like}/>)}
  </div>
)


export default FavoritesList;