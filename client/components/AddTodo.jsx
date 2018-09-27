import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

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
    const { handleClick } = this.props;
    return (
      <div>
        <form id="myForm">
          <Paper style={{ width: "90%", leftMargin: "15px" }} zDepth={1}>
            <div style={{ marginLeft: "10px" }}>
              <TextField
                hintText="What needs to be done?"
                className="AddText"
                fullWidth={true}
                onChange={e => this.setState({ inputValue: e.target.value })}
              />
            </div>
          </Paper>
          <br />
          <Button
            type="submit"
            label="Add todo"
            primary={true}
            onClick={this.onClick}
          />
        </form>
      </div>
    );
  }
}

export default AddTodo;
