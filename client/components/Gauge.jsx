import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import React, { Component } from "react";
import LiquidFillGauge from "react-liquid-gauge";

class Gauge extends Component {
  state = {
    value: 100,
    savingGoal: 2000
  };
  startColor = "#f44336";
  endColor = "#4CAF50";

  render() {
    const radius = 200;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(
      (this.state.value / this.state.savingGoal) * 100
    );
    const gradientStops = [
      {
        key: "0%",
        stopColor: color(fillColor)
          .darker(0.5)
          .toString(),
        stopOpacity: 1,
        offset: "0%"
      },
      {
        key: "50%",
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: "50%"
      },
      {
        key: "100%",
        stopColor: color(fillColor)
          .brighter(0.5)
          .toString(),
        stopOpacity: 0.5,
        offset: "100%"
      }
    ];

    return (
      <div>
        <LiquidFillGauge
          style={{ margin: "0 auto" }}
          width={radius * 2}
          height={radius * 2}
          value={(this.state.value / this.state.savingGoal) * 100}
          percent="%"
          textSize={1}
          textOffsetX={0}
          textOffsetY={0}
          textRenderer={props => {
            const value = Math.round(props.value);
            const radius = Math.min(props.height / 2, props.width / 2);
            const textPixels = (props.textSize * radius) / 2;
            const valueStyle = {
              fontSize: textPixels
            };
            const percentStyle = {
              fontSize: textPixels * 0.6
            };

            return (
              <tspan>
                <tspan className="value" style={valueStyle}>
                  {value}
                </tspan>
                <tspan style={percentStyle}>{props.percent}</tspan>
              </tspan>
            );
          }}
          riseAnimation
          waveAnimation
          waveFrequency={2}
          waveAmplitude={1}
          gradient
          gradientStops={gradientStops}
          circleStyle={{
            fill: fillColor
          }}
          waveStyle={{
            fill: fillColor
          }}
          textStyle={{
            fill: color("#444").toString(),
            fontFamily: "Arial"
          }}
          waveTextStyle={{
            fill: color("#fff").toString(),
            fontFamily: "Arial"
          }}
        />
        <div
          style={{
            margin: "20px auto",
            width: 120
          }}
        >
          <input
            type="number"
            placeholder="savedAmount"
            onChange={e => {
              this.setState({
                value: e.target.value,
                savingGoal: this.state.savingGoal
              });
            }}
          />
          <input
            type="number"
            placeholder="Goal"
            onChange={e => {
              this.setState({
                value: this.state.value,
                savingGoal: e.target.value
              });
            }}
          />
        </div>
      </div>
    );
  }
}

export default Gauge;
