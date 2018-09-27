import React, { Component, Fragment } from 'react';
import axios from 'axios';
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    card: {
      backgroundColor: "#FAFAFA",
      maxWidth: 275
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
        })
        request.get('repos/kakapo-2018/Personal-Dashboard')
            .then(res => {
                this.setState({
                    userDatas: res.data
                });
            })
    }
    render() {
        const { classes } = this.props;
        return (
           
                <Card className={classes.card}>
                    <header className="header"></header>
                    <div className="user">
                        <div><img className={classes.card} src="./github.png" /></div>
                        <div className="user_name">{this.state.userDatas.name}</div>
                        <div className="repo_issues">
                            <div className="issue_count">Issues:{this.state.userDatas.open_issues_count}</div>
                        </div>
                    </div>
                </Card>
           
        );
    }
}

export default withStyles(styles)(GithubIssues)
