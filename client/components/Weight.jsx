
import React from "react";
import { connect } from 'react-redux'
import Chart from "react-google-charts";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { saveWeightAction, getWeightAction } from '../actions/weight';

const styles = theme => ({
    content: {
        paddingLeft: '255px',
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3
    },
    enter: {
        marginLeft: '25%'
    }
});

var today = new Date()
var month = today.getMonth() + 1
var date = today.getDate()
today = date + '-' + month

const options = {
    title: "Weight Tracking",
    curveType: "function",
    legend: { position: "bottom" }
};

class Weight extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataForChart: [
                ["Date", "Weight"],
                ["Start", 0],
            ]
        }
        this.add = this.add.bind(this)
    }

    componentDidMount() {
        this.props.getWeight(this.props.state.auth.user.id);
      }

    add() {
        this.state.dataForChart[1][0] != 'Start' ? 
        this.state.dataForChart.push([today, Number(document.getElementById("kg").value)])
        :
        this.state.dataForChart = [[
            "Date", "Weight"
        ], [today, Number(document.getElementById("kg").value)]]
        let len = this.state.dataForChart.length
        let lastEnteredWeight = this.state.dataForChart[len-1][1]
        let lastEnteredDate = this.state.dataForChart[len-1][0]
        this.setState(this.state)
        this.props.saveWeight(lastEnteredWeight, lastEnteredDate,  this.props.state.auth.user.id)
    }
    
    render() {
        const { classes } = this.props;
        return (
            <div className="App">
            
            {this.props.weight && 
                <Chart
                    chartType="LineChart"
                    width="100%"
                    height="400px"
                    data={this.state.dataForChart}
                    options={options}
                />}
                <Input
                    style={{ maxWidth: '45%', marginLeft: '25%' }}
                    id="kg"
                    type="number"
                    name="value"
                    placeholder="Enter your weight"
                />
                <Button variant="contained" color="primary" onClick={() => this.add()}>
                    Save
                </Button>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
      state: state,
      weight:state.weight
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
        saveWeight: (weight, date, id) => {
        dispatch(saveWeightAction(weight, date, id));
      },
      getWeight: (id) => {
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