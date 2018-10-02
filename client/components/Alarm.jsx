import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from './Clock';
import AlarmDigit from './AlarmDigit';
import AlarmList from './AlarmList';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { get, set } from '../utils/localStorage';

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
  stop: {
    marginBottom: '5%'
  },
  btn: {
    margin: theme.spacing.unit
  }
});

var data = [];
class Alarm extends React.Component {
  constructor(props) {
    super(props);
    var date = new Date();
    this.state = {
      hours: '',
      minute: '',
      timeArr: JSON.parse(get('alarm')) || [],
      data: data,
      hourDigit: date.getHours(),
      minuteDigit: date.getMinutes()
    };
    this.handleAddAlarm = this.handleAddAlarm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.alarmGoesOff = this.alarmGoesOff.bind(this);
    this.pauseAlarm = this.pauseAlarm.bind(this);
    this.handleClickDel = this.handleClickDel.bind(this);
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

  handleAddAlarm() {
    let id = 1;
    while (this.state.timeArr.find(alarm => alarm.id == id)) id++;

    let initialAlarmObj = {
      id,
      hours: this.refs.hourDigit.props.val,
      minutes: this.refs.minuteDigit.props.val
    };
    let alarmObj = {
      id,
      hours: this.state.hourDigit,
      minutes: this.state.minuteDigit
    };

    this.setState(
      {
        timeArr:
          alarmObj.hours == 0 && alarmObj.minutes == 0
            ? this.state.timeArr.concat(initialAlarmObj)
            : this.state.timeArr.concat(alarmObj)
      },
      () => {
        set('alarm', JSON.stringify(this.state.timeArr));
      }
    );
  }

  alarmGoesOff() {
    var x = document.getElementById('myAudio');
    x.play();
  }

  pauseAlarm() {
    var x = document.getElementById('myAudio');
    x.pause();
  }

  handleChange(ref, value) {
    if (ref == 'minuteDigit' || ref == 'hourDigit') value = Number(value);
    this.setState({
      [ref]: value
    });
    this.state.timeArr.concat(this.state.hourDigit, this.state.minuteDigit);
  }

  handleClickDel(alarm) {
    this.setState({
      timeArr: this.state.timeArr.filter(other => alarm.id != other.id)
    });
    let localObj = JSON.parse(get('alarm'));
    localObj = this.state.timeArr.filter(other => alarm.id != other.id);
    set('alarm', JSON.stringify(localObj));
  }
  render() {
    const { classes } = this.props;
    var date = new Date();
    return (
      <Card className={classes.card}>
        <Clock
          className={classes.time}
          data={this.state.timeArr}
          alarmGoesOff={this.alarmGoesOff}
        />
        <div className={classes.container}>
          <div className={classes.alarm}>
            <AlarmDigit
              numberSystem={24}
              val={this.state.hourDigit}
              ref="hourDigit"
              myRef="hourDigit"
              handleChange={this.handleChange}
            />
            <AlarmDigit
              numberSystem={60}
              val={this.state.minuteDigit}
              onCarry={this.handleCarry.bind(this, 'hourDigit')}
              onBorrow={this.handleBorrow.bind(this, 'hourDigit')}
              ref="minuteDigit"
              myRef="minuteDigit"
              handleChange={this.handleChange}
            />
          </div>
          <div className={classes.form}>
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.btn}
              onClick={this.handleAddAlarm}
            >
              <Add />
            </Button>
          </div>

          <audio id="myAudio">
            <source src="alarm.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <h2>Alarms</h2>
          <AlarmList
            handleClickDel={this.handleClickDel}
            data={this.state.timeArr}
            myRef="alarmList"
            onRing={this.handleRing}
            pauseAlarm={this.pauseAlarm}
            hourDigit={this.state.hourDigit}
            minuteDigit={this.state.minuteDigit}
            count={this.state.count}
          />
        </div>
        {this.alarmGoesOff && (
          <Button
            className={classes.stop}
            variant="contained"
            color="primary"
            onClick={this.pauseAlarm}
          >
            Stop
          </Button>
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(Alarm);
