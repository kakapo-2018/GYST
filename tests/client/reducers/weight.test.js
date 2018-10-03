import weightReducer from '../../../client/reducers/weight';

test('weight reducer Initial State', () => {
  const expected = [];

  const actual = weightReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('GET_WEIGHT', () => {
  const fakeWeight = [30, 40];
  const expected = [...fakeWeight];

  const action = {
    type: 'GET_WEIGHT',
    weight: fakeWeight
  };

  const actual = weightReducer([], action).weight;

  expect(actual).toEqual(expected);
});

test('SET_WEIGHT', () => {
  const fakeWeight = [20, 25];
  const expected = [...fakeWeight];

  const action = {
    type: 'SET_WEIGHT',
    weight: fakeWeight
  };

  const actual = weightReducer([], action).weight;

  expect(actual).toEqual(expected);
});

test('LOADING_WEIGHT', () => {
  const expected = true;

  const action = {
    type: 'LOADING_WEIGHT',
    loading: true
  };

  const actual = weightReducer([], action).loading;

  expect(actual).toEqual(expected);
});

test('LOGOUT_SUCCESS', () => {
  const expected = '';

  const action = {
    type: 'LOGOUT_SUCCESS',
    weight: ''
  };

  const actual = weightReducer([], action).weight;

  expect(actual).toEqual(expected);
});
