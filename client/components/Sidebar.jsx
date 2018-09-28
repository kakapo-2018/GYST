import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import WbSunny from '@material-ui/icons/WbSunny'
import Icon from '@material-ui/core/Icon'
import AttachMoney from '@material-ui/icons/AttachMoney'
import QueueMusic from '@material-ui/icons/QueueMusic'
import AccessTime from '@material-ui/icons/AccessTime'
import Web from '@material-ui/icons/Web'
import Fastfood from '@material-ui/icons/Fastfood'
import Map from '@material-ui/icons/Map'
import ReportProblem from '@material-ui/icons/ReportProblem'
import AirplanemodeActive from '@material-ui/icons/AirplanemodeActive'
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'


const styles = theme => ({
    card: {
        backgroundColor: "transparent",
        color: "white",
        maxWidth: 275,
        zIndex: '3'
    },
    action: {
        display: "flex",
        justifyContent: "center"
    },
    title: {
        marginBottom: 16,
        fontSize: 14
    },
    icon: {
        color: "white",
        textAlign: "center",
        marginTop: "6%"
    },
    sub: {
        color: "white",
        letterSpacing: "2px",
        textAlign: "center",
        marginTop: "5%",
        marginBottom: "5%"
    }
});

class Sidebar extends React.Component {


    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
                <Button>
                    <Typography className={classes.sub}>
                        <Icon ><WbSunny className={classes.icon} /></Icon> Weather
                    </Typography>
                </Button>
                <Button>
                <Typography className={classes.sub}>
                    <Icon><AttachMoney className={classes.icon} /></Icon> Saving
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub} >
                    <Icon><QueueMusic className={classes.icon} /></Icon> Spotify
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><AccessTime className={classes.icon} /></Icon> Date & Time
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><Web className={classes.icon} /></Icon> RSS
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><Fastfood className={classes.icon} /></Icon>Food Tracker
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><CheckCircleOutline className={classes.icon} /></Icon> To Do List
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><AirplanemodeActive className={classes.icon} /></Icon> World Map
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><Map className={classes.icon} /></Icon>Google Map
          </Typography>
          </Button>
          <Button>
                <Typography className={classes.sub}>
                    <Icon><ReportProblem className={classes.icon} /></Icon> Github Issues
          </Typography>
          </Button>
            </Card>
        );
    }
}



export default withStyles(styles)(Sidebar);
