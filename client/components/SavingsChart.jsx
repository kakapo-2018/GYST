import React from "react";
import ChartistGraph from "./Chartist";

class Bar extends React.Component {
  render() {
    var data = {
      labels: ["Sugar", "Glazed", "Maple", "Chocolate"],
      series: [10, 10, 20, 60]
    };

    var options = {
      donut: true
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
      </div>
    );
  }
}

export default Bar;
//ReactDOM.render(<Bar />, document.getElementById("react-chart"));
