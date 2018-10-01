import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const styles = theme => ({
  digit: {
    width: '80px',
    flexDirection: 'row',
    display: 'inline-block',
    margin: 'auto'
  },
  input: {
    fontSize: '30px',
    height: '45px',
    width: '50px',
    border: 0,
    boxShadow: 'none',
    outline: 0,
    textAlign: 'center'
  },
  btn: {
    width: '40px',
    height: '20px'
  },
  updown: {
    margin: 'auto'
  }
});

var paddy = function(n, p, c) {
  var pad_char = typeof c !== 'undefined' ? c : '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
};

class AlarmDigit extends React.Component {
  constructor(props) {
    super(props);
    var val = typeof this.props.val !== 'undefined' ? this.props.val : 0;
    this.state = {
      value: val,
      increasing: 0,
      decreasing: 0,
      increaseCounter: 0,
      decreaseCounter: 0
    };
    this.handleStartIncrease = this.handleStartIncrease.bind(this);
    this.handleStopDecrease = this.handleStopDecrease.bind(this);
    this.handleStartDecrease = this.handleStartDecrease.bind(this);
  }

  getInterval(counter) {
    if (counter > 5) return 75;
    else if (counter > 20) return 50;
    else if (counter > 30) return 5;
    else return 150;
  }

  handleCarry() {
    this.handleIncrease(true);
  }

  handleBorrow() {
    this.handleDecrease(true);
  }

  handleIncrease(once) {
    var state = this.state;
    state.value++;
    state.increaseCounter++;
    if (state.value >= this.props.numberSystem) {
      if (typeof this.props.onCarry === 'function') this.props.onCarry();
      state.value = 0;
    }

    if (once !== true)
      state.increasing = setTimeout(
        this.handleIncrease,
        this.getInterval(this.state.increaseCounter)
      );
    this.setState(state);
  }

  handleStartIncrease() {
    var state = this.state;
    state.increaseCounter = 0;
    this.setState(state);
    this.handleIncrease();
  }

  handleDecrease(once) {
    var state = this.state;
    state.value--;
    state.decreaseCounter++;
    if (state.value < 0) {
      if (typeof this.props.onBorrow === 'function') this.props.onBorrow();
      state.value = this.props.numberSystem - 1;
    }
    if (once !== true)
      state.decreasing = setTimeout(
        this.handleDecrease,
        this.getInterval(this.state.decreaseCounter)
      );
    this.setState(state);
  }

  handleStartDecrease() {
    var state = this.state;
    state.decreasing = true;
    state.decreaseCounter = 0;
    this.setState(state);
    this.handleDecrease();
  }

  handleStopDecrease() {
    var state = this.state;
    clearTimeout(state.decreasing);
    this.setState(state);
    console.log(state);
  }

  handleKeyDown(event) {
    if (event.keyCode == 38) {
      this.handleIncrease(true);
    }

    if (event.keyCode == 40) {
      this.handleDecrease(true);
    }
  }

  handleWheel(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
      this.handleDecrease(true);
    }
    if (event.deltaY < 0) {
      this.handleIncrease(true);
    }
  }

  render() {
    const { classes } = this.props;

    var value = paddy(this.state.value, 2);
    return (
      <div className={classes.digit}>
        <button
          className={classes.btn}
          onMouseDown={this.handleStartIncrease}
          onMouseUp={this.props.handleStopIncrease}
        >
          <ArrowDropUp className={classes.updown} />
        </button>
        <input
          className={classes.input}
          type="text"
          value={this.state.value}
          onChange={e => this.props.handleChange(e)}
          onKeyDown={this.handleKeyDown}
          onWheel={this.handleWheel}
        />
        <button
          className={classes.btn}
          onMouseDown={this.handleStartDecrease}
          onMouseUp={this.handleStopDecrease}
        >
          <ArrowDropDown className={classes.updown} />
        </button>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmDigit);
