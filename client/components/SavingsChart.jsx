import React, { Component } from "react";
import ChartistGraph from "./Chartist";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    this.setState({ savedMoney: e.target.value });
  }

  render() {
    var data = {
      labels: ["Saved " + this.state.savedMoney + " / " + this.state.totalGoal],
      series: [this.state.savedMoney]
    };

    var options = {
      donut: true,
      donutWidth: 40,
      startAngle: 270,
      total: this.state.totalGoal,
      showLabel: true
      //stroke: "#81C784"
    };

    var type = "Pie";

    return (
      <Card style={{ padding: 0, maxWidth: 475 }}>
        <CardContent style={{ padding: 0, maxWidth: 475 }}>
          <div>
            <ChartistGraph
              id="pie2"
              className="ct-chart ct-major-tenth"
              data={data}
              options={options}
              type={type}
              style={{ stroke: "#81C784" }}
            />
          </div>
        </CardContent>
        <CardActions>
          <Typography component="p">Amt Saved:</Typography>
          <input
            placeholder="Amt Saved"
            type="number"
            onChange={this.handleChange}
            style={{ padding: 0, maxWidth: "15%" }}
          />
        </CardActions>
      </Card>
    );
  }
}

export default Bar;
