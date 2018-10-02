// external dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';

//internal dependecies
import {
  getTodosAction,
  addTodosAction,
  delTodosAction,
  chkTodosAction
} from '../actions/todo';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

class TodoMain extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentWillMount() {
    this.props.getTodos(this.props.state.auth.user.id);
  }

  handleClick(todo) {
    if (todo.length >= 1) {
      this.setState({
        todos: [
          ...this.state.todos,
          {
            id: uuid(),
            task: todo,
            checked: false
          }
        ]
      });
      this.props.addTodos(this.props.state.auth.user.id, todo);
    }
  }

  handleRemove(id) {
    this.setState({
      open: true
    });
    this.props.delTodos(id, this.props.state.auth.user.id);
  }

  handleCheck(id, checked) {
    this.props.chkTodos(id, this.props.state.auth.user.id, checked);
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <Paper
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          minWidth: '100%',
          minHeight: '100%',
          overflow: 'auto'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <h1 style={{ textAlign: 'center', color: 'grey' }}>Todo List</h1>
          </div>
          <div style={{ marginTop: 13 }}>
            <IconButton />
          </div>
        </div>
        {this.props.state.todos.todos && (
          <TodoList
            todos={this.props.state.todos.todos}
            handleRemove={this.handleRemove}
            handleCheck={this.handleCheck}
          />
        )}
        <br />
        <div style={{ marginLeft: '5%', marginRight: '5%' }}>
          <AddTodo handleClick={this.handleClick} />
        </div>
        <Snackbar
          open={this.state.open}
          message="Todo Item deleted"
          autoHideDuration={2000}
          onClose={this.handleRequestClose}
        />
      </Paper>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTodos: id => {
      dispatch(getTodosAction(id));
    },
    addTodos: (id, todo) => {
      dispatch(addTodosAction(id, todo));
    },
    delTodos: (id, user) => {
      dispatch(delTodosAction(id, user));
    },
    chkTodos: (id, user, checked) => {
      dispatch(chkTodosAction(id, user, checked));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoMain);
