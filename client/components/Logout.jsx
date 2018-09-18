import React, { Component } from 'react';
import { connect } from 'react-redux';

import { logoutUser } from '../actions/logout';

class Logout extends Component {
  constructor(props) {
    super(props);
    // this.state = {  }
    this.logMeout = this.logMeout.bind(this);
  }

  logMeout() {
    this.props.logoutUser();
    this.props.logOut();
  }

  render() {
    return (
      <button className="btn btn-primary m-1" onClick={this.logMeout}>
        Logout
      </button>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
