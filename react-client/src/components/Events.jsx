import React from 'react';
import Event from './Event.jsx';

export default class Events extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <div className="row">
          <div className="col-12">
            <Event events={this.props.events} />  
          </div>
        </div>
      </div>
    );
  }
}

  