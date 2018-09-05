import React from "react";

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites }) => (
  <div>
    <h4> Faves </h4>
    <ul>
      {console.log("these are the favorites", favorites)}
      {favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name.text},{favorite.start.local.substr(0, 10)}{" "}
          {favorite.start.local.substr(11)},
          <a href={favorite.url}>Get Tickets!!!</a>,
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesList;
