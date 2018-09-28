import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Fitness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchInfo: '',
      searchTerm: '',
      currentCals: 0,
      totalCals: 0
    };
  }

  componentDidMount() {}

  getData() {
    var foodWeb = require('foodweb');

    var item = foodWeb.search(this.state.searchTerm)[0];

    // kilocalories in 100 grams
    var calories = item.data.kcal;
    // kilocalories in a serving
    var serving = Math.round((item.data.primaryWeight / 100) * calories);
    // description of serving
    var servingDescription = item.data.primaryWeightDesc;

    this.setState({
      searchInfo:
        servingDescription +
        ' of ' +
        this.state.searchTerm +
        ' is ' +
        serving +
        ' calories',
      totalCals: this.state.totalCals + serving
    });
    this.forceUpdate();
  }

  updateInputValue(evt) {
    this.setState({
      searchTerm: evt.target.value
    });
  }

  submit = e => {
    this.getData(this.state.searchTerm);
  };

  render() {
    const { classes } = this.props;

    return (
      <Card
        className={classes.card}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%'
        }}
      >
        <CardMedia
          component="img"
          className={classes.media}
          height="110"
          image="food.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Food Trackr
          </Typography>
        </CardContent>

        <Typography
          component="p"
          style={{
            marginLeft: '10px'
          }}
        >
          {this.state.searchInfo}
        </Typography>
        <Typography
          component="p"
          style={{
            marginLeft: '10px'
          }}
        >
          kCals consumed today: {this.state.totalCals}
        </Typography>

        <TextField
          id="outlined-name"
          label="Meal"
          className={classes.textField}
          value={this.state.searchTerm}
          onChange={evt => this.updateInputValue(evt)}
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="fab"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.submit}
        >
          <AddIcon />
        </Button>
      </Card>
    );
  }
}

export default withStyles(styles)(Fitness);
