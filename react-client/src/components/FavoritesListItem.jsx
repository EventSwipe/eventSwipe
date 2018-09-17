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
    const styleForCard = { backgroundImage: 'linear-gradient(to right, #70c0cc , #56bca7)', width: 435, height: 600, marginBottom: 60, overflow: 'auto' };
    const styleForPrice = { color: 'white', marginBottom: 5, wordWrap: 'break-word' };
    const styleForImage = { width: 350, height: 340, paddingBottom: 20, paddingLeft: 20 };
    const styleTextBlack = { color: '#343a40' };
    const styleTextWhite = { color: 'white' };
    const time = favorite && favorite.time ? favorite.time : 'Event Time Not Provided';
    const address = favorite && favorite.location ? favorite.location : 'Address Not Provided (Click Link For More';
    const description = favorite && favorite.description && (favorite.description.length >= 300) ? <span><b style={{ color: '#343a40'}}>Description: </b>{favorite.description.substring(0, 300)}</span> : <span><b style={{ color: '#343a40'}}>Description: </b>{favorite.description ? favorite.description.substring(0, favorite.description.length) : favorite.name}</span>;
    return (
      <div id="show" className="card" style={styleForCard}>
        <div className="card-body" style={{ width: 400, color: '#015249' }}>
          <span className="card-text">
            <button 
              className="btn btn-dark"
              style={{ marginBottom: 10, marginLeft: 13 }}
              onClick={() => {
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
          <p className="card-text" style={styleTextWhite}>{description}</p>
        </div>
      </div>
    );
  }
}
