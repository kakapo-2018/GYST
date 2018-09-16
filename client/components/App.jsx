import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <h1>Hello World</h1>

            <Link to="/">
              <button className="btn btn-primary">Home</button>
            </Link>

            <Link to="/db">
              <button className="btn btn-primary m-4">DB req</button>
            </Link>

            <Link to="/ext">
              <button className="btn btn-primary">API req</button>
            </Link>

            <Route exact path="/db" component={InternapAPI} />
            <Route exact path="/ext" component={ExternalAPI} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
