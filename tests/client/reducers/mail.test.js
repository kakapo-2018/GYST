import mailReducer from '../../../client/reducers/mail';

test('mail reducer Initial State', () => {
  const expected = [];
  const actual = mailReducer(undefined, {});
  expect(actual).toEqual(expected);
});

test('getting users mail list', () => {
  const expected = 18;
  const action = {
    type: 'SET_MAIL',
    counter: 18
  };
  const actual = mailReducer([], action).mail;
  expect(actual).toEqual(expected);
});

test('cleared mail state on logout', () => {
  const expected = [];
  const action = {
    type: 'LOGOUT_SUCCESS',
    spotify: []
  };
  const actual = mailReducer([], action).mail;
  expect(actual).toEqual(expected);
});
