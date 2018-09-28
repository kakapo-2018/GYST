import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const listElementStyles = {
  color: 'blue',
  fontSize: 18,
  lineHeight: '24px'
};

const listElementCheckedStyles = {
  ...listElementStyles,
  textDecoration: 'line-through'
};

class Todo extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  onClick(name) {
    this.props.handleRemove(name);
  }

  onCheck(name, checked) {
    this.props.handleCheck(name, checked);
  }

  render() {
    const { todo } = this.props;
    const listStyles = !this.props.checked
      ? listElementStyles
      : listElementCheckedStyles;
    return (
      <ListItem dense button>
        <Checkbox
          checked={this.props.checked}
          onClick={() => this.onCheck(this.props.name, this.props.checked)}
        />
        <ListItemText style={listStyles} primary={todo} />
        <ListItemSecondaryAction>
          <IconButton aria-label="Comments">
            <DeleteIcon onClick={() => this.onClick(this.props.name)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo;
