import instaReducer from '../../../client/reducers/insta';

test('isntagram reducer Initial State', () => {
  const expected = [];

  const actual = instaReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('getting users insta list', () => {
  const expected = ['www.myinsta.com'];
  const action = {
    type: 'GET_INSTA',
    insta: [...expected]
  };
  const actual = instaReducer([], action).insta;
  expect(actual).toEqual(expected);
});
