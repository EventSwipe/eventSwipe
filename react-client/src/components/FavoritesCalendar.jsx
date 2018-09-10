import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';
// import Favorites from './Favorites.jsx';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class FavoritesCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      events: [
        {
          start: new Date(),
          end: new Date(moment().add(1, 'days')),
          title: 'HI'
        }
      ]
    };
    this.favesToEvents = this.favesToEvents.bind(this);
  }

  componentDidMount() {
    // this.favesToEvents();
  }

  favesToEvents() {
    const { favorites } = this.props;
    // console.log('123', favoritesToEvents)
    this.setState({ events: favorites });
  }

  render() {
    return (
      <div className="calendar">
        {console.log(this.props.favorites)}
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={this.state.events}
          style={{ height: '100vh' }}
        />
      </div>
    );
  }
}

export default FavoritesCalendar;