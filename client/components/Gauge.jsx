import { color } from 'd3-color';
import { connect } from 'react-redux';
import { interpolateRgb } from 'd3-interpolate';
import { saveItemAction, getItemAction } from '../actions/savings';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import LiquidFillGauge from 'react-liquid-gauge';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

class Gauge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
      savingGoal: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillMount() {
    this.props.getIt(this.props.state.auth.user.id);
  }

  save() {
    this.props.saveIt(
      this.state.value,
      this.state.savingGoal,
      this.props.state.auth.user.id
    );
    setTimeout(() => {
      this.props.getIt(this.props.state.auth.user.id);
    }, 20);
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
      <Card
        style={{
          padding: '10px',
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%'
        }}
      >
        <CardContent
          style={{
            padding: '2px'
          }}
        >
          {!this.props.loading && (
            <LiquidFillGauge
              style={{ margin: '0 auto' }}
              width={radius * 2}
              maxWidth={375}
              height={radius * 2}
              value={
                (this.props.state.items.saved /
                  this.props.state.items.savingGoal) *
                100
              }
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
                      {value >= 0 ? value : 0}
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
          )}
          {this.props.loading && (
            <LiquidFillGauge
              style={{ margin: '0 auto' }}
              width={radius * 2}
              maxWidth={375}
              height={radius * 2}
              value={0}
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
                      {value >= 0 ? value : 0}
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
          )}
        </CardContent>
        <CardActions style={{ paddingBottom: '8px' }}>
          <Input
            style={{ maxWidth: '45%' }}
            type="number"
            name="value"
            placeholder={'Saved: $' + this.props.state.items.saved}
            onChange={this.handleChange}
          />
          <Input
            style={{ maxWidth: '45%' }}
            type="number"
            name="savingGoal"
            placeholder={'Goal: $' + this.props.state.items.savingGoal}
            onChange={this.handleChange}
          />
          <Button variant="contained" color="primary" onClick={this.save}>
            Save
          </Button>
        </CardActions>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state,
    items: state.items[0],
    loading: state.itemsIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveIt: (saved, goal, id) => {
      dispatch(saveItemAction(saved, goal, id));
    },
    getIt: id => {
      dispatch(getItemAction(id));
    }
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Gauge)
);
