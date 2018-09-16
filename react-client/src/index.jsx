import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './components/Favorites.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], showFaves: false };
    this.searchEvents = this.searchEvents.bind(this);
  }
  signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((data) => console.log('data from signing in with google',data))
      .catch((err) => console.error('err in index.jsx', err));
  }

  signOutOfGoogle() {
    firebase.auth().signOut();
    this.setState({ authenticated: false });
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // User is signed in.
        this.setState({ authenticated: true, user }, () => axios.get(`/loggedin/${this.state.user.uid}`));
      }
    });
  }

  searchEvents(query) {
    axios.get('/events', query) // axios get request from API and then populates the events state with the data
      .then(({ data }) => {
        console.log('dataaaaaa', data)
        let promise = Promise.all(data.sort((a, b) => {
          if (a !== null && b !== null) {
            return new Date(b.date) - new Date(a.date);
          }
        }));
        promise
          .then(events => this.setState({ events }))
          .catch(err => console.error('err in searchEvents promise', err));
      })
      .catch((err) => console.log('front end error', err));
  }

  // renders navbar, searchbar, even & likes
  render () {
    const { showFaves, events, user } = this.state;

    const showFavesOrEvents = showFaves ? <Favorites user={user}/> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
    return this.state.authenticated ? (
      <container>
        <button className="btn btn-dark" onClick={() => this.setState({ showFaves: !showFaves })} style={{ position: 'absolute', top: 5, right: 5 }}>
          {showFaves ? 'Search Events' : 'Show Favorites'}
        </button>
        <div className="d-flex justify-content-center" style={{ marginTop: 60 }}>
          <div className="container" style={{ width: '100%', textAlign: 'center' }}>
            {showFavesOrEvents}
            <Footer />
          </div>
        </div>
      </container>
    ) : (
      <div/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
