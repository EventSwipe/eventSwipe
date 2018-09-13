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
    const showFavesOrEvents = showFaves ? <Favorites /> : <SearchBar events={events} searchEvents={this.searchEvents}/>;
    return (
      <div className="container border rounded" style={{borderWidth: '20px'}}> 
        <div className="row" >
          <div className="col" style={{textAlign: 'center'}}>
            <button className="btn" style={{backgroundColor: '#77C9D4', color: 'white', 'borderStyle': 'solid', borderColor: 'black', marginRight: '100px', marginTop: '15px'}}>
              <i className="fas fa-sign-out-alt" style={{fontSize: '48px'}}></i>
            </button>
            <a href="/"><img src="https://image.ibb.co/dQsGup/coollogo_com_30844732.png"/></a>
            <button className="btn" onClick={this.showFavorites} style={{backgroundColor: '#57BC90', color: 'white', 'borderStyle': 'solid', borderColor: 'black', marginLeft: '100px', marginTop: '15px'}}>
            {showFaves ? <i className="fas fa-search-location" style={{fontSize: '48px'}}></i>: <i className="fas fa-heart" style={{fontSize: '48px'}}></i>}
            </button>
          </div>
        </div>
        <div style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '25px'}}>
          <div className="row">
            <div className="col">
                {showFavesOrEvents} 
            </div>
          </div>
            {/* <SnackBars /> */}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
