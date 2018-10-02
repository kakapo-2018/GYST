import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Delete from '@material-ui/icons/Delete';

const styles = theme => ({
  list: {
    fontSize: '2em'
  },
  btn: {
    marginLeft: '5%'
  }
});

class AlarmList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <ul>
          {this.props.data.map((alarm, i) => {
            return (
              <p key={i} className={classes.list}>
                {alarm.hours}:{alarm.minutes}
                <Button
                  color="secondary"
                  className={classes.btn}
                  onClick={() => this.props.handleClickDel(alarm)}
                >
                  <Delete />
                </Button>
              </p>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmList);
