import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Logout extends Component {
  constructor(props) {
    super(props);
    this.logMeout = this.logMeout.bind(this);
  }

  logMeout() {
    this.props.logoutUser();
  }

  render() {
    return (
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        onClick={this.logMeout}
        className={this.props.classes.submit}
      >
        Logout
      </Button>
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

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
