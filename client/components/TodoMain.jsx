// external dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import Paper from '@material-ui/core/Paper';
import uuid from 'uuid';

//internal dependecies
import { getTodosAction, addTodosAction } from '../actions/todo';
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

  handleRemove(id) {
    const finalTodos = this.state.todos.filter(todo => {
      if (todo.id != id) return todo;
    });
    this.setState({
      todos: finalTodos,
      open: true
    });
  }

  handleCheck(id) {
    const finalTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    this.setState({
      todos: finalTodos
    });
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
          minHeight: '100%'
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

        <TodoList
          todos={this.state.todos}
          handleRemove={this.handleRemove}
          handleCheck={this.handleCheck}
        />
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
    // items: state.items[0],
    // loading: state.itemsIsLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTodos: id => {
      dispatch(getTodosAction(id));
    },
    addTodos: (id, todo) => {
      dispatch(addTodosAction(id, todo));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoMain);
