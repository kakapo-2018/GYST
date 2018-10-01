import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { ClipLoader } from 'react-spinners';

import { css } from 'react-emotion';
const override = css`
  display: block;
  margin: 5% 25%;
`;
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
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.loading = this.loading.bind(this);
  }

  componentDidMount() {
    this.loading();
  }

  loading() {
    console.log('loading');
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 30);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <CardContent>
          {this.state.loading && (
            <ClipLoader
              className={override}
              sizeUnit={'px'}
              size={250}
              color={'#3f51b5'}
            />
          )}{' '}
          <ReactWeather
            forecast="today"
            apikey="a4a6a25a5dc9444ab5b64310182709"
            type="city"
            city="Wellington"
          />
        </CardContent>
        <CardActions />
      </Card>
    );
  }
}

export default withStyles(styles)(Weather);
