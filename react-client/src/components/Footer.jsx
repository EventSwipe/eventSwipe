import React from 'react';

const Footer = ({ show }) => (
  <div className="footer" style={{ position: 'relative', bottom: 0, center: 0, height: 50, marginTop: show ? 40 : 250 }}>
    <p>
      <span>© 2018 Team-Fleming Inc. Associated with Hack Reactor. All rights reserved. </span>
      <span>
        Event information provided by: &nbsp;
        <a target="_blank" href="https://www.eventbrite.com/developer/v3/" style={{ fontWeight: 'bold', fontSize: 17, textDecoration: 'underline' }}>EventBrite</a>&nbsp;
        <a target="_blank" href="https://www.meetup.com/meetup_api/" style={{ fontWeight: 'bold', fontSize: 17, textDecoration: 'underline' }}>MeetUp</a>&nbsp;
        <a target="_blank" href="https://www.zipcodeapi.com/" style={{ fontWeight: 'bold', fontSize: 17, textDecoration: 'underline' }}>ZipCode API</a>
      </span>
    </p>
  </div>
);

export default Footer;