import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";

const listElementStyles = {
  color: "blue",
  fontSize: 18,
  lineHeight: "24px"
};

const listElementCheckedStyles = {
  ...listElementStyles,
  textDecoration: "line-through"
};

class Todo extends Component {
  static propTypes = {
    //todo: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onClick(event) {
    this.props.handleRemove(this.props.id);
  }

  onCheck(event) {
    console.log(this.props.id);
    this.props.handleCheck(this.props.id);
  }

  render() {
    const { todo } = this.props;
    console.log(todo);

    // const listStyles = !this.props.checked
    //   ? listElementStyles
    //   : listElementCheckedStyles;
    return (
      <div>
        <div>
          <IconButton
            tooltip="remove"
            tooltipposition="bottom-right"
            onClick={this.onClick}
            iconstyle={{ color: "red" }}
          >
            <Checkbox onChange={this.onCheck} style={{ marginTop: 12 }} />
          </IconButton>
        </div>
        <IconButton
          tooltip="remove"
          tooltipposition="bottom-right"
          onClick={this.onClick}
          iconstyle={{ color: "red" }}
        >
          <DeleteIcon />
        </IconButton>
        <div>
          <li>{todo}</li>
        </div>
        <Divider />
      </div>
    );
  }
}

export default Todo;
