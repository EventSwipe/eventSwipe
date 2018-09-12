import React from "react";
import ReactDOM from "react-dom";
import Favorites from "./components/Favorites.jsx";
import SearchBar from './components/SearchBar.jsx';
import Nav from './components/Nav.jsx';
import axios from 'axios';
// import SnackBars from './components/SnackBars.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [],
      showFaves: false,
      authenticated: false,
      user:null
    };
    this.searchEvents = this.searchEvents.bind(this);
    this.showFavorites = this.showFavorites.bind(this);
    this.signOutOfGoogle = this.signOutOfGoogle.bind(this);
  }

  signInWithGoogle() {
    var googleAuthProvider = new firebase.auth.GoogleAuthProvider
    
    googleAuthProvider.setCustomParameters({
      prompt: 'select_account'
    });
    
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
        this.setState({authenticated:true, user:user}, () => console.log(this.state))
        console.log('if there is a user1', firebase.auth().currentUser)       
      }
    });
  }

  showFavorites() {
    this.setState({ showFaves: !this.state.showFaves })
  }

  searchEvents(query) {
    //axios get request from API and then populates the events state with the data
    console.log('checkifsignedin', checkIfSignedIn)
    axios.get('/events', query)
      .then(({data}) => this.setState({ events: data }))
      .catch((err) => console.log('front end error', err));
  }

  //renders navbar, searchbar, even & likes
  render () {
    const { showFaves, events } = this.state;
    const showFavesOrEvents = showFaves ? <Favorites /> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
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
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
