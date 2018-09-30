import React, { Component } from 'react';
import { isAuthenticated, getUserTokenInfo } from '../utils/auth';
import { connect } from 'react-redux';

var lastmsg = '';

//Sockets
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000');

socket.on('chat message', function(msg) {
  if (lastmsg != msg) {
    addResponseMessage(msg);
  }
});

//Chat
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage
} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

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

  handleNewUserMessage = newMessage => {
    lastmsg = newMessage;
    console.log(`New message incomig! ${newMessage}`);
    socket.emit('chat message', newMessage);
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    this.setState({
      authenticated: isAuthenticated()
    });
    addResponseMessage('Welcome to this awesome chat!');
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
        <Widget handleNewUserMessage={this.handleNewUserMessage} />

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
