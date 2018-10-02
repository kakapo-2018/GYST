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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      height: 700,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit
  },
  input: {
    marginBottom: '30px'
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
      image: '',
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
    if (this.state.image == '') {
      const { username, email, password } = this.state;
      let image = 'https://i.imgur.com/jNNT4LE.png';
      const creds = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        image: image.trim()
      };
      this.props.registerUser(creds);
    } else {
      const { username, email, password, image } = this.state;
      const creds = {
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
        image: image.trim()
      };
      this.props.registerUser(creds);
    }
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
            <p style={{ color: 'red' }}>{this.props.state.errorMessage}</p>
            <ValidatorForm
              onSubmit={this.handleClick}
              name="Login"
              action="/api/v1/auth/login"
              method="POST"
              className={this.state.classes.form}
            >
              <InputLabel htmlFor="username">User name</InputLabel>
              <TextValidator
                autoFocus={true}
                className={this.state.classes.input}
                fullWidth
                onChange={this.handleChange}
                id="username"
                name="username"
                value={this.state.username || ''}
                validators={['required', 'matchRegexp:^([A-Za-z0-9]){4,20}$']}
                errorMessages={[
                  'username is required',
                  'minimum 4 characters - no special characters'
                ]}
              />
              <InputLabel htmlFor="password">Password</InputLabel>
              <TextValidator
                validators={['required', 'matchRegexp:^([A-Za-z0-9]){4,20}$']}
                fullWidth
                errorMessages={[
                  'password is required',
                  'minimum 4 characters - no special characters'
                ]}
                className={this.state.classes.input}
                onChange={this.handleChange}
                name="password"
                type="password"
                id="password"
                value={this.state.password || ''}
                autoComplete="current-password"
              />
              <InputLabel htmlFor="password">Email Address</InputLabel>
              <TextValidator
                validators={['required', 'isEmail']}
                fullWidth
                errorMessages={['email is required', 'email format please']}
                className={this.state.classes.input}
                onChange={this.handleChange}
                name="email"
                type="email"
                id="email"
                value={this.state.email || ''}
                autoComplete="current-email"
              />
              <InputLabel htmlFor="image">Profile Image (optional)</InputLabel>
              <TextValidator
                fullWidth
                onChange={this.handleChange}
                name="image"
                type="text"
                value={this.state.image}
                className={this.state.classes.input}
                id="image"
                autoComplete="current-image"
              />
              <Button
                type="submit"
                fullWidth
                variant="raised"
                color="primary"
                className={this.state.classes.submit}
              >
                Register
              </Button>
              <Button
                fullWidth
                variant="raised"
                color="primary"
                onClick={this.props.toggleLogin}
                className={this.state.classes.submit}
              >
                Back to sign in
              </Button>
            </ValidatorForm>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}
Register.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    state: state.auth
  };
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
    mapStateToProps,
    mapDispatchToProps
  )(Register)
);
