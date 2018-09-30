//external imports
import React from 'react';
import GoogleLogin from 'react-google-login';
var superagent = require('superagent'),
  request = superagent;
//material UI imports

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//react component with information in state
class Gmail2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '', idToken: '', profileId: '', unread: '...' };
    this.emails = this.emails.bind(this);
  }

  emails() {
    request
      //get request for the gmail labels endpoint
      .get(`https://www.googleapis.com/gmail/v1/users/me/labels/UNREAD`)
      .set('Authorization', `Bearer ${this.state.token}`)
      .then(res => {
        this.setState({ unread: res.body.messagesUnread });
      })
      .catch();
  }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      this.setState({
        token: response.accessToken,
        idToken: response.tokenId,
        profileId: response.profileObj.googleId
      });
    };
    //google button
    return (
      <Card>
        <CardContent>
          <Typography color="textSecondary">
            Unread Emails: {this.state.unread}
          </Typography>
          <GoogleLogin
            clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
            buttonText="Google Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            scope="https://www.googleapis.com/auth/gmail.labels"
          />
          <button
            style={{
              display: 'block',
              background: 'rgb(209, 72, 54)',
              color: 'rgb(255, 255, 255)',
              width: '190px',
              paddingTop: '10px',
              paddingBottom: '10px',
              borderRadius: '2px',
              border: '1px solid transparent',
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'Roboto'
            }}
            onClick={this.emails}
          >
            Check Email
          </button>
        </CardContent>
      </Card>
    );
  }
}

export default Gmail2;
