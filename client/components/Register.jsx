import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../actions/register';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Email from '@material-ui/icons/Email';
import Photo from '@material-ui/icons/Photo';

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
    width: '100%',
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      image: 'https://i.imgur.com/jNNT4LE.png',
      classes: this.props.classes
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { username, email, password, image } = this.state;
    const creds = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      image: image.trim()
    };
    this.props.registerUser(creds);
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={this.state.classes.layout}>
          <Paper className={this.state.classes.paper}>
            <Avatar className={this.state.classes.avatar}>
              <PersonAdd />
            </Avatar>
            <Typography variant="headline">Register</Typography>
            <form
              name="Login"
              action="/api/v1/auth/login"
              method="POST"
              className={this.state.classes.form}
            >
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="username">User name</InputLabel>
                <Input
                  onChange={this.handleChange}
                  id="username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email address</InputLabel>
                <Input
                  onChange={this.handleChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  startAdornment={
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={this.handleChange}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  startAdornment={
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="password">
                  Profile Image (Optional)
                </InputLabel>
                <Input
                  onChange={this.handleChange}
                  name="image"
                  type="text"
                  id="image"
                  autoComplete="profile image"
                  startAdornment={
                    <InputAdornment position="start">
                      <Photo />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                onClick={this.handleClick}
                className={this.state.classes.submit}
              >
                Register
              </Button>
            </form>
            <Button
              fullWidth
              variant="raised"
              color="primary"
              onClick={this.props.toggleLogin}
              className={this.state.classes.submit}
            >
              Back
            </Button>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => {
  return {
    registerUser: creds => {
      return dispatch(registerUser(creds));
    },
    registerError: message => {
      dispatch(registerError(message));
    }
  };
};

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps
  )(Register)
);
