import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import { OpenWeatherMap } from 'react-weather';


const styles = theme => ({
    card: {
        backgroundColor: "#FAFAFA",
        maxWidth: 275
    }
});

class Weather extends React.Component {
  

   
    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
              {/* <OpenWeatherMap city="Jerusalem" country="IL" appid="68d70243486baf9346d8b9250e875114" /> */}
              </Typography>
             
              <Typography className={classes.pos} color="textSecondary">
                25
              </Typography>
              <Typography component="p">
                well meaning and kindly.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" href ="https://www.metservice.com/towns-cities/wellington/wellington-city">Learn More</Button>
            </CardActions>
          </Card>
        );
    }
}


export default withStyles(styles)(Weather);