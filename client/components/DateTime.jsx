import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Clock from "react-live-clock";
import Icon from "@material-ui/core/Icon";

const styles = {
  card: {
    backgroundColor: "#aa2e25",
    maxWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  time: {
    color: "white",
    letterSpacing: "4px",
    fontSize: "2em",
    textAlign: "center"
  },
  date: {
    color: "white",
    letterSpacing: "2px",
    textAlign: "center"
  }
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <CardContent className={classes.date}>
        <Typography variant="headline" component="h2">
          <Clock
            className={classes.time}
            format={"HH:mm"}
            ticking={true}
            timezone={"Pacific/Auckland"}
          />
        </Typography>
        <Clock format={"MMMM Do, YYYY"} timezone={"Pacific/Auckland"} />
      </CardContent>
      <hr />
      <CardActions>
        <Button size="small">
          <i id="calIcon" class="far fa-calendar-alt" />
          Calendar
        </Button>
        <Button size="small">
          <i id="calIcon" class="fas fa-bell" />
          Alerts
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
