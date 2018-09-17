import React from 'react';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import '!style-loader!css-loader!react-big-calendar/lib/addons/dragAndDrop/styles.css';
import '!style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css';

Calendar.setLocalizer(Calendar.momentLocalizer(moment));

export default class FavoritesCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFaves();
  }

  render() {
    const { favorites } = this.props;
    return (
      <div className="calendar" style={{ marginTop: 25 }}>
        <Calendar
          defaultDate={new Date()}
          defaultView="month"
          events={favorites}
          style={{ height: '80vh', marginBottom: 30, paddingTop: 5, paddingLeft: 20, paddingRight: 20 }}
        />
      </div>
    );
  }
}