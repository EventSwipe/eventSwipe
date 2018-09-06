import React from "react";
import axios from 'axios';


class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
      this.state = {hover: false};

  }

  handleMouseIn(e) {
    this.setState({ hover: true })
  }
  
  handleMouseOut(e) {
    this.setState({ hover: false })
  }
// just make a list of all the likes passed down by props
// const FavoritesList = ({ favorites, removeFave }) =>


render () {
  const tooltipStyle = {
    display: this.state.hover ? 'block' : 'none'
  }
  
  return (
    <span>
  
      {console.log("these are the favorites", this.props.favorite)}
      
        
          <a href={this.props.favorite.url} 
            onMouseOver={this.handleMouseIn.bind(this)} 
            onMouseOut={this.handleMouseOut.bind(this)}>
              {this.props.favorite.name}
          </a>, 
          <span style={tooltipStyle}>
          <img style={{width:410, height:300}} src={this.props.favorite.logo} />
            {this.props.favorite.description} 
          </span>
          Date: {this.props.favorite.date.substring(0, 10)} &nbsp;
          Time: {this.props.favorite.date.substring(11, 16)} &nbsp;
          {this.props.favorite.free ? <b>"FREE!!!"</b> : null}
          <button
            onClick={() => {
              removeFave(this.props.favorites);
            }}
          >
            Delete
          </button>
      ))

  </span>
)
}
}

export default FavoritesList;
