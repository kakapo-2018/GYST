import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  button: {
    marginLeft: '12px',
    marginTop: '-24px'
  }
});

class AddTodo extends Component {
  static propTypes = {
    handleClick: PropTypes.func
  };

  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.state = {
      inputValue: ''
    };
  }

  onClick(event) {
    event.preventDefault();
    var todo = this.state.inputValue;
    if (todo == '') return;
    else {
      var form = document.getElementById('myForm');
      form.reset();
      this.props.handleClick(todo);
      this.state.inputValue = '';
    }
  }

  render() {
    const { handleClick, classes } = this.props;
    return (
      <div>
        <form id="myForm">
          <Paper
            style={{
              marginLeft: '10px',
              width: '85%',
              leftMargin: '15px',
              float: 'left'
            }}
            zdepth={1}
          >
            <TextField
              hinttext="What needs to be done?"
              className="AddText"
              placeholder="What needs to be done?"
              fullWidth={true}
              onChange={e => this.setState({ inputValue: e.target.value })}
            />
          </Paper>
          <br />
          {this.state.inputValue && (
            <Button
              mini
              type="submit"
              variant="fab"
              color="primary"
              aria-label="Add"
              onClick={this.onClick}
              className={classes.button}
            >
              <AddIcon />
            </Button>
          )}
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddTodo);
