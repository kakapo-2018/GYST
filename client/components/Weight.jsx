
import React from "react";
import Chart from "react-google-charts";
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    content: {
      paddingLeft: '255px',
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3
    }, 
    enter: {
        marginLeft:'25%'
    }
  });

  var today = new Date()
  var month = today.getMonth()+1
  var date = today.getDate()
  today = date + '-' + month

  const options = {
    title: "Weight Tracking",
    curveType: "function",
    legend: { position: "bottom" }
  };

  class Weight extends React.Component {
      constructor(props){
          super(props)
          this.state={
              dataForChart: [
                ["Date", "Weight"],
                ["Start", 0],

              ]
          }
          this.add = this.add.bind(this)
      }


add () {
let newInfo = this.state.dataForChart.push([today, Number(document.getElementById("kg").value)])

 this.setState(this.state)

}    

    render() {
   const { classes } = this.props;
      return (
        <div className="App">
    
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={this.state.dataForChart}
            options={options}
          />
           <Input
             style={{ maxWidth: '45%', marginLeft:'25%' }}
             id="kg"
             type="number"
             name="value"
             placeholder= "Enter your weight"
          />
          <Button variant="contained" color="primary" onClick={()=>this.add()}>
            Save
          </Button>
        </div>
      );
    }
  }

export default withStyles(styles)(Weight);