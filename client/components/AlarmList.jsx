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

  // handleEntryClose(index) {
  //   var state = this.state;
  //   state.data.splice(index, 1);
  //   this.setState(state);
  // }

  render() {
    console.log(this.props);
    return (
      <div>
        <ul>
          <li>
            {this.props.data.hours}: {this.props.data.minutes}
          </li>
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmList);
