import React from 'react';
import { connect } from 'react-redux';
import Chart from 'react-google-charts';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { saveWeightAction, getWeightAction } from '../actions/weight';
import Card from '@material-ui/core/Card';

const styles = theme => ({
  card: {
    padding: '10px',
    maxWidth: '100%',
    maxHeight: '100%',
    minWidth: '100%',
    minHeight: '100%'
  }
});

var today = new Date();
var month = today.getMonth() + 1;
var date = today.getDate();
today = date + '-' + month;

const options = {
  title: 'Weight Tracking',
  curveType: 'function',
  legend: { position: 'bottom' }
};

class Weight extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      confirm: false,
      dataForChart: [['Date', 'Weight'], ['Start', 0]]
    };
    this.add = this.add.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    this.props.getWeight(this.props.state.auth.user.id);
  }

  save() {
    this.setState({
      confirm: true
    });
  }

  add() {
    this.state.dataForChart[1][0] != 'Start'
      ? this.state.dataForChart.push([
          today,
          Number(document.getElementById('kg').value)
        ])
      : (this.state.dataForChart = [
          ['Date', 'Weight'],
          [today, Number(document.getElementById('kg').value)]
        ]);
    let len = this.state.dataForChart.length;
    let lastEnteredWeight = this.state.dataForChart[len - 1][1];
    let lastEnteredDate = this.state.dataForChart[len - 1][0];
    this.state.confirm = false;
    this.setState(this.state);
    this.props.saveWeight(
      lastEnteredWeight,
      lastEnteredDate,
      this.props.state.auth.user.id
    );
    this.props.getWeight(this.props.state.auth.user.id);
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
        <div className="App">
          {this.props.weight.weight && (
            <Chart
              chartType="LineChart"
              width="100%"
              height="100%"
              data={this.props.weight.weight}
              options={options}
            />
          )}
          <Input
            style={{ maxWidth: '45%', marginLeft: '20%', paddingTop: '30px' }}
            id="kg"
            type="number"
            name="value"
            placeholder="Enter your weight"
          />
          {!this.state.confirm ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.save()}
            >
              Save
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.add()}
            >
              Confirm
            </Button>
          )}
        </div>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    weight: state.weight
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveWeight: (weight, date, id) => {
      dispatch(saveWeightAction(weight, date, id));
    },
    getWeight: id => {
      dispatch(getWeightAction(id));
    }
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Weight)
);
