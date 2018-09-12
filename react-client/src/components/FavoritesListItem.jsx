import React from 'react';

const FavoriteListItem = ({ removeFave, favorite, getFaves }) => (
  <div>
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

export default FavoriteListItem;
