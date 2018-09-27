import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
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
      <Card style={{ maxWidth: 275 }}>
        <CardContent style={{ padding: 0, maxWidth: 275 }}>
          <div>
            <input
              type="text"
              value={this.state.searchTerm}
              onChange={evt => this.updateInputValue(evt)}
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
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

            <h1>Food Trackr</h1>
            {this.state.searchInfo}
            <h1>Total Cals</h1>
            {this.state.totalCals}
          </div>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Fitness);
