import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from 'react-live-clock';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%',
    textAlign: 'center'
  },
  clock: {
    fontSize:'80px'
  }
});

class Alarm extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
       <Clock className={classes.clock}format={'H:mm:ss'} timezone={'Pacific/Auckland'} />
      </Card>
    );
  }
}

export default withStyles(styles)(Alarm);
