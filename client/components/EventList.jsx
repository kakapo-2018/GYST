//external imports
import React from 'react';
import GoogleLogin from 'react-google-login';
var superagent = require('superagent'),
  request = superagent;
import moment from 'moment';
//material UI imports
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardActions from '@material-ui/core/CardActions';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventNote from '@material-ui/icons/EventNote';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    margin: 'auto'
  },
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    overflow: 'auto'
  },
  appbar: {
    position: 'fixed',
    color: 'white',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
  },
  header: {
    color: 'white',
    textAlign: 'center'
  }
});

//react component with information in state
class EventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      email: '',
      idToken: '',
      unread: 'Please login',
      buttonVisible: true,
      msgList: '',
      individualMsg: false,
      calItems: []
    };
    this.events = this.events.bind(this);
  }

  events() {
    let date = new Date().toISOString();
    request
      //get request for the gmail cal endpoint
      .get(
        `https://www.googleapis.com/calendar/v3/calendars/${
          this.state.email
        }/events?maxResults=10&timeMin=${date}
      `
      )
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        this.setState({ calItems: res.body.items });
      });
  }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      this.setState({
        email: response.profileObj.email,
        token: response.accessToken,
        idToken: response.tokenId,
        buttonVisible: false,
        unread: 'Logged in' || response.error
      });
    };
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <AppBar className={classes.appbar}>
          <Typography
            className={classes.header}
            variant="headline"
            component="h2"
          >
            Upcoming events: {this.state.unread}
          </Typography>
        </AppBar>
        <div style={{ paddingTop: 16 }}>
          <CardContent>
            <List>
              {this.state.calItems &&
                this.state.calItems.map(event => {
                  if (event.start.date) {
                    return (
                      <React.Fragment>
                        <ListItem key={event.id}>
                          <ListItemText>
                            <ListItemIcon>
                              <EventNote />
                            </ListItemIcon>
                            <a target="_blank" href={event.htmlLink}>
                              {event.summary}
                            </a>{' '}
                            - {moment(event.start.date).format('MMM Do, YYYY')}
                          </ListItemText>
                          <Divider />
                        </ListItem>
                      </React.Fragment>
                    );
                  } else if (event.start.dateTime) {
                    return (
                      <React.Fragment>
                        <ListItem key={event.id}>
                          <ListItemText>
                            <ListItemIcon>
                              <EventNote />
                            </ListItemIcon>
                            <a target="_blank" href={event.htmlLink}>
                              {event.summary}
                            </a>{' '}
                            -{' '}
                            {moment(event.start.dateTime).format(
                              'MMM Do, YYYY'
                            )}
                          </ListItemText>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  }
                })}
            </List>
            {this.state.buttonVisible && (
              <GoogleLogin
                clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
                redirectUri="http://gyst-dash.herokuapp.com"
                buttonText="Google Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                scope="https://www.googleapis.com/auth/calendar.readonly"
              />
            )}
            <CardActions>
              {this.state.token && (
                <React.Fragment>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.button}
                    onClick={this.events}
                  >
                    Check Events
                  </Button>
                </React.Fragment>
              )}
            </CardActions>
          </CardContent>
        </div>
      </Card>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
