import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Clock from 'react-live-clock';
import Calendar from 'react-calendar';

const styles = theme => ({
  card: {
    backgroundColor: '#aa2e25',
    maxWidth: '100%'
  },
  action: {
    display: 'flex',
    justifyContent: 'center'
  },
  cal: {
    marginTop: '5%'
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  time: {
    color: 'white',
    letterSpacing: '4px',
    fontSize: '2em',
    textAlign: 'center'
  },
  date: {
    color: 'white',
    letterSpacing: '2px',
    textAlign: 'center'
  }
});

class DateTime extends React.Component {
  state = {
    clickedCal: false
  };

  handleCalToggle = () => {
    this.setState(state => ({ clickedCal: !state.clickedCal }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent className={classes.date}>
          <Typography variant="headline" component="h2">
            <Clock
              className={classes.time}
              format={'HH:mm'}
              ticking={true}
              timezone={'Pacific/Auckland'}
            />
          </Typography>
          <Clock format={'MMMM Do, YYYY'} timezone={'Pacific/Auckland'} />
          {this.state.clickedCal && <Calendar className={classes.cal} />}
        </CardContent>
        <hr />
        <CardActions className={classes.action}>
          <Button onClick={this.handleCalToggle} size="small">
            <i id="calIcon" className="far fa-calendar-alt" />
            Calendar
          </Button>
          <Button size="small">
            <i id="calIcon" className="fas fa-bell" />
            Alerts
          </Button>
        </CardActions>
      </Card>
    );
  }
}

DateTime.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DateTime);
