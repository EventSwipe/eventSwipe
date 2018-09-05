import React from 'react';
import Favorites from './Favorites.jsx';

// map likes passed down from props to a calendar
// find a calendar component to put in here
const FavoritesCalendar = ({ likes }) => (
  <div>
    <h4> Calendar </h4>
    {likes.map(like => <Favorites like={like}/>)}
  </div>
)


export default FavoritesCalendar;