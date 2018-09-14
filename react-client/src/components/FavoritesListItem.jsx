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
    const { removeFave, favorite, getFaves } = this.props;
    const time = favorite && favorite.local_time ? favorite.local_time : favorite && favorite.start ? favorite.start.local.substring(11) : 'Time Not Given';
    const address = favorite && favorite.address ? favorite.address : favorite && favorite.venue && favorite.venue.address ? favorite.venue.address.address_1 + ' ' + favorite.venue.address.city : favorite && favorite.venue && favorite.venue.address_1 ? favorite.venue.address_1 + ' ' + favorite.venue.city || favorite.venue.address.localized_address_display : favorite && favorite.group && favorite.group.localized_location ? favorite.group.localized_location : 'TBD';
    const description = favorite && favorite.description && (favorite.description.length >= 200) ? <span>{favorite.description.substring(0, 100)} {favorite.description.substring(99, 200)}</span> : <span>{favorite.description ? favorite.description.substring(0, favorite.description.length) : favorite.name}</span>
    return (
      
      <div id="show" className="card" style={{ backgroundImage: 'linear-gradient(to right, #70c0cc , #56bca7)', width: 430, height: 780, marginBottom: 60 }}>
        <div className="card-body" style={{ width: 400, color: '#015249' }}>
          <img className="event-img" style={{ width: 350, height: 340, paddingBottom: 20, paddingLeft: 20 }} src={favorite.logo ? favorite.logo : favorite.featured_photo ? favorite.featured_photo.highres_link : 'http://tiny.cc/vaikyy'} />
          <p className="card-text">
            <button 
              className="btn btn-dark"
              onClick={() => {
                removeFave(favorite);
                getFaves();
              }}
            >Delete Event
            </button>
          </p>
          <p className="card-text" style={{ color: 'white'}}><a href={favorite.url}>{favorite.name}</a></p>
          <p className="card-text" style={{ color: 'white'}}><span><b style={{ color: '#343a40' }}>Time: </b>{time}</span></p>
          <p className="card-text" style={{ color: 'white'}}><span><b style={{ color: '#343a40' }}>Address: </b>{address}</span></p>
          <p className="card-text" style={{ color: 'white'}}><span><b style={{ color: '#343a40'}}>Description: </b>{description}</span></p>
          <p className="card-text" style={{ color: 'white'}}><span><b style={{ color: '#343a40'}}>Date: </b>{favorite.date.substr(0, 10)}</span></p>
          <span><b style={{ color: '#343a40', marginBottom: 5 }}>Price: </b>{<b>favorite.free</b> ? <b>"FREE!"</b> : null}</span>
        </div>
      </div>
    );
  }
}
