import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logout from './Logout';

import { isAuthenticated, getUserTokenInfo } from '../utils/auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loggedInAs: ''
    };
    this.logOut = this.logOut.bind(this);
    this.refreshLoginState = this.refreshLoginState.bind(this);
  }

  componentDidMount() {
    this.setState({
      authenticated: isAuthenticated()
    });
  }

  logOut() {
    this.setState({ authenticated: false });
  }

  refreshLoginState() {
    this.setState({
      authenticated: isAuthenticated()
    });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <h1>Hello World</h1>
            <p>
              {this.state.authenticated ? 'Logged in as: ' : 'Please log in'}
            </p>
            <p>{this.state.authenticated && getUserTokenInfo().username}</p>
            <Link to="/">
              <button
                className="btn btn-primary m-1"
                onClick={() => this.forceUpdate()}
              >
                Home
              </button>
            </Link>
            <Link to="/db">
              <button className="btn btn-primary m-1">Database Query</button>
            </Link>
            <Link to="/ext">
              <button className="btn btn-primary m-1">
                External API Query
              </button>
            </Link>
            {!this.state.authenticated && (
              <React.Fragment>
                <Link to="/register">
                  <button className="btn btn-primary m-1">Register</button>
                </Link>
                <Link to="/login">
                  <button className="btn btn-primary m-1">Login</button>
                </Link>
              </React.Fragment>
            )}
            {this.state.authenticated && <Logout logOut={this.logOut} />}
            <Route exact path="/db" component={InternapAPI} />
            <Route exact path="/ext" component={ExternalAPI} />

            {!this.state.authenticated && (
              <Route
                exact
                path="/register"
                render={() => (
                  <RegisterForm refreshLoginState={this.refreshLoginState} />
                )}
              />
            )}

            {!this.state.authenticated && (
              <Route
                exact
                path="/login"
                render={() => (
                  <LoginForm refreshLoginState={this.refreshLoginState} />
                )}
              />
            )}
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
