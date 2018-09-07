import React from "react";
import axios from 'axios';


class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseIn(e) {
    this.setState({ hover: true });
  }
  
  handleMouseOut(e) {
    this.setState({ hover: false });
  }
// just make a list of all the likes passed down by props
// const FavoritesList = ({ favorites, removeFave }) =>


  render () {
    const { favorite } = this.props;

    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none'
    };
    return (
      <span>
        <a href={favorite.url} 
          onMouseOver={this.handleMouseIn.bind(this)} 
          onMouseOut={this.handleMouseOut.bind(this)}>
          {favorite.name}
        </a>, 
        <span style={tooltipStyle}>
          <img style={{width:410, height:300}} src={favorite.logo} />
          {favorite.description} 
        </span>
        Date: {favorite.date.substring(0, 10)} &nbsp;
        Time: {favorite.date.substring(11, 16)} &nbsp;
        {favorite.free ? <b>"FREE!!!"</b> : null}
        <button
          onClick={() => {
            removeFave(favorites);
          }}
        >
          Delete
        </button>
    ))

      </span>
    );
  }
}

export default FavoritesList;
