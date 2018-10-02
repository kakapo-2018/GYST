import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Moment from 'react-moment';

const styles = theme => ({
  clock: {
    fontSize: '4em'
  }
});

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
      id: 0
    };
    this.clockChange = this.clockChange.bind(this);
  }

  componentDidMount() {
    var state = this.state;
    state.id = setInterval(
      function() {
        var state = this.state;
        state.time = new Date();
        this.setState(state);
      }.bind(this),
      60000
    );
    this.setState(state);
  }

  componentWillUnmount() {
    clearInterval(this.state.id);
  }

  clockChange() {
    var date = new Date();
    var x = document.getElementById('myAudio');
    for (let i = 0; i < this.props.data.length; i++) {
      if (
        date.getHours() == this.props.data[i].hours &&
        date.getMinutes() == this.props.data[i].minutes
      ) {
        console.log('Alarm goes off');
        let filteredArr = this.props.data.filter(res => {
          return res != this.props.data[i];
        });
        this.props.alarmGoesOff();
      } else {
      }
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Moment
          onChange={this.clockChange}
          className={classes.clock}
          format="HH:mm"
        >
          {this.state.time}
        </Moment>
        <audio id="myAudio">
          <source src="alarm.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default withStyles(styles)(Clock);
