import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/logout';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  submit: {
    marginBottom: theme.spacing.unit * 3
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
    const { classes } = this.props;

    return (
      <Button
        type="submit"
        fullWidth
        variant="raised"
        color="primary"
        onClick={this.logMeout}
        className={classes.submit}
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
