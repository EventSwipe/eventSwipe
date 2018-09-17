import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './components/Favorites.jsx';
import SearchBar from './components/SearchBar.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';
import Alert from 'react-s-alert';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], showFaves: false, loading: false, authenticated: false };
    this.searchEvents = this.searchEvents.bind(this);
    this.signInWithGoogle = this.signInWithGoogle.bind(this);
    this.signOutOfGoogle = this.signOutOfGoogle.bind(this);
  }
  signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((data) => console.log('data from signing in with google',data))
      .catch((err) => console.error('err in index.jsx', err));
  }

  signOutOfGoogle() {
    firebase.auth().signOut();
    this.setState({ authenticated: false , events: [], showFaves: false, loading: false});
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // User is signed in.
        this.setState({ authenticated: true, user }, () => axios.get(`/loggedin/${this.state.user.uid}`));
      }
    });
  }

  searchEvents(query) {
    this.setState({ loading: true}, () => {
      axios.get('/events', query) // axios get request from API and then populates the events state with the data
        .then(({ data }) => {
          let promise = Promise.all(data.sort((a, b) => {
            if (a !== null && b !== null) {
              return new Date(b.date) - new Date(a.date);
            }
          }));
          promise
            .then(events => this.setState({ loading: false, events }))
            .catch(err => console.error('err in searchEvents promise', err));
        })
        .catch((err) => console.error('front end error', err));
    });
  }

  // renders navbar, searchbar, even & likes
  render () {
    const { showFaves, events, user } = this.state;
    const showFavesOrEvents = showFaves ? <Favorites user={user}/> : <SearchBar events={events} searchEvents={this.searchEvents} loading={this.state.loading}/>;
    return this.state.authenticated ? (
      <container>
        <button className="btn btn-dark" onClick={() => this.setState({ showFaves: !showFaves })} style={{ position: 'absolute', top: 10, left: 8 }}>
          {showFaves ? 'Search Events' : 'Show Favorites'}
        </button>
        <button className="btn btn-dark" id="logout" onClick={this.signOutOfGoogle}>Logout</button>
        <div className="d-flex justify-content-center" style={{ marginTop: 60 }}>
          <div className="container" style={{ width: '100%', textAlign: 'center' }}>
            {showFavesOrEvents}
            <Footer show={showFaves}/>
          </div>
        </div>
        <Alert stack={{ limit: 3 }}/>
      </container>
    ) : (
      <div id="login_div" className="main-div">
        <img className="login-logo" src="https://image.ibb.co/dQsGup/coollogo_com_30844732.png" />
        <br/>
        <button className="btn btn-dark login-btn" onClick={this.signInWithGoogle}>Sign In With Google</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
