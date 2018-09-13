import React from 'react';
import ReactDOM from 'react-dom';
import Favorites from './components/Favorites.jsx';
import SearchBar from './components/SearchBar.jsx';
import Nav from './components/Nav.jsx';
import axios from 'axios';
// import SnackBars from './components/SnackBars.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [], showFaves: false };
    this.searchEvents = this.searchEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.showFaves = this.showFaves.bind(this);
    this.showHome = this.showHome.bind(this);
  }
  signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider;
    
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then((data) => console.log('data from signing in with google',data))
      .catch((err) => console.error('err in index.jsx', err));
  }

  signOutOfGoogle() {
    firebase.auth().signOut()
    this.setState({
      authenticated:false
    })
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {  // User is signed in.
        this.setState({ authenticated: true, user: user }, () => {
          axios.get(`/loggedin/${this.state.user.uid}`);
        });
      }
    });
  }
  
  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves });
  }
  showFaves() {
    this.setState({ showFaves: true });
  }
  showHome() {
    this.setState({ showFaves: false });
  }

  searchEvents(query) {
    //axios get request from API and then populates the events state with the data
    axios.get('/events', query)
      .then(({ data }) => {
        let promise = Promise.all(data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        }));
        promise
          .then(events => this.setState({ events }))
          .catch(e => console.error('err in searchEvents promise', err));
      })
      .catch((err) => console.log('front end error', err));
  }

  //renders navbar, searchbar, even & likes
  render () {
    const { showFaves, events } = this.state;

    const showFavesOrEvents = showFaves ? <Favorites user={this.state.user}/> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
    return this.state.authenticated ? (
      <container>
        {/* <Nav home={this.showHome} showFaves={this.showFaves} signOutOfGoogle={this.signOutOfGoogle}/> */}
        <div className="d-flex justify-content-center">
          <div className="container" style={{ width: '100%', textAlign: 'center' }}>
            <button className="btn btn-dark" onClick={this.showFavorites} style={{marginBottom: '20px', marginTop: '20px'}}>
              {showFaves ? 'Search Events' : 'Show Favorites'}
            </button>
            {showFavesOrEvents}
          </div>
        </div>
      </container>
    ) : (
      <div>
        <h3>EventSwipe Login Page</h3>
        <br/>
        <button className="main-button" onClick={this.signInWithGoogle}>Sign In With Google</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
