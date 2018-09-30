import React from 'react';
import request from 'superagent';
// import { GoogleLogout, GoogleLogin } from '../src/index'
import GoogleLogin, { GoogleLogout } from 'react-google-login';
// import FontAwesome from 'react-fontawesome';

const clientId =
  '693624776345-6k38ssbajdd9s3fa9qo1m1kq9lhis0ir.apps.googleusercontent.com';

const success = response => {
  console.log(response);
};

const error = response => {
  console.error(response);
};

const loading = () => {
  console.log('loading');
};

const logout = () => {
  console.log('logout');
};

export default class Gmail extends React.Component {
  constructor(props) {
    super(props);
    this.fetch = this.fetch.bind(this);
  }

  fetch() {
    request
      .get(
        'https://www.googleapis.com/gmail/v1/users/102080572213110501793/messages'
      )
      .then(res => {
        console.log(res);

        // res.body, res.headers, res.status
      })
      .catch(err => {
        console.log(err);

        // err.message, err.response
      });
  }
  render() {
    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          onSuccess={success}
          onFailure={error}
          onRequest={loading}
          offline={false}
          approvalPrompt="force"
          responseType="id_token"
          isSignedIn
          // disabled
          // prompt="consent"
          // className='button'
          // style={{ color: 'red' }}
        >
          <span>Gmail Login</span>
        </GoogleLogin>
        <button onClick={this.fetch}>Get fkn emails boiii</button>
        <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
      </div>
    );
  }
}
