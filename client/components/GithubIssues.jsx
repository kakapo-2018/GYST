import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  img: {
    maxWidth: '25%',
    maxHeight: '25%',
    float: 'left'
  }
});

class GithubIssues extends Component {
  constructor() {
    super();
    this.state = {
      userDatas: []
    };
  }
  componentWillMount() {
    const request = axios.create({
      baseURL: 'https://api.github.com'
    });
    request.get('repos/kakapo-2018/Personal-Dashboard').then(res => {
      this.setState({
        userDatas: res.data
      });
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <Paper
        style={{
          padding: '10px',
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%'
        }}
      >
        <header className="header" />
        <div className="user">
          <img className={classes.img} src="./github.png" />

          <div className="user_name">{this.state.userDatas.name}</div>
          <div className="repo_issues">
            <div className="issue_count">
              Issues:
              {this.state.userDatas.open_issues_count}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(GithubIssues);
