import caloriesReducer from '../../../client/reducers/calories';

test('calories reducer Initial State', () => {
  const expected = [];

  const actual = caloriesReducer(undefined, {});

  expect(actual).toEqual(expected);
});
