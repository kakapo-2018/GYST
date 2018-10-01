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
    console.log(date.getHours());
    console.log(date.getMinutes());
    console.log(this.props.data);
    console.log(this.props.data.minutes);
  }

  render() {
    const { classes } = this.props;

    return (
      <Moment
        onChange={this.clockChange}
        className={classes.clock}
        format="HH:mm"
      >
        {this.state.time}
      </Moment>
    );
  }
}

export default withStyles(styles)(Clock);
