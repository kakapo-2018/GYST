import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  img: {
    maxWidth: '30%',
    maxHeight: '30%',
    marginLeft: '3%',
    float: 'left'
  },
  box: {
    textAlign: 'center'
  },
  repo: {
    padding: '5% 0% 4% 0%'
  },
  header: {
    margin: '0%'
  },
  btn: {
    margin:'2% 5% 0% 17%'
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
          maxWidth: '100%',
          minHeight: '100%'
        }}
      >
        {' '}

          <header className={classes.header} />
          <div className={classes.box}>
            <img className={classes.img} src="./github.png" />

            <div className={classes.repo}>{this.state.userDatas.name}</div>
            <div className={classes.issue}>
              <div className={classes.count}>
                Issues:
                {this.state.userDatas.open_issues_count}
              </div>
            </div>
          </div>
          <Button
          className={classes.btn}
          href="https://github.com/kakapo-2018/Personal-Dashboard"
          target="_blank"
          variant="contained" color="primary"
        >
        Go to github
        </Button>
      </Paper>
    );
  }
}

export default withStyles(styles)(GithubIssues);
