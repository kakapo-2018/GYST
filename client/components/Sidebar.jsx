import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
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
    button: {
        width: 239,
        textAlign: "center",
        padding: 0
    },
    icon: {
        color: "white",
        textAlign: "left",
        marginRight: "2%"
    },
    sub: {
        color: "white",
        letterSpacing: "2px",
        marginTop: "5%",
        marginBottom: "5%",

    }
});

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weather:false,
            saving:false,
            spotify:false,
            date:false,
            rss:false,
            food:false,
            todo:false,
            worldmap:false,
            googlemap:false,
            github:false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(component) {
         this.setState({
        ...this.state, 
        [component]:true
         })

    }


    render() {
       {console.log(this.state)}
        const { classes } = this.props;
        return (
            <Card className={classes.card}>

                <Button className={classes.button} onClick={()=>this.handleClick("weather")}>
                    <Icon className={classes.icon} ><WbSunny /></Icon>
                    <Typography className={classes.sub}>
                        Weather
                    </Typography>
                </Button>
                <Button className={classes.button} onClick={()=>this.handleClick("saving")}>
                    <Icon className={classes.icon} > <AttachMoney /></Icon>
                    <Typography className={classes.sub}>
                        Saving
                    </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("spotify")}>
                    <Icon className={classes.icon} >
                        <QueueMusic /></Icon>
                    <Typography className={classes.sub} >
                        Spotify
                    </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("date & time")}>
                    <Icon className={classes.icon} >
                        <AccessTime /></Icon>
                    <Typography className={classes.sub}>
                        Date & Time
                    </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("rss")}>
                    <Icon className={classes.icon} >
                        <Web /></Icon>
                    <Typography className={classes.sub}>
                        RSS
                     </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("food tracker")}>
                    <Icon className={classes.icon} ><Fastfood /></Icon>
                    <Typography className={classes.sub}>
                        Food Tracker
                    </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("to do list")}>
                    <Icon className={classes.icon}><CheckCircleOutline /></Icon>
                    <Typography className={classes.sub}>
                        To Do List
                     </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("world map")} >
                    <Icon className={classes.icon}><AirplanemodeActive /></Icon>
                    <Typography className={classes.sub}>
                        World Map
                     </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("google map")} >
                    <Icon className={classes.icon} ><Map /></Icon>
                    <Typography className={classes.sub}>
                        Google Map
                    </Typography>
                </Button>
                <Button className={classes.button}  onClick={()=>this.handleClick("github issues")} >
                    <Icon className={classes.icon}><ReportProblem /></Icon>
                    <Typography className={classes.sub}>
                        Github Issues
                    </Typography>
                </Button>
            </Card>
        );
    }
}



export default withStyles(styles)(Sidebar);
