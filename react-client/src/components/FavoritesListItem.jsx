import React from 'react';

class FavoritesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hover: false };
    this.handleMouseIn = this.handleMouseIn.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
  }

  handleMouseIn() {
    this.setState({ hover: true });
  }
  
  handleMouseOut() {
    this.setState({ hover: false });
  }

  render () {
    const { favorite, removeFave } = this.props;
    const tooltipStyle = { display: this.state.hover ? 'block' : 'none' };
    return (
      <span>
        {console.log(this.props.favorite)}
        <a href={favorite.url} 
          onMouseOver={this.handleMouseIn.bind(this)} 
          onMouseOut={this.handleMouseOut.bind(this)}>
          {favorite.name}
        </a>, 
        <span style={tooltipStyle}>
          <img style={{ width: 410, height: 300 }} src={favorite.logo} />
          {favorite.description} 
        </span>
        Date: {favorite.date.substr(0, 10)} 
        {favorite.free ? <b>"FREE!!!"</b> : null}
        <button onClick={() => removeFave(favorite)}>
          Delete
        </button>
    ))
      </span>
    );
  }
}

export default FavoritesList;
