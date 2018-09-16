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
    const style = { backgroundImage: 'linear-gradient(to right, #70c0cc , #56bca7)', width: 435, height: 600, marginBottom: 60, overflow: 'auto' };
    const time = favorite && favorite.time ? favorite.time : 'Time Not Given';
    const address = favorite && favorite.location ? favorite.location : 'check out link for event address';
    const description = favorite && favorite.description && (favorite.description.length >= 300) ? <span><b style={{ color: '#343a40'}}>Description: </b>{favorite.description.substring(0, 300)}</span> : <span><b style={{ color: '#343a40'}}>Description: </b>{favorite.description ? favorite.description.substring(0, favorite.description.length) : favorite.name}</span>;
    return (
      
      <div id="show" className="card" style={style}>
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
            >Delete Event
            </button>
          </span>
          <img className="event-img" style={{ width: 350, height: 340, paddingBottom: 20, paddingLeft: 20 }} src={favorite.logo || 'http://tiny.cc/vaikyy'} />
          <p className="card-title" style={{ color: 'white' }}><a href={favorite.url}>{favorite.name}</a></p>
          <p className="card-text" style={{ color: 'white' }}><span><b style={{ color: '#343a40' }}>Time: </b>{time}</span></p>
          <p className="card-text" style={{ color: 'white' }}><span><b style={{ color: '#343a40' }}>Address: </b>{address}</span></p>
          <p className="card-text" style={{ color: 'white' }}>{description}</p>
          <p className="card-text" style={{ color: 'white' }}><span><b style={{ color: '#343a40'}}>Date: </b>{favorite.date.substr(0, 10)}</span></p>
          <p className="card-text"><b style={{ color: '#343a40', marginBottom: 5, wordWrap: 'break-word' }}>Price: </b><b>{favorite.free || 'N/A'}</b></p>
        </div>
      </div>
    );
  }
}
