import React from "react";
import axios from 'axios';
import moment from 'moment';


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
    const { favorite, removeFave } = this.props;

    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none'
    };
    return (
      <span>
        {console.log(this.props.favorite)}
        <a href={favorite.url} 
          onMouseOver={this.handleMouseIn.bind(this)} 
          onMouseOut={this.handleMouseOut.bind(this)}>
          {favorite.name}
        </a>, 
        <span style={tooltipStyle}>
          <img style={{width:410, height:300}} src={favorite.logo} />
          {favorite.description} &nbsp;
        </span>
        Date: {favorite.date.substr(0, 10)} 
        {favorite.free ? <b>"FREE!!!"</b> : null}
        <button
          onClick={() => {
            removeFave(favorite);
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
