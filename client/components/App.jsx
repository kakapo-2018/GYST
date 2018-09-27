import React, { Component } from 'react';
import { isAuthenticated, getUserTokenInfo } from '../utils/auth';
import { connect } from 'react-redux';
//Keep for now
import { Route, Link } from 'react-router-dom';
import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';
import LoginForm from './LoginForm';
// import RegisterForm from './RegisterForm';
import Logout from './Logout';

//Material-UI
import CssBaseline from '@material-ui/core/CssBaseline';

//Components
import PersistentDrawer from './Drawer';
import NavBar from './NavBar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      loggedInAs: '',
      mobileOpen: false
    };
    this.logOut = this.logOut.bind(this);
    this.refreshLoginState = this.refreshLoginState.bind(this);
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

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

        {this.props.state.isAuthenticated && (
          <NavBar
            user={this.props.state.user.username}
            handleDrawerToggle={this.handleDrawerToggle}
          />
        )}
        {!this.props.state.isAuthenticated && (
          <NavBar
            user="Please Register or Login"
            handleDrawerToggle={this.handleDrawerToggle}
          />
        )}

        <PersistentDrawer
          handleDrawerToggle={this.handleDrawerToggle}
          drawerState={this.state.mobileOpen}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.auth
  };
}

export default connect(mapStateToProps)(App);
