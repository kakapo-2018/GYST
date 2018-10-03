import * as actions from '../../../client/actions/todo';
import nock from 'nock';

test('add todo will dispatch an action on success', done => {
  const fakeTodo = [{ id: 2, todo: 'test' }];
  const scope = nock('http://localhost:80')
    .post('/api/v1/todo/save')
    .reply(200, fakeTodo);
  const secondExpected = {
    type: 'GET_TODOS',
    isFetching: false,
    todos: fakeTodo,
    notification: 1
  };

  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(secondExpected);
    scope.done();
    done();
  });

  actions.addTodosAction()(dispatch);
});

test('get todo will dispatch an action on success', done => {
  const fakeTodo = [{ id: 2 }];
  const scope = nock('http://localhost:80')
    .get('/api/v1/todo')
    .reply(200, fakeTodo);
  const secondExpected = {
    type: 'GET_TODOS',
    isFetching: false,
    todos: fakeTodo,
    notification: 1
  };
  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(secondExpected);
    scope.done();
    done();
  });
  actions.getTodosAction()(dispatch);
});

test('receive todo action creator', () => {
  const fakeTodo = [{ id: 2 }];
  const expected = {
    type: 'GET_TODOS',
    isFetching: false,
    todos: fakeTodo,
    notification: 1
  };
  expect(actions.receiveTodos(fakeTodo)).toEqual(expected);
});

test('receive todoDel action creator', () => {
  const fakeTodo = [{ id: 2 }];
  const expected = {
    type: 'DEL_TODOS',
    isFetching: false,
    todos: fakeTodo,
    notification: 1
  };
  expect(actions.receiveTodosDel(fakeTodo)).toEqual(expected);
});

test('add todos will dispatch an action on success', done => {
  const fakeTodo = [{ id: 2 }];
  const scope = nock('http://localhost:80')
    .post('/api/v1/todo/save')
    .reply(200, fakeTodo);
  const secondExpected = {
    type: 'GET_TODOS',
    isFetching: false,
    todos: fakeTodo,
    notification: 1
  };
  const dispatch = jest.fn().mockImplementationOnce(action => {
    expect(action).toEqual(secondExpected);
    scope.done();
    done();
  });
  actions.addTodosAction()(dispatch);
});
// test('receive weight action creator', () => {
//   const fakeWeight = '20, 30';

//   const expected = {
//     type: 'GET_WEIGHT',
//     isFetching: false,
//     weight: fakeWeight
//   };

//   expect(actions.recieveWeight(fakeWeight)).toEqual(expected);
// });

// test('set weight action creator', () => {
//   const fakeWeight = '20, 30';

//   const expected = {
//     type: 'SET_WEIGHT',
//     isFetching: false,
//     weight: fakeWeight
//   };

//   expect(actions.setWeight(fakeWeight)).toEqual(expected);
// });

// test('loading weight action creator', () => {
//   const expected = {
//     type: 'LOADING_WEIGHT',
//     isFetching: true
//   };

//   expect(actions.gettingWeights()).toEqual(expected);
// });

// test('save weight will dispatch an action on success', () => {
//   const fakeWeight = '20, 30';

//   const scope = nock('http://localhost:80')
//     .get('/weight/save')
//     .reply(200, fakeWeight);

//   const expected = {
//     type: 'SET_WEIGHT',
//     isFetching: false,
//     weight: fakeWeight
//   };

//   const dispatch = jest.fn().mockImplementationOnce(action => {
//     expect(action).toEqual(expected);
//     scope.done();
//   });

//   actions.saveWeightAction(dispatch);
// });
