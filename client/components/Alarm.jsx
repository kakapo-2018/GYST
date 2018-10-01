import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from './Clock';
import AlarmDigit from './AlarmDigit';
import AlarmList from './AlarmList';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
  card: {
    maxWidth: '100%',
    maxHeight: '500',
    minWidth: '100%',
    minHeight: '100%',
    textAlign: 'center'
  },
  container: {
    overflow: 'hidden',
    margin: 'auto'
  },
  alarm: {
    overflow: 'hidden'
  },
  control: {
    width: '80%',
    position: 'relative',
    display: 'inline-block'
  },
  time: {
    fontSize: '80px'
  },
  btn: {
    width: '40px'
  }
});

var bells = [
  {
    name: 'piano-melody',
    type: 'audio/wav',
    path: 'bell/70214__qlc__65bpm-piano-melody-0589.wav'
  },
  {
    name: 'fractal-ramp-sonnet',
    type: 'audio/mpeg',
    path: 'bell/70002__qlc__240bpm-fractal-ramp-sonnet-track-1.mp3'
  },
  { name: 'osng', type: 'audio/wav', path: 'bell/70213__qlc__152bpm-osng.wav' },
  {
    name: 'zichus',
    type: 'audio/wav',
    path: 'bell/70217__qlc__85bpm-zichus.wav'
  }
];

var data = [];
class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bells: bells,
      hours: '',
      minute: '',
      timeArr: [],
      data: data,
      hourDigit: 0,
      minuteDigit: 0
    };
    this.handleAddAlarm = this.handleAddAlarm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleCarry(digit) {
    this.refs[digit].handleCarry();
  }

  handleBorrow(digit) {
    this.refs[digit].handleBorrow();
  }

  handleRing() {
    this.refs.bell.ring();
  }

  //get the input value here
  handleAddAlarm() {
    var date = new Date();
    let alarmObj = {
      hours: this.state.hourDigit,
      minutes: this.state.minuteDigit
    };
    this.setState({
      timeArr: this.state.timeArr.concat(alarmObj)
    });
  }

  handleAddAudio(audio) {
    this.setState({
      bells: this.state.bells.concat(audio)
    });
  }

  handleChange(ref, value) {
    console.log('handlechange!1');
    console.log(ref, value);
    this.setState({
      [ref]: value
    });
    console.log(this.state);
    this.state.timeArr.concat(this.state.hourDigit, this.state.minuteDigit);
  }

  render() {
    const { classes } = this.props;
    var date = new Date();
    return (
      <Card className={classes.card}>
        <Clock className={classes.time} />
        <div className={classes.container}>
          <div className={classes.alarm}>
            <AlarmDigit
              numberSystem={24}
              val={date.getHours()}
              myRef="hourDigit"
              handleStopIncrease={this.handleStopIncrease}
              handleChange={this.handleChange}
            />
            <AlarmDigit
              numberSystem={60}
              val={date.getMinutes()}
              onCarry={this.handleCarry.bind(this, 'hourDigit')}
              onBorrow={this.handleBorrow.bind(this, 'hourDigit')}
              ref="minuteDigit"
              myRef="minuteDigit"
              handleChange={this.handleChange}
            />
          </div>
          <div className={classes.form}>
            <input
              className={classes.control}
              type="text"
              ref="comment"
              placeholder="Label"
            />
            <button
              className={classes.btn}
              type="button"
              onClick={this.handleAddAlarm}
            >
              <Add />
            </button>
          </div>
          <h2>Sounds</h2>

          <h2>Alarms</h2>
          <AlarmList
            data={this.state.timeArr}
            myRef="alarmList"
            onRing={this.handleRing}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Alarm);
