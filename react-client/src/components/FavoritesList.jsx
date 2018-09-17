import React from 'react';
import axios from 'axios';
import FavoritesListItem from './FavoritesListItem.jsx';

export default class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentList: [], favorites: [], count: 0 };
    this.displayNext = this.displayNext.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  showDisplay() {
    this.setState({ showDisplay: !this.state.showDisplay });
  }

  displayNext() {
    const { favorites, count } = this.state;
    this.setState({ count: count + 6 });
    if ((count + 12) > favorites.length) {
      if ((count + 6) < favorites.length) {
        this.setState({ currentList: favorites.slice(count + 6, favorites.length)});
      } else {
        this.setState({ currentList: favorites.slice(0, 6), count: 0});
      }
    } else {
      this.setState({ currentList: favorites.slice(count + 6, count + 12) });
    }
  }

  getFavorites() {
    axios.get(`/favorites/${firebase.auth().currentUser.uid}`) //sends the lengths of the favorites array down to db to offset return by
      .then(({ data }) => {
        console.log(data);
        this.setState({ favorites: data, currentList: data.slice(0, 6) });
      })
      .catch(err => console.error(`err in loadmyfaves in favorites.jsx: ${err}`));
  }
  render() {
    const { removeFave, show } = this.props;
    const { currentList } = this.state;
    return (
      <div className="container">
        <div>
          {show ? <button className="btn btn-dark" style={{ marginBottom: 10, marginTop: 30, marginRight: 90 }} onClick={this.displayNext}>Show More Events</button> : null}
          <br />
          {show 
            ? 
            <div className="row">
              {currentList.map(favorite => (
                <div className="col" key={favorite.id}>
                  <FavoritesListItem favorite={favorite} removeFave={removeFave} getFaves={this.getFavorites} getCalendarFaves={this.props.getCalendarFaves}/>
                </div>
              ))}
            </div>
            :
            ''
          }
        </div>
      </div>
    );
  }
}
