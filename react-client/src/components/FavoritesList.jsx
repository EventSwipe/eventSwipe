import React from 'react';
import axios from 'axios';
import FavoritesListItem from './FavoritesListItem.jsx';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false, currentList: [], favorites: [], count: 0 };
    this.showFavorites = this.showFavorites.bind(this);
    this.displayNext = this.displayNext.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  showFavorites() {
    this.setState({ show: !this.state.show });
  }

  displayNext() {
    const { favorites, count } = this.state;
    this.setState({ count: count + 5 });
    if ((count + 10) > favorites.length) {
      if ((count + 5) < favorites.length && count < favorites.length) {
        this.setState({ currentList: favorites.slice(count + 5, favorites.length)});
      } else {
        this.setState({ currentList: favorites.slice(0, 5), count: 0});
      }
    } else {
      let favorite = favorites.slice(count + 5, count + 10);
      this.setState({ currentList: favorite });
    }
  }

  getFavorites() {
    axios.get('/favorites')
      .then(({ data }) => this.setState({ favorites: data, currentList: data.slice(0, 5) }))
      .catch(err => console.error(`err in loadmyfaves in favorites.jsx: ${err}`));
  }

  render() {
    const { removeFave } = this.props;
    const { show, currentList } = this.state;
    return (
      <div className="container-fluid">
        <h4>Saved Events</h4>
        <div style={{ marginBottom: 30 }}>
          <button className="btn btn-dark" onClick={this.showFavorites} style={{ marginRight: 10, marginBottom: 20 }}>{show ? 'Hide Events' : 'Display Events'}</button> 
          {show ? <button className="btn btn-dark" style={{ marginBottom: 20 }} onClick={this.displayNext}>Show More Events</button> : ''}
          <br />
          {this.state.show 
            ? 
            <div className="row">
              {currentList.map(favorite => (
                <div className="col" key={favorite.id}>
                  <FavoritesListItem favorite={favorite} removeFave={removeFave} getFaves={this.getFavorites}/>
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

export default FavoritesList;
