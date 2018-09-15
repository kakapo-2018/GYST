import React, { Component } from 'react';

import DbAPIreq from './dbAPIreq';
import ExtAPIreq from './extAPIreq';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>Hello World</h1>

          <DbAPIreq />
          <ExtAPIreq />
        </div>
      </div>
    );
  }
}

export default App;
