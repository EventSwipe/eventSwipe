import React from 'react';

const Jumbotron = () => (
  <div className="jumbotron" style={{ color: 'rgb(8, 146, 66)', marginTop: 30, marginBottom: 115 }}>
    <h1 className="display-4">Welcome to EventSwipe</h1>
    <p className="lead">Search for events based on zip code, event type, and date range</p>
    <hr className="my-4" />
    <p>This app was designed to help you find events, save them, and view them conveniently.</p>
  </div>
);

export default Jumbotron;