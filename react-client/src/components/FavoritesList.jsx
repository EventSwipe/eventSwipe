import React from "react";
import axios from "axios";
import FavoritesListItem from "./FavoritesListItem.jsx";

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
  }
  // just make a list of all the likes passed down by props
  // const FavoritesList = ({ favorites, removeFave }) =>

  render() {
    const { favorites, removeFave } = this.props;
    return (
      <div>
        <h4> Faves </h4>
        <ul>
          {favorites.map(favorite => (
            <li key={favorite.id}>
              <FavoritesListItem favorite={favorite} removeFave={removeFave}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default FavoritesList;
