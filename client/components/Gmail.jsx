import React from 'react';
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
          <span>Analytics</span>
        </GoogleLogin>
        <GoogleLogin
          clientId={clientId}
          scope="https://www.googleapis.com/auth/adwords"
          onSuccess={success}
          onFailure={error}
          onRequest={loading}
          approvalPrompt="force"
          responseType="code"
          // uxMode="redirect"
          // redirectUri="http://google.com"
          // disabled
          // prompt="consent"
          // className='button'
          // style={{ color: 'red' }}
        >
          <span>Adwords</span>
        </GoogleLogin>
        <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
      </div>
    );
  }
}
