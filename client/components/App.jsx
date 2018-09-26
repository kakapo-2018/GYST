import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Logout from './Logout';

import { isAuthenticated, getUserTokenInfo } from '../utils/auth';
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

import PersistentDrawer from './Drawer';

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
      <React.Fragment>
        <CssBaseline />
        <PersistentDrawer />
        {/* <div className="container">
          <div className="jumbotron">
            <Button variant="contained" color="primary" className="mdc-button">
              Primary
            </Button>
            <h1>Hello World</h1>
            <p>
              {this.state.authenticated ? 'Logged in as: ' : 'Please log in'}
            </p>
            <p>{this.state.authenticated && getUserTokenInfo().username}</p>
            <Link to="/">
              <Button
                className="TextButtons-button-1"
                onClick={() => this.forceUpdate()}
              >
                Home
              </Button>
            </Link>
            <Link to="/db">
              <Button className="btn btn-primary m-1">Database Query</Button>
            </Link>
            <Link to="/ext">
              <Button className="btn btn-primary m-1">
                External API Query
              </Button>
            </Link>
            {!this.state.authenticated && (
              <React.Fragment>
                <Link to="/register">
                  <Button className="btn btn-primary m-1">Register</Button>
                </Link>
                <Link to="/login">
                  <Button className="btn btn-primary m-1">Login</Button>
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
        </div> */}
      </React.Fragment>
    );
  }
}

export default App;
