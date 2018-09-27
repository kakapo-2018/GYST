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
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing.unit
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
    // this.props.logOut();
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
