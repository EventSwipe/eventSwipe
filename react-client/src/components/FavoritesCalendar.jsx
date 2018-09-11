import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

class FavoritesCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { events: [] };
    this.getFaves = this.getFaves.bind(this);
  }

  componentDidMount() {
    this.getFaves();
  }

  getFaves() {
    axios.get('/favorites')
      .then(({data}) => {
        let promise = Promise.all(data.map((event, i) => {
          let obj = {};
          obj['id'] = i;
          obj['start'] = new Date(moment(event.date));
          obj['end'] = new Date(moment(event.end));
          obj['title'] = event.name.substring(0, 50);
          return obj;
        }));
        promise
          .then(events => this.setState({ events }))
          .catch(e => console.error('err in getFaves FavoritesCalendar.jsx', err));
      })
      .catch(err => console.error('err in getFaves in FavoritesCalendar.jsx', err));
  }

  render() {
    const { events } = this.state;
    return (
      <div className="calendar">
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={events}
          style={{ height: '100vh', paddingBottom: 20, paddingTop: 5, paddingLeft: 20, paddingRight: 20 }}
        />
      </div>
    );
  }
}

export default FavoritesCalendar;