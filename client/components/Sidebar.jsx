import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


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
    time: {
        color: "white",
        letterSpacing: "4px",
        fontSize: "2em",
        textAlign: "center"
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
                <Typography className={classes.sub}>
                    Weather
          </Typography>
                <Typography className={classes.sub}>
                    Saving
          </Typography>

                <Typography className={classes.sub} >
                    Spotify
          </Typography>
                <Typography className={classes.sub}>
                    Date, Time and Calendar
          </Typography>
                <Typography className={classes.sub}>
                    RSS
          </Typography>
                <Typography className={classes.sub}>
                    Food Tracker
          </Typography>
                <Typography className={classes.sub}>
                    To Do List
          </Typography>
                <Typography className={classes.sub}>
                    World Map
          </Typography>
                <Typography className={classes.sub}>
                    Google Map
          </Typography>
                <Typography className={classes.sub}>
                    Github Issues
          </Typography>

            </Card>
        );
    }
}



export default withStyles(styles)(Sidebar);
