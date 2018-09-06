import React from 'react';
import Favorites from './Favorites.jsx';

// map likes passed down from props to a calendar
// find a calendar component to put in here
const FavoritesCalendar = ({ favorites }) => (
  <div>
    <h4> Calendar </h4>
    {favorites.map(like => <Favorites favorite={favorite}/>)}
  </div>
);


export default FavoritesCalendar;