import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from './Clock';
import AlarmDigit from './AlarmDigit';
import AlarmList from './AlarmList';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
    var date = new Date();
    this.state = {
      bells: bells,
      hours: '',
      minute: '',
      timeArr: [],
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

  //get the input value here
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

    //if alarmobj exists do nothing

    //if initialalarmobj exists do nothing

    //else
    this.setState({
      timeArr:
        alarmObj.hours == 0 && alarmObj.minutes == 0
          ? this.state.timeArr.concat(initialAlarmObj)
          : this.state.timeArr.concat(alarmObj)
    });
  }

  // checkAlarmTime() {
  //   var setTime = this.state.timeArr;
  //   var date = new Date();
  //   var x = document.getElementById('myAudio');
  //   for (let i = 0; i < setTime.length; i++) {
  //     if (
  //       setTime[i].hours == date.getHours() &&
  //       setTime[i].minutes == date.getMinutes()
  //     ) {
  //       x.play();
  //       {
  //         console.log(this.state);
  //       }
  //     }
  //   }
  // }

  alarmGoesOff() {
    var x = document.getElementById('myAudio');
    x.play();

    //console.log('before ', this.state.timeArr);
    //console.log(this.state.hourDigit);
    //console.log(this.state.minuteDigit);

    //this.changetimeArr();
    // for (let i = 0; i < this.state.timeArr.length; i++) {
    //   if (
    //     this.state.timeArr[i].hours == this.state.hourDigit &&
    //     this.state.timeArr[i].minutes == this.state.minuteDigit
    //   ) {
    //     return;
    //     this.setState({
    //       timeArr: !this.state.timeArr[i]
    //     });
    //     ? this.state.timeArr.filter(res => res != this.state.timeArr[i])
    //     : null;
    // console.log('after ', this.state.timeArr);
    // }
    // }
  }

  // changetimeArr() {
  //   this.setState({
  //     timeArr: !this.state.timeArr
  //   });
  // }

  pauseAlarm() {
    var x = document.getElementById('myAudio');
    x.pause();
  }

  handleAddAudio(audio) {
    this.setState({
      bells: this.state.bells.concat(audio)
    });
  }

  handleChange(ref, value) {
    // console.log('handlechange!1');
    // console.log(ref, value);
    this.setState({
      [ref]: value
    });
    this.state.timeArr.concat(this.state.hourDigit, this.state.minuteDigit);
  }

  handleClickDel(alarm) {
    // console.log('hit', i, this.state.timeArr);
    // let deletedArr = this.state.timeArr.splice(i, 1);
    // console.log(deletedArr);
    this.setState({
      timeArr: this.state.timeArr.filter(other => alarm.id != other.id)
    });
    console.log(this.state);
  }
  render() {
    console.log('im rending');

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
              type="text"
              val={date.getHours()}
              ref="hourDigit"
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
            {/* <input
              className={classes.control}
              type="text"
              ref="comment"
              placeholder="Label"
            /> */}
            {/* <button
              className={classes.btn}
              type="button"
              onClick={this.handleAddAlarm}
            >
              <Add />
            </button> */}
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

          {/* <h2>Sounds</h2> */}
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
