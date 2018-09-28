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
    console.log('hit');

    console.log(name);
    this.props.handleRemove(name);
  }

  onCheck(event) {
    this.props.handleCheck(this.props.id);
  }

  render() {
    const { todo } = this.props;
    console.log(this.props.name);

    const listStyles = !this.props.checked
      ? listElementStyles
      : listElementCheckedStyles;
    return (
      <ListItem dense button>
        <Checkbox onClick={this.onCheck} />
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
