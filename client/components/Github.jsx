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

class Github extends Component {
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
        request.get('/users/lukechadwick')
            .then(res => {
                console.log(res);
                
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
                        <div className="user_issue">{console.log(this.state.userDatas)}</div>
                        <p className="user_img"><img className={classes.card} src={this.state.userDatas.avatar_url} /></p>
                        <div className="user_name">{this.state.userDatas.name}</div>
                        <div className="user_id">{this.state.userDatas.login}</div>
                        <div className="user_followArea">
                            <div className="user_followers">followers:{this.state.userDatas.followers}</div>
                            <div className="user_following">following:{this.state.userDatas.following}</div>
                        </div>
                    </div>
                </Card>
           
        );
    }
}

export default withStyles(styles)(Github)