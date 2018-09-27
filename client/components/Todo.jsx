import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
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
    console.log("yo");
    this.props.handleCheck(this.props.id);
  }

  render() {
    const { todo } = this.props;
    console.log(todo);
    const listStyles = !this.props.checked
      ? listElementStyles
      : listElementCheckedStyles;

    // const listStyles = !this.props.checked
    //   ? listElementStyles
    //   : listElementCheckedStyles;
    return (
      //   <div style={{ display: "flex" }}>
      //     <div>
      //       <Checkbox onChange={this.onCheck} style={{ marginTop: 12 }} />
      //     </div>
      //     <IconButton
      //       tooltip="remove"
      //       tooltipposition="bottom-right"
      //       onClick={this.onClick}
      //       iconstyle={{ color: "red" }}
      //     >
      //       <DeleteIcon />
      //     </IconButton>
      //     <div style={{ display: "flex" }}>
      //       <li>{todo}</li>
      //     </div>
      //     <Divider />
      //   </div>
      <ListItem
        // key={value}
        // role={undefined}
        dense
        button
        onClick={this.onCheck}
        // className={classes.listItem}
      >
        <Checkbox
          //   checked={this.state.checked.indexOf(value) !== -1}
          //   tabIndex={-1}
          //   disableRipple
          onClick={this.onCheck}
        />
        <ListItemText style={listStyles} primary={todo} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <DeleteIcon onClick={this.onClick} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
