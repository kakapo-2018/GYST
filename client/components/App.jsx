import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

const request = require('superagent');

import InternapAPI from './InternapAPI';
import ExternalAPI from './ExternalAPI';

class App extends Component {
  onClickButton(event) {
    event.preventDefault();

    // request
    //   .post('/api/v1/auth/login', {})
    //   .send({ username: 'luke2', password: '12345' })
    //   .then(response => {
    //     console.log(response);
    //   });

    request
      .post('/api/v1/auth/login')
      .type('form')
      .send({ username: 'Luke2', password: '12345' })
      .set('Accept', /application\/json/)

      .end(function(err, res) {
        console.log(res);
      });
  }

  render() {
    return (
      <Router>
        <div className="container">
          <div className="jumbotron">
            <h1>Hello World</h1>

            <Link to="/">
              <button className="btn btn-primary">Home</button>
            </Link>

            <Link to="/db">
              <button className="btn btn-primary m-4">DB req</button>
            </Link>

            <Link to="/ext">
              <button className="btn btn-primary">API req</button>
            </Link>

            <Route exact path="/db" component={InternapAPI} />
            <Route exact path="/ext" component={ExternalAPI} />

            <h3>Sign up below</h3>
            <form name="form" action="/api/v1/auth/register" method="POST">
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </form>
            <br />
            <h3>Login below</h3>
            <form name="form2" action="/api/v1/auth/login" method="POST">
              <div className="form-group">
                <label>User Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button
                onClick={this.onClickButton}
                type="submit"
                className="btn btn-primary"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
