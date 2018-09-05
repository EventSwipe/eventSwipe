import React from 'react';

// just make a list of all the likes passed down by props
const LikesList = (props) => (
  <div>
    <h4> Likes </h4>
    <ul>
    {props.likes.map(like => <li>{like={like}}</li>)}
    </ul>
  </div>
)


export default LikesList;