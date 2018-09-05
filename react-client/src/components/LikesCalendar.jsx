import React from 'react';

// map likes passed down from props to a calendar
// find a calendar component to put in here
const LikesCalendar = (props) => (
  <div>
    <h4> Calendar </h4>
    {props.likes.map(like => <Likes like={like}/>)}
  </div>
)


export default LikesCalendar;