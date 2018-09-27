import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: "2px"
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
      inputValue: ""
    };
  }

  onClick(event) {
    console.log("clicked desu");

    event.preventDefault();
    var todo = this.state.inputValue;
    if (todo == "") return;
    else {
      var form = document.getElementById("myForm");
      form.reset();
      this.props.handleClick(todo);
      this.state.inputValue = "";
    }
  }

  render() {
    const { handleClick, classes } = this.props;
    return (
      <div>
        <form id="myForm">
          <Paper style={{ width: "90%", leftMargin: "15px" }} zdepth={1}>
            <div style={{ marginLeft: "10px" }}>
              <TextField
                hinttext="What needs to be done?"
                className="AddText"
                fullWidth={true}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
            </div>
          </Paper>
          <br />
          <Button
            type="submit"
            variant="fab"
            color="primary"
            aria-label="Add"
            onClick={this.onClick}
            className={classes.button}
          >
            <AddIcon />
          </Button>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(AddTodo);
