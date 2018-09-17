import React, { Component } from 'react';
const request = require('superagent');

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  loginUser(creds) {
    request
      .post('/api/v1/auth/login')
      .type('form')
      .send(creds)
      .set('Accept', /application\/json/)
      .end(function(err, res) {
        console.log(res);
      });
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const creds = {
      username: username.trim(),
      password: password.trim()
    };
    this.loginUser(creds);
  }

  render() {
    return (
      <form name="Login" action="/api/v1/auth/login" method="POST">
        <h3>Login below</h3>
        <div className="form-group">
          <label>User Name</label>
          <input
            type="text"
            className="form-control"
            name="username"
            placeholder="Enter username"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </div>
        <button onClick={this.handleClick} className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
