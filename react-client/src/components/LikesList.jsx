import React from 'react';

// just make a list of all the likes passed down by props
const LikesList = (props) => (
  <div>
    <h4> Likes </h4>
    {props.likes.map(like => <Likes like={like}/>)}
  </div>
)


export default LikesList;