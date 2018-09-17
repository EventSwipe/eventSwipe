import React from 'react';
import axios from 'axios';
import FavoritesList from './FavoritesList.jsx';
import FavoritesCalendar from './FavoritesCalendar.jsx';
import moment from 'moment';

export default class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favorites: [], events: [], show: false, showDisplay: false };
    this.loadMyFaves = this.loadMyFaves.bind(this);
    this.removeFave = this.removeFave.bind(this);
    this.getCalendarFaves = this.getCalendarFaves.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
  }

  componentDidMount() {
    this.loadMyFaves();
  }


  showFavorites() {
    this.setState({ show: !this.state.show, showDisplay: !this.state.showDisplay });
  }

  // loads all the favorites saved in database
  loadMyFaves() {
    axios.get(`/favorites/${firebase.auth().currentUser.uid}`) //sends the lengths of the favorites array down to db to offset return by
      .then(({ data }) => this.setState({ favorites: data }))
      .catch(err => console.error(`err in loadmyfaves in favorites.jsx: ${err}`));
  }

  // removes a favorite from the favorite list
  removeFave(favoriteListItem) {
    axios.delete('/favorites', { data: { eventId: favoriteListItem._id }} )
      .then(() => this.loadMyFaves())
      .catch(err => console.error('err in removeFave in favorites.jsx', err));
  }

  getCalendarFaves() {
    axios.get(`/favorites/${firebase.auth().currentUser.uid}`)
      .then(({data}) => {
        let promise = Promise.all(data.map((event) => {
          let obj = {};
          obj['id'] = event.id;
          if (event.local_time) {
            let eventInfo = `${event.date} ${event.time}`;
            obj['start'] = new Date(moment(eventInfo));
          } else {
            obj['start'] = new Date(moment(event.date));
          }
          if (!event.end) {
            obj['end'] = new Date(moment(obj.start).add('3', 'hours'));
          } else {
            obj['end'] = new Date(moment(event.end));
          }
          obj['title'] = event.name ? event.name.substring(0, 50) : event.description.substring(0, 20);
          return obj;
        }));
        promise
          .then(events => this.setState({ events }))
          .catch(e => console.error('err in getFaves FavoritesCalendar.jsx', err));
      })
      .catch(err => console.error('err in getFaves in FavoritesCalendar.jsx', err));
  }

  // renders a new endpoint with the calendar and list
  render() {
    const { favorites, events, show, showDisplay } = this.state;
    return (
      <div>
        <button className="btn btn-dark" onClick={this.showFavorites} style={{ position: 'absolute', top: 10, right: 815 }}>{showDisplay ? 'Display Calendar' : 'Display Events'}</button>
        <span>
          {show 
            ? 
            <FavoritesList 
              user={this.props.user} 
              favorites={favorites} 
              removeFave={this.removeFave} 
              getFaves={this.loadMyFaves} 
              getCalendarFaves={this.getCalendarFaves}
              show={this.state.show}
            /> 
            :
            <FavoritesCalendar favorites={events} getFaves={this.getCalendarFaves} /> 
          }
        </span>
      </div>
    );
  }
}
