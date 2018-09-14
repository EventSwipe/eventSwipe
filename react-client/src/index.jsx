import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './components/Favorites.jsx';
import SearchBar from './components/SearchBar.jsx';
// import Nav from './components/Nav.jsx';
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
        let promise = Promise.all(data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
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
        <div className="d-flex justify-content-center">
          <div className="container" style={{ width: '100%', textAlign: 'center' }}>
            <button className="btn btn-dark" onClick={() => this.setState({ showFaves: !showFaves })} style={{marginBottom: '20px', marginTop: '20px'}}>
              {showFaves ? 'Search Events' : 'Show Favorites'}
            </button>
            {showFavesOrEvents}
          </div>
        </div>
      </container>
    ) : (
      // <div style={{ textAlign: 'center' }}>
      //   <h2>Please Login</h2>
      //   <br/>
      //   <button className="btn btn-dark" onClick={this.signInWithGoogle}>Sign In With Google</button>
      // </div>
      <div/>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
