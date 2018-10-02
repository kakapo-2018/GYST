//external imports
import React from 'react';
import GoogleLogin from 'react-google-login';
var superagent = require('superagent'),
  request = superagent;
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
import EmailIcon from '@material-ui/icons/Email';
import Divider from '@material-ui/core/Divider';

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
class Gmail2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      idToken: '',
      profileId: '',
      unread: 'Please login',
      buttonVisible: true,
      msgList: '',
      individualMsg: false
    };
    this.emails = this.emails.bind(this);
    this.seeEmails = this.seeEmails.bind(this);
    this.getMessage = this.getMessage.bind(this);
  }

  seeEmails() {
    request
      //get request for the gmail labels endpoint
      .get(
        `https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=10`
      )
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        return res.body.messages.map(msg => msg.id);
      })
      .then(messageIds => {
        return Promise.all(
          messageIds.map(messageId => {
            return request
              .get(
                `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`
              )
              .set('Authorization', `Bearer ${this.state.token}`)
              .then(res => {
                return res.body;
              });
          })
        );
      })
      .then(allMessages => {
        this.setState({
          msgList: allMessages
        });
      });
  }

  emails() {
    request
      //get request for the gmail labels endpoint
      .get(`https://www.googleapis.com/gmail/v1/users/me/labels/UNREAD`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        this.setState({ unread: res.body.messagesUnread });
      });
  }

  getMessage(msg) {
    request
      //get request for the gmail labels endpoint
      .get(`https://www.googleapis.com/gmail/v1/users/me/messages/${msg}`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        this.setState({
          individualMsgRes: res.body.snippet,
          individualMsg: true
        });
      })
      .catch();
  }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      this.setState({
        token: response.accessToken,
        idToken: response.tokenId,
        profileId: response.profileObj.googleId,
        buttonVisible: false,
        unread: 'Logged in'
      });
    };
    const { classes } = this.props;

    //google button
    return (
      <Card className={classes.card}>
        <AppBar className={classes.appbar}>
          <Typography
            className={classes.header}
            variant="headline"
            component="h2"
          >
            Unread Emails: {this.state.unread}
          </Typography>
        </AppBar>
        <div style={{ paddingTop: 32 }}>
          <CardContent>
            {this.state.msgList &&
              !this.state.individualMsg && (
                <List>
                  {this.state.msgList.map(msg => {
                    return (
                      <React.Fragment>
                        <ListItem key={msg.id}>
                          <a
                            target="_blank"
                            href={`https://mail.google.com/mail/u/0/#inbox/${
                              msg.id
                            }`}
                          >
                            <ListItemText>
                              <ListItemIcon>
                                <EmailIcon />
                              </ListItemIcon>
                              {msg.snippet}
                            </ListItemText>
                          </a>
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    );
                  })}
                </List>
              )}
            {this.state.individualMsg && <p>{this.state.individualMsgRes}</p>}
            {this.state.buttonVisible && (
              <GoogleLogin
                clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
                redirectUri="http://gyst-dash.herokuapp.com"
                buttonText="Google Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                scope="https://mail.google.com/"
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
                    onClick={this.emails}
                  >
                    Check Unread
                  </Button>
                  <Button
                    onClick={this.seeEmails}
                    variant="contained"
                    size="large"
                    color="primary"
                  >
                    Inbox
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

Gmail2.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gmail2);
