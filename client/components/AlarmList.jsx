import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AlarmEntry from './AlarmEntry';

const styles = theme => ({
  digit: {
    width: '80px',
    flexDirection: 'row',
    display: 'inline-block'
  }
});

class AlarmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  handleEntryClose(index) {
    var state = this.state;
    state.data.splice(index, 1);
    this.setState(state);
  }

  render() {
    const { classes } = this.props;
    var alarmNodes = this.props.data.map(
      function(alarm, i) {
        console.log(alarm);

        if (alarm === undefined) return undefined;
        return (
          <AlarmEntry
            time={alarm.time}
            comment={alarm.comment}
            onClose={this.handleEntryClose.bind(this, i)}
            key={i}
            onRing={this.props.onRing}
          />
        );
      }.bind(this)
    );

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
      {
        name: 'osng',
        type: 'audio/wav',
        path: 'bell/70213__qlc__152bpm-osng.wav'
      },
      {
        name: 'zichus',
        type: 'audio/wav',
        path: 'bell/70217__qlc__85bpm-zichus.wav'
      }
    ];

    var list = function() {
      if (this.state.data.length == 0) {
        return <li className="list-group-item">None</li>;
      } else {
        return alarmNodes;
      }
    }.bind(this);

    return <ul className="alarmList list-group">{list()}</ul>;
  }
}

export default withStyles(styles)(AlarmList);
