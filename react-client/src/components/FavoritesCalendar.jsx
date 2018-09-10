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

  // get favorites from db and sort out start time, end time is 3 hours after event starts (for now - need to grab time it ends from api and save to db)
  getFaves() {
    axios.get('/favorites')
      .then(({data}) => {
        let promise = Promise.all(data.map((e, i) => {
          let obj = {};
          obj['id'] = i;
          obj['start'] = new Date (e.date.substring(0, 4), e.date.substring(5, 7), e.date.substring(8, 10), e.date.substring(11, 13), e.date.substring(14, 16), 0, 0);
          obj['end'] = new Date(moment(obj.start).add(3, 'hours'));
          obj['title'] = e.name;
          return obj;
        }));
        promise
          .then(events => this.setState({ events }))
          .catch(e => console.error('err', err));
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