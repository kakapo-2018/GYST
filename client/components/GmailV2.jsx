import React from 'react';
import GoogleLogin from 'react-google-login';

//my object from a previous example that worked
const gmailObject = {
  client_id:
    '693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com',
  libraries: [
    {
      name: 'compute',
      version: 'v1'
    },
    {
      name: 'drive',
      version: 'v2'
    },
    {
      name: 'gmail',
      version: 'v1'
    },
    {
      name: 'calendar',
      version: 'v3'
    }
  ],
  scopes: [
    'profile scope added automatically',
    'https://www.googleapis.com/auth/compute.readonly',
    'https://www.googleapis.com/auth/compute',
    'https://www.googleapis.com/auth/cloud-platform',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/gmail.labels'
  ]
};

var superagent = require('superagent'),
  request = superagent;
//   request = require('superagent-oauth2-client')(superagent),
//   OAuth = require('oauth2-client-js');

// define a single oauth provider
// will use localstorage to save tokens
// var provider = new OAuth.Provider({
//   id: 'google',
//   authorization_url: 'https://accounts.google.com/o/oauth2/auth'
// });

//react component with information in state
class Gmail2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { token: '', idToken: '', profileId: '' };
    this.emails = this.emails.bind(this);
  }

  //button press activates this
  emails() {
    console.log('button clicked');
    console.log(this.state);

    request
      //get request for the gmail labels endpoint
      .get(`https://www.googleapis.com/gmail/v1/users/me/labels/UNREAD`)
      .set('Authorization', `Bearer ${this.state.token}`)
      //   .oauth(provider, {
      //     redirect_uri: 'http://localhost',
      //     scope: 'https://mail.google.com/',
      //     client_id:
      //       '693624776345-6m4dueo8j91np8gk9cnjv187p3mn18p6.apps.googleusercontent.com'
      //   })
      //   .exec()
      .then(res => console.log(res.body)) // business logic
      .catch(); // error handling
  }

  render() {
    //logging the response and setting it in state
    const responseGoogle = response => {
      console.log(response);
      this.setState({
        token: response.accessToken,
        idToken: response.tokenId,
        profileId: response.profileObj.googleId
      });
    };
    //google button
    return (
      <div>
        <GoogleLogin
          clientId="693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          scope="https://www.googleapis.com/auth/gmail.labels"
        />
        {/* my button */}
        <button onClick={this.emails}>Unread Emails</button>
      </div>
    );
  }
}

export default Gmail2;
