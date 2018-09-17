import React from 'react';

export default class FavoriteListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.show = this.show.bind(this);
  }

  componentDidMount() {
    this.show();
    this.setState({ clicked: true });
  }

  show() {
    document.getElementById('show').scrollIntoView({ behavior: 'smooth', inline: 'end' });
  }

  render() {
    const { removeFave, favorite, getFaves, getCalendarFaves } = this.props;
    const styleForCard = { backgroundImage: 'linear-gradient(to right, #70c0cc , #56bca7)', width: 340, height: 580, marginBottom: 30, overflow: 'auto', alignItems: 'center' };
    const styleForPrice = { color: 'white', marginBottom: 5 };
    const styleForImage = { width: 300, height: 300, alignItems: 'center', borderStyle: 'solid', borderWidth: '8px', borderColor: '#343a40' };
    const styleTextBlack = { color: '#343a40' };
    const styleTextWhite = { color: 'white' };
    const styleDescription = { color: 'white', fontSize: 14, width: '90%', alignItems: 'center', paddingLeft: 25 };
    const time = favorite && favorite.time ? favorite.time : 'Event Time Not Provided';
    const address = favorite && favorite.location ? favorite.location : 'Address Not Provided (Click Link For More)';
    return (
      <div id="show" className="card" style={styleForCard}>
        <div className="card-body" style={{ width: 400, color: '#015249' }}>
          <span className="card-text">
            <button className="btn btn-dark" style={{ marginBottom: 10, alignItems: 'center' }}
              onClick={() => {
                // when remove favorite is pressed, pass in favorite to be removed
                // call getFaves to update the favorite list
                // call getCalendarFaves to update items on the calendar
                removeFave(favorite);
                getFaves();
                getCalendarFaves();
              }}
            >Remove Event
            </button>
          </span>
          <img className="event-img" style={styleForImage} src={favorite.logo || 'http://tiny.cc/vaikyy'} />
          <p className="card-title" style={styleTextWhite}><a href={favorite.url}>{favorite.name}</a></p>
          <p className="card-text" style={styleTextWhite}><span><b style={styleTextBlack}>Time: </b>{time}</span></p>
          <p className="card-text" style={styleTextWhite}><span><b style={styleTextBlack}>Date: </b>{favorite.date.substr(0, 10)}</span></p>
          <p className="card-text" style={styleTextWhite}><span><b style={styleTextBlack}>Address: </b>{address}</span></p>
          <p className="card-text" style={styleForPrice}><span><b style={styleTextBlack}>Price: </b>{favorite.free ? favorite.free.replace('USD', '$') : 'N/A'}</span></p>
          <p className="card-text" style={styleDescription}><span><b style={styleTextBlack}>Description: </b>{favorite.description}</span></p>
        </div>
      </div>
    );
  }
}
