import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Clock from './Clock';
import AlarmDigit from './AlarmDigit';
import Bell from './Bell';
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

var data = [];

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

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bells: bells,
      hours: '',
      minute: '',
      timeArr: []
    };
    this.handleAddAlarm = this.handleAddAlarm.bind(this);
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
    console.log(this.refs);

    console.log('clicked');
    var date = new Date();
    console.log(this.refs.hourDigit);
    date.setHours(this.refs.hourDigit.props.val);
    date.setMinutes(this.refs.minuteDigit.props.val);
    console.log(date);
    this.setState({
      hours: hours,
      minute: minute
    });
    console.log(this.state);

    // this.refs.alarmList.handleAddEntry({time: date, comment: this.refs.comment.getDOMNode().value});
    this.handleAddEntry(this.state.hours, this.state.minute);
  }

  handleAddEntry(hours, minute) {
    console.log('I am here');
    console.log(hours, minute);

    //var state = this.state;
    let timeArr = [];
    timeArr.push(hours, minute);
    // this.setState(state);
    console.log(timeArr);
    this.setState({
      timeArr: timeArr
    });
  }

  handleAddAudio(audio) {
    this.setState({
      bells: this.state.bells.concat(audio)
    });
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
              ref="hourDigit"
            />
            <AlarmDigit
              numberSystem={60}
              val={date.getMinutes()}
              onCarry={this.handleCarry.bind(this, 'hourDigit')}
              onBorrow={this.handleBorrow.bind(this, 'hourDigit')}
              ref="minuteDigit"
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
          <Bell
            ref="bell"
            bells={this.state.bells}
            onAddAudio={this.handleAddAudio}
          />
          <h2>Alarms</h2>
          <AlarmList
            data={this.state.timeArr}
            hours={this.state.hours}
            minute={this.state.minute}
            ref="alarmList"
            onRing={this.handleRing}
          />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Alarm);
