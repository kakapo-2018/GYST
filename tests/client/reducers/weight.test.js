import weightReducer from '../../../client/reducers/weight';

test('weight reducer Initial State', () => {
  const expected = [];

  const actual = weightReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('GET_WEIGHT', () => {
  const fakeWeight = [30, 40];
  const expected = [...fakeWeight];

  const actual = weightReducer(undefined, {
    type: 'GET_WEIGHT',
    weight: fakeWeight
  });

  expect(actual).toEqual(expected);
});
