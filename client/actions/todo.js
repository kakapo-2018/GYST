import request from '../utils/api';

//getting todos for a user

export function getTodosAction(id) {
  let obj = { id: id };
  return function(dispatch) {
    request('get', '/todo', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveTodos(response.body));
      }
    });
  };
}

//function that returns the todo items from the db into redux
function receiveTodos(response) {
  return {
    type: 'GET_TODOS',
    isFetching: false,
    todos: response
  };
}

//adding todos

export function addTodosAction(id, todo) {
  let obj = { id: id, todo: todo };
  return function(dispatch) {
    request('post', '/todo/save', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveTodos(response.body));
      }
    });
  };
}

//delete todos

export function delTodosAction(id, user) {
  let obj = {
    id: id,
    user: user
  };
  return function(dispatch) {
    request('post', '/todo/delete', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveTodos(response.body));
      }
    });
  };
}

//check todos

export function chkTodosAction(id, user, checked) {
  let obj = {
    id: id,
    user: user,
    checked: checked
  };
  return function(dispatch) {
    request('post', '/todo/check', obj).then(response => {
      if (!response.ok) {
      } else {
        dispatch(receiveTodos(response.body));
      }
    });
  };
}
