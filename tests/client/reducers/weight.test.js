import weightReducer from '../../../client/reducers/weight';

test('weight reducer Initial State', () => {
  const expected = [];

  const actual = weightReducer(undefined, {});

  expect(actual).toEqual(expected);
});
