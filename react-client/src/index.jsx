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
<<<<<<< HEAD
    this.state = { 
      events: [],
      showFaves: false,
      authenticated: false,
      user:null
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.signOutOfGoogle = this.signOutOfGoogle.bind(this);
=======
    this.state = { events: [], showFaves: false };
    this.searchEvents = this.searchEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.showFaves = this.showFaves.bind(this);
    this.showHome = this.showHome.bind(this);
>>>>>>> dev
  }

  signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    
    // googleAuthProvider.setCustomParameters({
    //   prompt: 'select_account'
    // });
    
    firebase.auth().signInWithPopup(googleAuthProvider)
    .then((data) => console.log('data from signing in with google',data))
    .catch((err) => console.log(err))
  }

  signOutOfGoogle() {
    firebase.auth().signOut()
    this.setState({
      authenticated:false
    })
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log('this is the user in checkifsignedin', user)
      if (user) {
        // User is signed in.
        this.setState({authenticated:true, user:user}, () => console.log('the state after onauthstate',this.state))
        console.log('if there is a user1', firebase.auth().currentUser)       
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
    console.log('checkifsignedin', checkIfSignedIn)
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
    const showFavesOrEvents = showFaves ? <Favorites /> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
<<<<<<< HEAD
    return this.state.authenticated ? (
      <div>
        {console.log(this.state.events)}
        <Nav/>
        <button onClick={this.showFavorites}>
          {showFaves ? 'Search Events' : 'Show Favorites'}
        </button>
        {showFavesOrEvents}
        {/* <SnackBars /> */}
        <button onClick={this.signOutOfGoogle}>Sign Out</button>
      </div>
    ) : (
    <div>
      <h3>EventSwipe Login Page</h3>
      <br/>
      <button className="main-button" onClick={this.signInWithGoogle}>Sign In With Google</button>
    </div>
    )
=======
    return (
      <container>
        <Nav home={this.showHome} showFaves={this.showFaves}/>
        <div className="d-flex justify-content-center">
          <div className="container" style={{ width: '100%', textAlign: 'center' }}>
            <button className="btn btn-dark" onClick={this.showFavorites} style={{marginBottom: '20px', marginTop: '20px'}}>
              {showFaves ? 'Search Events' : 'Show Favorites'}
            </button>
            {showFavesOrEvents}
            {/* <SnackBars /> */}
          </div>
        </div>
      </container>
    );
>>>>>>> dev
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
