import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <h1>Hello World</h1>
            <Link to="/">
              <button className="btn btn-primary m-1">Home</button>
            </Link>
            <Link to="/db">
              <button className="btn btn-primary m-1">DB req</button>
            </Link>
            <Link to="/ext">
              <button className="btn btn-primary m-1">API req</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-primary m-1">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-primary m-1">Login</button>
            </Link>
            <Route exact path="/db" component={InternapAPI} />
            <Route exact path="/ext" component={ExternalAPI} />
            <Route exact path="/register" component={RegisterForm} />
            <Route exact path="/login" component={LoginForm} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
