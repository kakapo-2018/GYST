import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ReactWeather from 'react-open-weather';
//Optional include of the default css styles
import 'react-open-weather/lib/css/ReactWeather.css';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%'
  }
});

class Weather extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          <ReactWeather
            forecast="today"
            apikey="a4a6a25a5dc9444ab5b64310182709"
            type="city"
            city="Wellington"
          />
        </CardContent>
        <CardActions>
          {/* <Button
            size="small"
            href="https://www.metservice.com/towns-cities/wellington/wellington-city"
          >
            Learn More
          </Button> */}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Weather);
