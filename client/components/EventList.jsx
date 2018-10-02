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

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    overflow: 'auto'
  }
});

//react component with information in state to toggle views
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
      //get request for the gmail calendar endpoint
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
    //mapping over returned objects to get event date (parsed) and name
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            Upcoming events: {this.state.unread}
          </Typography>
          <Typography>
            <ol>
              {this.state.calItems &&
                this.state.calItems.map(event => {
                  if (event.start.date) {
                    return (
                      <li key={event.id}>
                        <a target="_blank" href={event.htmlLink}>
                          {event.summary}
                        </a>{' '}
                        - {moment(event.start.date).format('MMM Do, YYYY')}
                      </li>
                    );
                  } else if (event.start.dateTime) {
                    return (
                      <li key={event.id}>
                        <a target="_blank" href={event.htmlLink}>
                          {event.summary}
                        </a>{' '}
                        - {moment(event.start.dateTime).format('MMM Do, YYYY')}
                      </li>
                    );
                  }
                })}
            </ol>
          </Typography>
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
            <Button
              variant="contained"
              size="large"
              color="primary"
              className={classes.button}
              onClick={this.events}
            >
              Check Events
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  }
}

EventList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EventList);
