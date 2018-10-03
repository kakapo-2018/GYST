import caloriesReducer from '../../../client/reducers/calories';

test('calories reducer Initial State', () => {
  const expected = [];

  const actual = caloriesReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('GET_CALORIES', () => {
  const fakeCalories = 30;
  const expected = fakeCalories;

  const action = {
    type: 'GET_CALORIES',
    totalcalories: fakeCalories
  };

  const actual = caloriesReducer([], action).totalcalories;

  expect(actual).toEqual(expected);
});

test('SET_CALORIES', () => {
  const fakeCalories = 30;
  const expected = fakeCalories;

  const action = {
    type: 'SET_CALORIES',
    totalcalories: fakeCalories
  };
  const actual = caloriesReducer([], action).totalcalories;

  expect(actual).toEqual(expected);
});

test('LOGOUT_SUCCESS', () => {
  const expected = '';

  const action = {
    type: 'LOGOUT_SUCCESS'
  };

  const actual = caloriesReducer([], action).totalcalories;

  expect(actual).toEqual(expected);
});
