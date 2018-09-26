import React, { Component } from "react";
import ChartistGraph from "./Chartist";

class Bar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      savedMoney: 0,
      totalGoal: 1500
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log(e.target.value);
    // this.setState({
    //   savedMoney: e.target.value
    // });
    this.setState({ savedMoney: e.target.value });
  }

  render() {
    var data = {
      labels: ["Money Saved"],
      series: [this.state.savedMoney]
    };

    var options = {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: this.state.totalGoal,
      showLabel: true
    };

    var type = "Pie";
    // var aspectRatio = "ct-octave";

    return (
      <div>
        <ChartistGraph
          id="pie2"
          className="ct-chart ct-major-tenth"
          data={data}
          options={options}
          type={type}
        />
        <input type="number" onChange={this.handleChange} />
      </div>
    );
  }
}

export default Bar;
//ReactDOM.render(<Bar />, document.getElementById("react-chart"));
