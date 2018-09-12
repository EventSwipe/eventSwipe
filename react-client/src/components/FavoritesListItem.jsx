import React from 'react';

class FavoriteListItem extends React.Component {
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
    return (
      <div id="show">
        <img style={{ width: 280, height: 300, paddingBottom: 10 }} src={favorite.logo || 'https://dubsism.files.wordpress.com/2017/12/image-not-found.png'} />
        <button 
          className="btn btn-dark"
          onClick={() => {
            removeFave(favorite);
            getFaves();
          }}
        >
          Delete Event
        </button>
        <br />
        <a href={favorite.url}>{favorite.name}</a>
        <br/>
        <b>Description: </b> {favorite.description.substr(0, 200)}
        <br /> 
        <b>Date:</b> {favorite.date.substr(0, 10)}
        <br /> 
        <b>Price:</b> {<b>favorite.free</b> ? <b>"FREE!"</b> : null}
      </div>
    );
  }
}

export default FavoriteListItem;
