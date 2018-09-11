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
        let promise = Promise.all(data.map((e, i) => {
          let obj = {};
          obj['id'] = i;
          obj['start'] = new Date(moment(e.date));
          obj['end'] = new Date(moment(e.end));
          obj['title'] = e.name;
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
          style={{ height: '100vh' }}
        />
      </div>
    );
  }
}

export default FavoritesCalendar;