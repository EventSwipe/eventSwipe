import React from "react";

// just make a list of all the likes passed down by props
const FavoritesList = ({ favorites, removeFave }) => (
  <div>
    <h4> Faves </h4>
    <ul>
      {console.log("these are the favorites", favorites)}
      {favorites.map(favorite => (
        <li key={favorite.id}>
          <a href={favorite.url}>{favorite.name}</a>, Date:{" "}
          {favorite.date.substring(0, 10)} Time:{" "}
          {favorite.date.substring(11, 16)} &nbsp;
          {favorite.free ? <b>"FREE!!!"</b> : null}
          <button
            onClick={() => {
              removeFave(favorite);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default FavoritesList;
