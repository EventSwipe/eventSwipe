import React from 'react';

const Nav = ({ home, showFaves }) => (
  <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#015249'} }>
    <div className="navbar-brand" style={{ color: 'white' }}>EventSwipe</div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <a className="nav-link" href="#" onClick={home} style={{ color: 'white' }}>
            Search Events
            <span className="sr-only">(current)</span>
          </a>
        </li>
        <li className="nav-item active">
          <a className="nav-link" href="#" onClick={showFaves} style={{ color: 'white' }}>
            Favorite Events
            <span className="sr-only">(current)</span>
          </a>
        </li>
      </ul>
    </div>
    <div>
      <div className="nav-item" style={{ color: 'white' }}>
        <a className="nav-link disabled" href="#" style={{ color: 'rgb(165, 165, 175)' }}>Signout</a>
      </div>
    </div>
    {/* </ul> */}
  </nav>
);

export default Nav;
