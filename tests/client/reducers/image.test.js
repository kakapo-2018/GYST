import imageReducer from '../../../client/reducers/image';

test('image reducer Initial State', () => {
  const expected = [];

  const actual = imageReducer(undefined, {});

  expect(actual).toEqual(expected);
});

test('getting users image list', () => {
  const expected = 'www.myinsta.com';
  const action = {
    type: 'IMAGE_RECEIVED',
    image: expected
  };
  const actual = imageReducer([], action).image;
  expect(actual).toEqual(expected);
});

test('cleared image state on logout', () => {
  const expected = 'https://i.stack.imgur.com/l60Hf.png';
  const action = {
    type: 'LOGOUT_SUCCESS',
    image: 'https://i.stack.imgur.com/l60Hf.png'
  };
  const actual = imageReducer([], action).image;
  expect(actual).toEqual(expected);
});
