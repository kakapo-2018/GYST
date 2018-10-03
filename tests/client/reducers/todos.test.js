import todoReducer from '../../../client/reducers/todos';

test('todos reducer Initial State', () => {
  const expected = [];

  const actual = todoReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('GET_TODOS', () => {
  const todos = ['get petrol', 'dishes'];
  const expected = [...todos];

  const action = {
    type: 'GET_TODOS',
    todos: todos
  };

  const actual = todoReducer([], action).todos;

  expect(actual).toEqual(expected);
});

test('DEL_TODOS', () => {
  const todos = ['get petrol'];
  const expected = [...todos];

  const action = {
    type: 'DEL_TODOS',
    todos: todos
  };

  const actual = todoReducer([], action).todos;

  expect(actual).toEqual(expected);
});

// test('LOADING_WEIGHT', () => {
//   const expected = true;

//   const action = {
//     type: 'LOADING_WEIGHT',
//     loading: true
//   };

//   const actual = todoReducer([], action).loading;

//   expect(actual).toEqual(expected);
// });
