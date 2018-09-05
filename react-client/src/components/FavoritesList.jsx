import React from 'react';
import Favorites from './Favorites.jsx';

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites }) => (
  <div>
    <h4> Faves </h4>
    {favorites.map(favorite => <Favorites favorite={favorite} key={favorite.id}/>)}
  </div>
)


export default FavoritesList;