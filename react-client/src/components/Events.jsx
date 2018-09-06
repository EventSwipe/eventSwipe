import React from 'react';
import Event from './Event.jsx';
import axios from 'axios';
//maps all events to each eventTinder item

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.dislike = this.dislike.bind(this);
    this.like = this.like.bind(this);
  }
  componentDidMount() {
    let q = {
      name: 'ROOFTOP PARTY SATURDAY NIGHT | HUDSON TERRACE',
      description: "For BOTTLE SERVICE please email us at BOOKING (Add details) \r\n \r\nROOFTOP PARTY SATURDAY NIGHT   \r\nat\r\nHUDSON TERRACE ROOFTOP    \r\nNEW YORK CITY NIGHTCLUB \r\n621 West 46th Street \r\n \r\nMusic by :\r\nDJ DUBBS & GUEST\r\n \r\nDoors Open at 11pm\r\n \r\nTABLE RESERVATION FOR BOTTLE SERVICE, B'DAY PARTY OR ANY EVENT Please  send us an email to BOOKING\r\n \r\nGirls free till 12am $20 after  & Gents $20 -30 ( please arrive early to avoid long lines ) \r\n \r\n 21 and over with proper ID /FINAL ENTRENCE IS UPTO THE DOORMAN Discretion\r\n \r\n Must show tickets or SAY ICLUBNYC LIST  AT THE DOOR TO GET RIGHT IN \r\n \r\nSTRICT DRESS CODE POLICY: -Gentlemen: Shoes, Button down shirts, and jeans are acceptable. No \r\nbaggy attire, Sneakers, Boots, or Hats are allowed. -Ladies: Heels & classy look Please\r\n \r\n \r\nCONTACT US\r\n www.iclubnyc.com\r\n \r\n \r\n\r\n\r\nCLICK ON IMAGE \r\n\r\n\r\n\r\n",
      id: '565656',
      url: 'https://www.eventbrite.com/e/rooftop-party-saturday-night-hudson-terrace-tickets-17434703668?aff=ebapi',
      date: '2018-09-08T23:00:00',
      free: true
    };
    
    axios.post('/favorites',{params: {favoriteEvent: q}})
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    })

  }
  //TODO: Add axios post to the server
  //TODO: Search again if no more items left
  like() {
    //axios post
    
    if (this.state.count >= this.props.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count + 1 });
    }

    //what to do when we run out of suggestions?

  }
  dislike() {
    if (this.state.count >= this.props.events.length-1) {
      this.setState({ count: 0 })
    } else {
      this.setState({ count: this.state.count + 1 });
    }
  }

  render() {
    return (
      <div>
        <Event event={this.props.events[this.state.count]} like={this.like} dislike={this.dislike}/> 
      </div>
    );
  }
}
export default Events;
