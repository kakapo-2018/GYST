import { color } from 'd3-color';
import { connect } from 'react-redux';
import { interpolateRgb } from 'd3-interpolate';
import { saveItemAction } from '../actions/savings';
import React from 'react';
import LiquidFillGauge from 'react-liquid-gauge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Gauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 100,
      savingGoal: 2000
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    console.log(this.state);

    this.props.saveIt(
      this.state.value,
      this.state.savingGoal,
      this.props.state.user.id
    );
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  startColor = '#f44336';
  endColor = '#4CAF50';

  render() {
    const radius = 120;
    const interpolate = interpolateRgb(this.startColor, this.endColor);
    const fillColor = interpolate(this.state.value / this.state.savingGoal);
    const gradientStops = [
      {
        key: '0%',
        stopColor: color(fillColor)
          .darker(0.5)
          .toString(),
        stopOpacity: 1,
        offset: '0%'
      },
      {
        key: '50%',
        stopColor: fillColor,
        stopOpacity: 0.75,
        offset: '50%'
      },
      {
        key: '100%',
        stopColor: color(fillColor)
          .brighter(0.2)
          .toString(),
        stopOpacity: 0.5,
        offset: '100%'
      }
    ];

    return (
      <Card style={{ maxWidth: 275 }}>
        <CardContent style={{ padding: 0, maxWidth: 275 }}>
          <LiquidFillGauge
            style={{ margin: '0 auto' }}
            width={radius * 2}
            maxWidth={375}
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
              fill: color('#444').toString(),
              fontFamily: 'Arial'
            }}
            waveTextStyle={{
              fill: color('#fff').toString(),
              fontFamily: 'Arial'
            }}
          />
        </CardContent>
        <CardActions style={{ margin: '2%', display: 'flex' }}>
          <input
            style={{ maxWidth: '45%' }}
            type="number"
            name="value"
            placeholder="Amount Saved"
            onChange={this.handleChange}
          />
          <input
            style={{ maxWidth: '45%' }}
            type="number"
            name="savingGoal"
            placeholder="Goal"
            onChange={this.handleChange}
          />
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveIt: (saved, goal, id) => {
      dispatch(saveItemAction(saved, goal, id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Gauge);
