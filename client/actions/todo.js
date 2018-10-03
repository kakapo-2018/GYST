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

function receiveTodos(response) {
  //counting how many todos aren't checked off as done
  let count = 0;
  let completedTodo = response.map(todo => {
    if (todo.status == 1) {
      return count++;
    }
  });
  let notificationCount = response.length - count;
  return {
    type: 'GET_TODOS',
    isFetching: false,
    todos: response,
    notification: notificationCount
  };
}

function receiveTodosDel(response) {
  //counting how many todos aren't checked off as done
  let count = 0;
  let completedTodo = response.map(todo => {
    if (todo.status == 1) {
      return count++;
    }
  });
  let notificationCount = response.length - count;
  return {
    type: 'DEL_TODOS',
    isFetching: false,
    todos: response,
    notification: notificationCount
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
        dispatch(receiveTodosDel(response.body));
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
