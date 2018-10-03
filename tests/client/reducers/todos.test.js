import todoReducer from '../../../client/reducers/todos';

test('todos reducer Initial State', () => {
  const expected = [];

  const actual = todoReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('getting users todos', () => {
  const todos = ['get petrol', 'dishes'];
  const expected = [...todos];

  const action = {
    type: 'GET_TODOS',
    todos: todos
  };

  const actual = todoReducer([], action).todos;

  expect(actual).toEqual(expected);
});

test('returns todos after one is deleted', () => {
  const todos = ['get petrol'];
  const expected = [...todos];

  const action = {
    type: 'DEL_TODOS',
    todos: todos
  };

  const actual = todoReducer([], action).todos;

  expect(actual).toEqual(expected);
});

test('cleared todos state on logout', () => {
  const expected = '';
  const action = {
    type: 'LOGOUT_SUCCESS',
    todos: [],
    notification: ''
  };

  const actual = todoReducer([], action).notification;

  expect(actual).toEqual(expected);
});
