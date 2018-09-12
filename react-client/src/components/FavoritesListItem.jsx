import React from 'react';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
  }

  render () {
    const { favorite, removeFave } = this.props;
    return (
      <div>
        <img style={{ width: 410, height: 300 }} src={favorite.logo} />
        <button onClick={() => removeFave(favorite)}>Delete</button>
        <br />
        <br />
        <a href={favorite.url}>{favorite.name}</a>
        <br/>
        <b>Description: </b> {favorite.description}
        <br /> 
        <b>Date:</b> {favorite.date.substr(0, 10)}
        <br /> 
        <b>Price:</b> {favorite.free ? <b>"FREE!"</b> : null}
      </div>
    );
  }
}

export default FavoritesList;
