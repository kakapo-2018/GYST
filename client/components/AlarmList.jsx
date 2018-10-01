import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  list: {
    fontSize: '2em'
  }
});

class AlarmList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <ul>
          {this.props.data.map(alarm => {
            return (
              <li className={classes.list}>
                {alarm.hours}:{alarm.minutes}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmList);
